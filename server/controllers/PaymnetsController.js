const { instance } = require('../config/razorpay');
const userModel = require('../models/userModel');
const courseModel = require('../models/courseModel');
const mailSender = require('../utlis/mailSender')
const mongoose = require('mongoose');
const crypto = require('crypto');
const { courseEnrollmentEmail } = require("../mail/templates/courseEnrollmentEmail");
const { paymentSuccessEmail } = require("../mail/templates/paymentSuccessEmail");
const CourseProgress = require("../models/courseProgressModel");


exports.capturePayment = async (req, res) => {
    const { courses } = req.body;
    const userId = req.user.id;

    if (!courses || courses.length === 0) {
        return res.status(400).json({
            success: false,
            message: "Please provide Course Id",
        });
    }

    let totalAmount = 0;
    for (const course_id of courses) {
        let course;
        try {
            course = await courseModel.findById(course_id);
            if (!course) {
                return res.status(404).json({
                    success: false,
                    message: "Course not found",
                });
            }

            const uid = new mongoose.Types.ObjectId(userId);
            if (course.studentsEnrollId.includes(uid)) {
                return res.status(400).json({
                    success: false,
                    message: "Student is already Enrolled",
                });
            }

            totalAmount += course.price;
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    }

    const currency = "INR";
    const options = {
        amount: totalAmount * 100,
        currency,
        receipt: Math.random(Date.now()).toString(),
    };

    try {
        const paymentResponse = await instance.orders.create(options);
        res.json({
            success: true,
            message: paymentResponse,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Could not initiate order",
        });
    }
};

exports.verifyPayment = async (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, courses } = req.body;
    const userId = req.user.id;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !courses || !userId) {
        return res.status(400).json({
            success: false,
            message: "Payment verification failed",
        });
    }

    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
        .createHmac("sha256", process.env.RAZORPAY_SECRET)
        .update(body.toString())
        .digest("hex");

    if (expectedSignature === razorpay_signature) {
        try {
            await exports.enrollStudents(courses, userId, res);
            return res.status(200).json({
                success: true,
                message: "Payment verified",
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: "Error enrolling students",
            });
        }
    } else {
        return res.status(400).json({
            success: false,
            message: "Invalid signature. Payment verification failed",
        });
    }
};

