const { default: mongoose } = require('mongoose');
const RatingAndReviewModel = require('../models/RatingAndReviewsModel');
const courseModel = require('../models/courseModel');

// create Rating
// This is an asynchronous function that takes two parameters: req (the request object) and res (the response object).
exports.createRating = async(req, res) => {
    try {
        // This line extracts the user ID from the req.user object, which is assumed to be populated by an authentication middleware.
        const userId = req.user.id;

        // This line extracts three properties from the request body: rating, review, and courseId.
        const {rating, review, courseId} = req.body;

        try {
            // Check if User is Enrolled in the Course
            // $elemMatch operator is used to match the user ID in the array.
            const courseDetails = await courseModel.findOne({_id: courseId, studentsEnrollId: {$elemMatch: {$eq: userId}}});

            // if userDetails not enrolled
            if(!courseDetails){
                return res.status(404).json({
                    success:false,
                    message:'Student is not enrolled in the course'
                });
            }
        } catch (error) {
            console.error(error);  
            return res.status(500).json({  
            success: false,  
            message: 'Error fetching course details'  
            });  
        }
        

        try {
            // Check if User has Already Reviewed the Course
            const alreadyReviewed = await RatingAndReviewModel.findOne({user: userId, course: courseId});

            if(alreadyReviewed){
                return res.status(403).json({
                    success: false,
                    message:'Course is already Reviewed by the user'
                });
            }
        } catch (error) {
            console.error(error);  
            return res.status(500).json({  
            success: false,  
            message: 'Error checking if user has already reviewed the course'  
            }); 
        }

        //If the user has not already reviewed the course, this line creates a new rating and review document with the provided rating, review, user, and course properties.
        const ratingReview = await RatingAndReviewModel.create({
            rating, 
            review,
            user: userId,
            course: courseId
        });

        //This line updates the course document by adding the newly created rating and review ID to the ratingAndReviews array.
        const updatedRatingReviewINCourse = await courseModel.findByIdAndUpdate({_id: courseId}, {$push:{ratingAndReviews: ratingReview._id}}, {new:true});
        console.log(updatedRatingReviewINCourse);

        //If everything goes well, this line returns a successful response with a JSON object containing a success message and the newly created rating and review document.
        return res.status(200).json({
            success:true,
            message:"Rating and Review create successfully",
            ratingReview
        });

        // If any error occurs during the execution of the function, this block catches the error, logs it to the console, and returns a response with a 500 status code and an error message.
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message
        });
    }
}


// getAverageRating
exports.getAverageRating = async(req, res) => {
    try {
        // get course id
        const courseId = req.body.courseId;

        // calculate average rating
        // aggregate mongodb ka function hai. jo multiple stages ko ek pipeline mein chain karta hai, jisme har stage specific task perform karti hai, jaise filtering, grouping, sorting, etc.
        const result = await RatingAndReviewModel.aggregate([
            {
                // match stage courseId ko ObjectId me convert karke specific course review ko filter kar raha hai. 
                $match:{course: new mongoose.Types.ObjectId(courseId)}
            },
            {
                // Phir jo documents filter huye hain, unka average rating calculate hota hai.
                // $group ka use grouping ke liye hota hai. Ismein aggregation functions bhi use kar sakte hain jaise $sum, $avg, $max, etc.
                // Group stage mein hum _id: null set karte hain kyunki humein saare matching records ka ek hi output chahiye,
                // averageRating ko $avg operator ke through calculate kar rahe hain jo field "rating" ka average nikalta hai.
                $group:{_id: null, averageRating: {$avg: "$rating"}}
            }
        ]);

        // Returning Average Rating:
        // Agar result array mein data aata hai, toh result[0].averageRating ko response ke through return kiya jaata hai.
        if(result.length > 0){
            return res.status(200).json({
                success:true,
                averageRating: result[0].averageRating
            });
        }

        // if no rating review exists
        return res.status(200).json({
            success:true,
            message: `Average Rating is 0, no ratings given till now`,
            averageRating:0
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message
        });
    }
}


// get all rating and reviews
exports.getAllRatingAndReviews = async(req, res) => {
    try {
        // .find(...) ek query object return karta hai.
        // .exec() method is query ko execute karta hai aur actual result ko fetch karta hai.
        const allRatingandReviews = await RatingAndReviewModel.find({}).sort({rating: "desc"})
                                                                                            .populate({path: "user", select: "firstName lastName email images"})
                                                                                            .populate({path: "course", select: "courseName"})
                                                                                            .exec();

        // return response
        return res.status(200).json({
            success:true,
            message:"All reviews fetched successfully",
            data: allRatingandReviews
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message
        });
    }
}