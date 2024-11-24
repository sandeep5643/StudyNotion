const userModel = require('../models/userModel');
const otpModel = require('../models/otpModel');
const otpGenerator = require('otp-generator');
const bcrypt = require('bcrypt');
const profileModel = require('../models/profileModel');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const mailSender = require('../utlis/mailSender');
const {passwordUpdated} = require("../mail/templates/passwordUpdate");


// logic for signup
exports.SignUp = async(req, res) => {
    try {
        console.log(req.body);
        // fetch data from req body
        const {firstName, lastName, email, password, confirmPassword, accountType, contactNumber, otp} = req.body;

        // i doing validate. for if user anyone field missing so send response message
        if(!firstName || !lastName || !email || !password || !confirmPassword || !otp){
            return res.status(400).json({
                success:false,
                message:"All Fields are required"
            });
        }

        // check password and confirmPassword. it is same or not.
        if(password !== confirmPassword){
            return res.status(400).json({
                success:false,
                message: "password and confirmPassword do not matched. please try again"
            });
        }

        // check this is user already does not exists in DB
        const existsUser = await userModel.findOne({email});
        // if user already exists so return response
        if(existsUser){
            return res.status(400).json({
                success:false,
                message:"User already registered"
            });
        }

        // This means, that the latest otp generated for this email will be fetched.
        // sort({created:-1}) This means we are ordering the newest first otp in the recentOtp. using sort method.
        // limit(1) se sirf latest (recent) OTP ko liya gaya hai.
        const recentOtp = await otpModel.find({email}).sort({createdAt:-1}).limit(1);
        console.log(recentOtp);
        // validate otp
        // recentOtp.length == 0 This means otp not found in the database. of this email
        if(recentOtp.length == 0){
            return res.status(400).json({
                success:false,
                message:"OTP not found"
            });
            // if otp mil gya and otp user ne wrong fill kiya. yani otpgenerate es recentOtp.otpgenerate ke equal nahi hoga to error through hoga.
        }else if(otp !== recentOtp[0].otp){
            return res.status(400).json({
                success:false,
                message:"invalid otp"
            });
        }

        // hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create the user
		let approved = "";
		approved === "Instructor" ? (approved = false) : (approved = true);

        // Create the Additional Profile For User
        const profileDetails = await profileModel.create({
            gender:null,
            dateOfBirth:null,
            about:null,
            contactNumber:contactNumber
        });
         // create entry in DB
        const user = await userModel.create({
            firstName, 
            lastName, 
            email, 
            contactNumber, 
            password:hashedPassword, 
            accountType :accountType, 
            approved: approved,
            additionalDetails: profileDetails._id,
            images: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`
        });

        // return response for successfully
        return res.status(200).json({
            success:true,
            user,
            message: "User Registered Successfully"
        });

    } catch (error) {
        console.log(error);
        console.log(error.message);
        return res.status(500).json({
            success:false,
            message:"Something went wrong. during Signup"
        });
    }
}




// logic for login
exports.LogIn = async(req, res) => {
    try {
        // data fetch from req body
        const {email, password} = req.body;

        // do validate :- if missing anyone during filling. so return response
        if(!email || !password){
            return res.status(400).json({
                success:false,
                message:"All fields are required. please try again"
            });
        }

        // check for user, thats user already does not exists in DB
        const userExisting = await userModel.findOne({email}).populate("additionalDetails");
        // if user already exists. so return response
        if(!userExisting){
            return res.status(401).json({
                success:false,
                message:"User not registerd. please signup first"
            });
        }

        // if user is registerd. then generate token after password matching.
        if(await bcrypt.compare(password, userExisting.password)){
            const payload = {
                email:userExisting.email,
                id: userExisting._id,
                accountType: userExisting.accountType
            }
            const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn:"2h"});

            // Save token to userExisting document in database
            userExisting.token = token;
            userExisting.password = undefined;

            // Set cookie for generatetoken and return success response
            const options = {
                expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                httpOnly:true
            }
            res.cookie("token", token, options).status(200).json({
                success:true,
                token,
                user: userExisting,
                message:"Logged in Successfully"
            });
        }else{
            return res.status(401).json({
                success:false,
                message:"Password is Incorrect"
            })
        }

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Something went wrong. When LoggeIN Please try again"
        })
    }
}



// logic for send otp on email
exports.sendOTP = async(req, res) => {
    try {
        // email fetch from req body
        const {email} = req.body;

        // Which i email fetched. these email already exists in db or not.
        const checkEmailPresent = await userModel.findOne({email});
        // if email already exists. so send responsed
        if(checkEmailPresent){
            return res.status(401).json({
                success:false,
                message:"User is Already Registered"
            });
        }

        // if user not exists in db. so now i generate otp
        let otpgenerate = otpGenerator.generate(6, {
            upperCaseAlphabets:false,
            lowerCaseAlphabets:false,
            specialChars:false
        });
        console.log('Otp-Generate', otpgenerate);

        // check thats generate otp. which is otp generate unique or not. It means that this type of OTP does not already exist in the DB.
        const result = await otpModel.findOne({otp: otpgenerate});
        console.log("Result is Generate OTP Func");
		console.log("OTP generate", otpgenerate);
		console.log("Result", result);

        // if already exists otp in DB. so this code re-generate otp and This loop will continue to generate otp until a new otp is found.
        while(result){
            otpgenerate = otpGenerator.generate(6, {
                upperCaseAlphabets:false,
                lowerCaseAlphabets:false,
                specialChars:false
            });
            result = await otpModel.findOne({otp: otpgenerate});
        }

        // when unique otp found. then create entry in DB. for otp
        const otpPayload = {email, otp: otpgenerate};
        const otpEntryinDB = await otpModel.create(otpPayload);
        console.log("Otp Entry In DB", otpEntryinDB);

        // return messgae for successfully
        res.status(200).json({
            success:true,
            message:"Otp Sent Successfully"
        });

    } catch (error) {
        console.log(error);
        console.log(error.message);
        return res.status(500).json({
            success:false,
            error: error.message,
            message:"Something Went Wrong, when i generate otp"
        });
    }
}

// const passwordUpdated = (email, message) => {
//     return `
//         <h1>Password Updated Successfully</h1>
//         <p>Dear user,</p>
//         <p>Your password for the account associated with ${email} has been successfully updated.</p>
//         <p>${message}</p>
//         <p>If you did not request this change, please contact support immediately.</p>
//     `;
// };



// // logic for changePassword
// exports.changePassword = async (req, res) => {
//     try {
//         // Get user data from req.user
//         const userDetails = await userModel.findById(req.user.id);

//         // Check if userDetails exists
//         if (!userDetails) {
//             return res.status(404).json({ success: false, message: "User not found" });
//         }

//         // Get old password, new password, and confirm new password from req.body
//         const { oldPassword, newPassword, confirmNewPassword } = req.body;

//         // Input validation - Ensure all fields are provided
//         if (!oldPassword || !newPassword || !confirmNewPassword) {
//             return res.status(400).json({
//                 success: false,
//                 message: "Please provide old password, new password, and confirm new password"
//             });
//         }

//         // Trim inputs
//         const trimmedOldPassword = oldPassword.trim();
//         const trimmedNewPassword = newPassword.trim();
//         const trimmedConfirmNewPassword = confirmNewPassword.trim();

//         // Log passwords for debugging
//         console.log('Old Password:', trimmedOldPassword);
//         console.log('Hashed Password:', userDetails.password);

//         // Validate old password
//         const isPasswordMatch = await bcrypt.compare(trimmedOldPassword, userDetails.password);
//         if (!isPasswordMatch) {
//             return res.status(401).json({ 
//                 success: false, 
//                 message: "The password is incorrect" 
//             });
//         }

//         // Match new password and confirm new password
//         if (trimmedNewPassword !== trimmedConfirmNewPassword) {
//             return res.status(400).json({
//                 success: false,
//                 message: "New password and confirm password do not match",
//             });
//         }

//         // Check if the new password is the same as the old password
//         if (trimmedOldPassword === trimmedNewPassword) {
//             return res.status(400).json({
//                 success: false,
//                 message: "New password cannot be the same as old password."
//             });
//         }

//         // Update password
//         const encryptedPassword = await bcrypt.hash(trimmedNewPassword, 10);
//         const updatedUserDetails = await userModel.findByIdAndUpdate(
//             req.user.id,
//             { password: encryptedPassword },
//             { new: true }
//         );

//         // Send notification email
//         try {
//             const emailResponse = await mailSender(
//                 updatedUserDetails.email,
//                 passwordUpdated(
//                     updatedUserDetails.email,
//                     `Password updated successfully for ${updatedUserDetails.firstName} ${updatedUserDetails.lastName}`
//                 )
//             );
//             console.log("Email response:", emailResponse);

//             // Check if response property exists before accessing it
//             if (emailResponse && emailResponse.response) {
//                 console.log("Email sent successfully:", emailResponse.response);
//             } else {
//                 console.error("Email response does not contain a 'response' property.");
//             }

//         } catch (error) {
//             console.error("Error occurred while sending email:", error);
//             return res.status(500).json({
//                 success: false,
//                 message: "Error occurred while sending email",
//                 error: error.message,
//             });
//         }

//         // Return success response
//         return res.status(200).json({
//             success: true,
//             message: "Password updated successfully"
//         });

//     } catch (error) {
//         console.error("Error occurred while updating password:", error);
//         return res.status(500).json({
//             success: false,
//             message: "Error occurred while updating password",
//             error: error.message,
//         });
//     }
// };



// Controller for Changing Password
exports.changePassword = async (req, res) => {
	try {
		// Get user data from req.user
		const userDetails = await userModel.findById(req.user.id);

		// Get old password, new password, and confirm new password from req.body
		const { oldPassword, newPassword, confirmNewPassword } = req.body;

		// Validate old password
		const isPasswordMatch = await bcrypt.compare(
			oldPassword,
			userDetails.password
		);
		if (!isPasswordMatch) {
			// If old password does not match, return a 401 (Unauthorized) error
			return res
				.status(401)
				.json({ success: false, message: "The password is incorrect" });
		}

		// Match new password and confirm new password
		if (newPassword !== confirmNewPassword) {
			// If new password and confirm new password do not match, return a 400 (Bad Request) error
			return res.status(400).json({
				success: false,
				message: "The password and confirm password does not match",
			});
		}

		// Update password
		const encryptedPassword = await bcrypt.hash(newPassword, 10);
		const updatedUserDetails = await userModel.findByIdAndUpdate(
			req.user.id,
			{ password: encryptedPassword },
			{ new: true }
		);

		// Send notification email
		try {
			const emailResponse = await mailSender(
				updatedUserDetails.email,
				passwordUpdated(
					updatedUserDetails.email,
					`Password updated successfully for ${updatedUserDetails.firstName} ${updatedUserDetails.lastName}`
				)
			);
			console.log("Email sent successfully:", emailResponse.response);
		} catch (error) {
			// If there's an error sending the email, log the error and return a 500 (Internal Server Error) error
			console.error("Error occurred while sending email:", error);
			return res.status(500).json({
				success: false,
				message: "Error occurred while sending email",
				error: error.message,
			});
		}

		// Return success response
		return res
			.status(200)
			.json({ success: true, message: "Password updated successfully" });
	} catch (error) {
		// If there's an error updating the password, log the error and return a 500 (Internal Server Error) error
		console.error("Error occurred while updating password:", error);
		return res.status(500).json({
			success: false,
			message: "Error occurred while updating password",
			error: error.message,
		});
	}
};