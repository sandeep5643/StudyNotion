const userModel = require('../models/userModel');
const profileModel = require('../models/profileModel');
const courseModel = require('../models/courseModel');
const {fileUploadToCloudinary} = require('../utlis/fileUploader');
const CourseProgress = require("../models/courseProgressModel");
const { convertSecondsToDuration } = require("../utlis/secToDuration");


// handler function of updated profile 
exports.updateProfile = async(req, res) => {
    try {
        // Fetch data from req body. Here dateOfBirth and about are optional.
        const { dateOfBirth = "", about = "", contactNumber } = req.body;

        // Validate contactNumber is present
        if (!contactNumber) {
            return res.status(400).json({
                success: false,
                message: "Contact number is required",
            });
        }

        // Get user ID from authenticated user
        const userID = req.user.id;

        // Find user details by ID
        const userDetails = await userModel.findById(userID);
        if (!userDetails) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        const profile = await profileModel.findById(userDetails.additionalDetails);

		// Update the profile fields
		profile.dateOfBirth = dateOfBirth;
		profile.about = about;
		profile.contactNumber = contactNumber;

		// Save the updated profile
		await profile.save();

		return res.json({
			success: true,
			message: "Profile updated successfully",
			profile,
		});

        //  // Find profile ID in the user details
        //  const profileId = userDetails.additionalDetails;
        //  const profileDetails = await profileModel.findById(profileId);
        //  if (!profileDetails) {
        //      return res.status(404).json({
        //          success: false,
        //          message: "Profile not found",
        //      });
        //  }

        // // Update profile details selectively
        // if (dateOfBirth) profileDetails.dateOfBirth = dateOfBirth;
        // if (about) profileDetails.about = about;
        // profileDetails.contactNumber = contactNumber; // This is required, so it should always update

        // // Save the updated profile
        // await profileDetails.save();

        //  // Return response with updated profile details
        // return res.status(200).json({
        //     success: true,
        //     message: "Profile Details Updated successfully",
        //     profileDetails,
        // });

    } catch (error) {
        console.error("Error updating profile:", error);
        return res.status(500).json({
            success: false,
            message: "Internal Server error",
            error: error.message,
        });
    }
}



// handler function of deleted profile
exports.deleteAccount = async(req, res) => {
    try {
        // get user id 
        const userId = req.user.id;

        // validation 
        const user = await userModel.findById({_id: userId});
        if(!user){
            return res.status(400).json({
                success:false,
                message:"User Not Found"
            });
        }

        // delete profile
        await profileModel.findByIdAndDelete({_id:user.additionalDetails});

        // profile ki data ham studentsEnrollId ke andar se bhi delete karna chahte hai.
        // Is code se jab user delete hoga, uska enrollment bhi courses se remove ho jayega.
        await courseModel.updateMany({studentsEnrollId:userId}, {$pull: {studentsEnrollId:userId}});

        // and user ke andar se bhi profile ko delete karo
        await userModel.findByIdAndDelete({_id:userId});

        // return response
        return res.status(200).json({
            success:true,
            message:"Profile and enrollments deleted successfully"
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Internal Server error. When  deleting account",
            error:error.message
        });
    }
}


/* // Schedule task to delete the account after 5 days using setTimeout method.
exports.scheduleAccountDeletion = async(req, res) => {
    try {
        // get user id
        const userId = req.userExisting.id;

        // validation to check if user exists
        const userDetails = await userModel.findById(userId);
        if(!userDetails){
            return res.status(400).json({
                success: false,
                message: "User Not Found"
            });
        }

        // Schedule the account deletion after 5 days
        setTimeout(async () => {
            try {
                // Delete the profile associated with the user
                await profileModel.findByIdAndDelete({_id:userDetails.additionalDetails});

                // Remove the user from studentsEnrollId in all courses
                await courseModel.updateMany({studentsEnrollId: userId}, {$pull: {studentsEnrollId: userId}});

                // Delete the user account
                await userModel.findByIdAndDelete({_id: userId});
                console.log(`User with ID ${userId} has been deleted successfully.`);

            } catch (error) {
                console.log("Error in scheduled account deletion:", error);
            }
        }, 5 * 24 * 60 * 60 * 1000); // Delay of 5 days (in milliseconds)

         // Return response that account deletion is scheduled
         return res.status(200).json({
            success: true,
            message: "Account deletion scheduled in 5 days."
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal Server error. When scheduling account deletion",
            error: error.message
        });
    }
} */


// ------------------------=====================================================
// Schedule task to delete the account after 5 days using node-corn library.
// exports.deleteAccount = async (req, res) => {
//     try {
//         // Get user ID
//         const userId = req.userExisting.id;

//         // Validation
//         const userDetails = await userModel.findById(userId);
//         if (!userDetails) {
//             return res.status(400).json({
//                 success: false,
//                 message: "User Not Found"
//             });
//         }

//         // Schedule the account deletion after 5 days (5 days = 5 * 24 * 60 * 60 seconds)
//         const deletionTime = 5 * 24 * 60 * 60 * 1000; // 5 days in milliseconds

//         // Schedule the account deletion
//         corn.schedule(`*/1 * * * *`, async () => {
//             // check if its time to delete
//             const now = Date.now();
//             const deletionDate = new Date(userDetails.createdAt).getTime() + deletionTime; // Assuming createdAt is the time when the account was created
//             if(now >= deletionDate){
//                 try {
//                      // Delete profile
//                      await profileModel.findByIdAndDelete({ _id: userDetails.additionalDetails });