exports.enrollStudents = async (courses, userId, res) => {
    if (!courses || !userId) {
        return res.status(400).json({
            success: false,
            message: "Please provide data for Courses or UserId",
        });
    }

    for (const courseId of courses) {
        try {
            const enrolledCourse = await courseModel.findOneAndUpdate(
                courseId,
                { $push: { studentsEnrollId: userId } },
                { new: true }
            );

            if (!enrolledCourse) {
                return res.status(500).json({
                    success: false,
                    message: "Course not found",
                });
            }

            const courseProgress = await CourseProgress.create({
                courseId:courseId,
                userId:userId,
                completeVideo: [],
            })

            const enrolledStudent = await userModel.findByIdAndUpdate(
                userId,
                { $push: { courses: courseId, courseProgress: courseProgress._id } },
                { new: true }
            );

            await mailSender(
                enrolledStudent.email,
                `Successfully Enrolled into ${enrolledCourse.courseName}`,
                courseEnrollmentEmail(enrolledCourse.courseName, enrolledStudent.firstName)
            );

            console.log("Email Sent Successfully");

        } catch (error) {
            console.log(error);
            return res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    }
};

exports.sendPaymentSuccessEmail = async (req, res) => {
    const { orderId, paymentId, amount } = req.body;
    const userId = req.user.id;

    if (!orderId || !paymentId || !amount || !userId) {
        return res.status(400).json({
            success: false,
            message: "Please provide all required fields",
        });
    }

    try {
        const enrolledStudent = await userModel.findById(userId);
        await mailSender(
            enrolledStudent.email,
            `Payment Received`,
            paymentSuccessEmail(enrolledStudent.firstName, amount / 100, orderId, paymentId)
        );

    } catch (error) {
        console.log("Error in sending email", error);
        return res.status(500).json({
            success: false,
            message: "Could not send email",
        });
    }
};
















// // capture the payment and initiate the Razorpay order
// exports.capturePayment = async(req, res) => {
//         // get userId and courseId
//         const {course_id} = req.body;
//         const userId = req.user.id;

//         // this course_id valid or not.
//         if(!course_id){
//             return res.status(400).json({
//                 success:false,
//                 message:"Please provide valid course id"
//             });
//         }

//         // jo course details aa raha hai es course id ke through. ye valid hai ki nahi
//         let course;
//         try {
//             course = await courseModel.findById(course_id);
//             if(!course){
//                 return res.status(400).json({
//                     success:false,
//                     message:"Could not find the course"
//                 });
//             }

//             // if user already payment for same course
//             //  Check if User Already Enrolled
//             const userid = new mongoose.Types.ObjectId(userId);
//             if(course.studentsEnrollId.includes(userid)){
//                 return res.status(200).json({
//                     success:false,
//                     message:"Studnet is already Enrolled"
//                 });
//             }
//         } catch (error) {
//             console.error(error);
//             return res.status(500).json({
//                 success:false,
//                 message:error.message
//             });
//         }

//         // Order Creation - Define Options for Razorpay
//         const amount = course.price;
//         const currency = "INR" // Set to INR (Indian Rupee).
//         const options = {
//             amount: amount * 100,
//             currency,
//             receipt: Math.random(Date.now()).toString(), // A random receipt number is generated.
//             // Additional notes are provided to store the course ID and user ID for reference.
//             notes:{
//                 courseId: course_id,
//                 userId
//             }
//         }

//         try {
//             // Initiate Razorpay Payment
//             const paymentResponse = await instance.orders.create(options);
//             console.log(paymentResponse);

//             // Return Success Response
//             return res.status(200).json({
//                 success:true,
//                 courseName : course.courseName,
//                 courseDescription : course.courseDescription,
//                 thumbnail : course.thumbnail,
//                 orderId : paymentResponse.id,
//                 currency : paymentResponse.currency,
//                 amount : paymentResponse.amount
//             });

//         // Error Handling in Order Creation
//         } catch (error) {
//             console.log(error);
//             return res.status(500).json({
//                 success:false,
//                 message:"Could not initiate order"
//             });
//         }
// }



// //verify Signature of Razorpay and Server
// exports.verifySignature = async (req, res) => {
//     //  Ye secret aapki server-side application aur Razorpay ke beech ka ek shared secret hota hai, jo signature verification ke liye use hota hai.
//     const webhookSecret = "12345678";

//     // Extract Razorpay Signature
//     const signature = req.headers["x-razorpay-signature"];

//     // Create HMAC (Hash-based Message Authentication Code)
//     const shasum =  crypto.createHmac("sha256", webhookSecret); // ek SHA-256 algorithm ka HMAC banata hai jo secret key (webhookSecret) ke sath banaya gaya hai.
//     shasum.update(JSON.stringify(req.body)); // Request ka body JSON string me convert karke HMAC update kiya jata hai.
//     const digest = shasum.digest("hex"); // Finally, HMAC ka hash digest hexadecimal format me nikalta hai, jo digest variable me store hota hai.

//     //  Compare Signature with Digest
//     if(signature === digest) {
//         console.log("Payment is Authorised");

//         // courseId aur userId ko request ke payload se extract kiya ja raha hai. Jab Razorpay me order create kiya jata hai, tab kuch additional notes pass kiye ja sakte hain (as mentioned in the earlier code), jisme course aur user ki details hoti hain.
//         const {courseId, userId} = req.body.payload.payment.entity.notes;

//         try{
//                 //fulfil the action

//                 //find the course and enroll the student in it
//                 // Yahaan pe course collection me courseId ke through course find kiya ja raha hai, aur usme userId ko studentsEnrolled array me add kiya ja raha hai.
//                 const enrolledCourse = await courseModel.findOneAndUpdate(
//                                                 {_id: courseId},
//                                                 {$push:{studentsEnrolled: userId}},
//                                                 {new:true},
//                 );
//                 // Agar course nahi milta hai, to error return hota hai.
//                 if(!enrolledCourse) {
//                     return res.status(500).json({
//                         success:false,
//                         message:'Course not Found',
//                     });
//                 }
//                 console.log(enrolledCourse);

//                 //Add Course to Student's Enrolled Courses
//                 // Yahaan user collection me userId ke through student ko find kiya ja raha hai, aur uske courses array me courseId add kiya ja raha hai.
//                 const enrolledStudent = await userModel.findOneAndUpdate(
//                                                 {_id:userId},
//                                                 {$push:{courses:courseId}},
//                                                 {new:true},
//                 );
//                 console.log(enrolledStudent);

//                 // Send Confirmation Email
//                 const emailResponse = await mailSender(
//                                         enrolledStudent.email,
//                                         "Congratulations from StudyNotion",
//                                         "Congratulations, you are onboarded into new StudyNotion Course",
//                 );
//                 console.log(emailResponse);

//                 // Handle Success and Error Responses
//                 return res.status(200).json({
//                     success:true,
//                     message:"Signature Verified and Course Added",
//                 });
//         }       
//         catch(error) {
//             console.log(error);
//             return res.status(500).json({
//                 success:false,
//                 message:error.message,
//             });
//         }
//     }
//     // Signature Mismatch Case
//     // Agar signature match nahi karta digest ke sath, to function 400 Bad Request response deta hai 
//     else {
//         return res.status(400).json({
//             success:false,
//             message:'Invalid request',
//         });
//     }
// };


// // Summary:
// // Ye function Razorpay ke webhook se aayi request ka signature verify karta hai.
// // Agar signature valid hota hai, to user ko course me enroll karta hai, aur user ko confirmation email bhejta hai.
// // Agar signature match nahi karta, to function invalid request response deta hai.