//                      // Remove user from studentsEnrollId in all courses
//                     await courseModel.updateMany({ studentsEnrollId: userId }, { $pull: { studentsEnrollId: userId } });

//                      // Delete the user account
//                      await userModel.findByIdAndDelete({ _id: userId });

//                      console.log(`User with ID ${userId} has been deleted successfully.`);

//                     // Stop the scheduled task after deletion
//                     task.stop(); // stop the cron job

//                 } catch (error) {
//                     console.log("Error in scheduled account deletion:", error);
//                 }
//             }
//         });

//         // Return response that account deletion is scheduled
//         return res.status(200).json({
//             success: true,
//             message: "Account deletion scheduled in 5 days."
//         });

//     } catch (error) {
//         console.log(error);
//         return res.status(500).json({
//             success: false,
//             message: "Internal Server error when scheduling account deletion",
//             error: error.message
//         });
//     }
// }
// ------------------------------------======================================


// handler function of get All profile details in the user
exports.getAllProfileDetails = async(req, res) => {
    try {
        // get id 
        const userId = req.user.id;

        // validation and get all profile details
        const profileDetails = await userModel.findById(userId).populate("additionalDetails").exec();
        console.log(profileDetails);

        // return response
        return res.status(200).json({
            success:true,
            message:"get All Profile Details successfully",
            data: profileDetails
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Internal Server error. When get profile details",
            error:error.message
        });
    }
}


//updateDisplayPicture 
exports.updateDisplayPicture = async (req, res) => {
    try {
        const userId = req.user.id;

        // Check if the file exists
        if (!req.files || !req.files.displayPicture) {
            return res.status(400).send({
            success: false,
            message: "No display picture provided.",
            });
        }

        const displayPicture = req.files.displayPicture;

        // Ensure it's an image file (optional: check mime types)
        if (!displayPicture.mimetype.startsWith('image/')) {
            return res.status(400).send({
            success: false,
            message: "Invalid file type. Please upload an image.",
            });
        }

        // Upload image to Cloudinary
        const image = await fileUploadToCloudinary(displayPicture, process.env.FOLDER_NAME, 1000, 1000);
        console.log(image);

        // Update user profile with the new image URL
        const updatedProfile = await userModel.findByIdAndUpdate(
            { _id: userId },
            { images: image.secure_url },
            { new: true }
        );

        // Return success response
        return res.send({
            success: true,
            message: `Image updated successfully`,
            data: updatedProfile,
        });

    } catch (error) {
        console.error("Error updating display picture: ", error);
        return res.status(500).json({
          success: false,
          message: error.message
        });
    }
};
  


// Fetch and Return Enrolled Courses for a User with Error Handling in Express.js
exports.getEnrolledCourses = async (req, res) => {
	try {
	  const userId = req.user.id
	  let userDetails = await userModel.findOne({
		_id: userId,
	  })
		.populate({
		  path: "courses",
		  populate: {
			path: "courseContent",
			populate: {
			  path: "subSection",
			},
		  },
		})
		.exec()

	  userDetails = userDetails.toObject()
	  var SubsectionLength = 0
	  for (var i = 0; i < userDetails.courses.length; i++) {
		let totalDurationInSeconds = 0
		SubsectionLength = 0
		for (var j = 0; j < userDetails.courses[i].courseContent.length; j++) {
		  totalDurationInSeconds += userDetails.courses[i].courseContent[
			j
		  ].subSection.reduce((acc, curr) => acc + parseInt(curr.timeDuration), 0)
		  userDetails.courses[i].totalDuration = convertSecondsToDuration(
			totalDurationInSeconds
		  )
		  SubsectionLength +=
			userDetails.courses[i].courseContent[j].subSection.length
		}
		let courseProgressCount = await CourseProgress.findOne({
		  courseId: userDetails.courses[i]._id,
		  userId: userId,
		})
		courseProgressCount = courseProgressCount?.completeVideo.length
		if (SubsectionLength === 0) {
		  userDetails.courses[i].progressPercentage = 100
		} else {
		  // To make it up to 2 decimal point
		  const multiplier = Math.pow(10, 2)
		  userDetails.courses[i].progressPercentage =
			Math.round(
			  (courseProgressCount / SubsectionLength) * 100 * multiplier
			) / multiplier
		}
	  }
  
	  if (!userDetails) {
		return res.status(400).json({
		  success: false,
		  message: `Could not find user with id: ${userDetails}`,
		})
	  }
	  return res.status(200).json({
		success: true,
		data: userDetails.courses,
	  })
	} catch (error) {
	  return res.status(500).json({
		success: false,
		message: error.message,
	  })
	}
}


// instructor dashboard controller
exports.instructorDashboard = async (req, res) => {
  try {
    const courseDetails = await courseModel.find({instructor:req.user.id});

    const courseData = courseDetails.map((course) => {
      const totalStudentsEnrolled = course.studentsEnrollId.length
      const totalAmountGenerated = totalStudentsEnrolled * course.price

      // creates an new object with the additional field
      const courseDataWithStats = {
        _id: course._id,
        courseName: course.courseName,
        courseDescription: course.courseDescription,
        totalStudentsEnrolled,
        totalAmountGenerated
      }
      return courseDataWithStats
    })

    res.status(200).json({courses: courseData});


  } catch (error) {
    console.error(error);
    res.status(500).json({
      message:"Internal Server Error"
    });
  }
}