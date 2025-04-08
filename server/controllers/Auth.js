// Import Dependencies
const User = require("../models/User");
const OTP = require("../models/OTP");
const otpGenerator = require("otp-generator");
const bcrypt = require("bcrypt");
const Profile = require("../models/Profile");
const jwt = require("jsonwebtoken");
const mailSender = require("../utils/mailSender");
const { passwordUpdated } = require("../mail/templates/passwordUpdate");
require("dotenv").config();



// signup
exports.signUp = async (req, res) => {
    
    try {
        // Input (req.body) se data extract karna:
        const {
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
            contactNumber,
            accountType,
            otp
        } = req.body;
        
        // Validation: Sabhi fields ko check karna:
        if(!firstName || !lastName || !email || !password || !confirmPassword || !otp) {
            return res.status(403).json({
                success:false,
                message:"All fields are required"
            });
        }
    
        // Password aur Confirm Password ko check karna:
        if(password !== confirmPassword){
            return res.status(400).json({
                success: false,
                message:"Password and Confirm Password do not match. Please try again."
            });
        }
        
        // Existing User ka check karna:
        const existingUser = await User.findOne({email});
    
        if(existingUser){
            return res.status(400).json({
                success: false,
                message:"User already exists. Please sign in to continue."
            });
        }
        
        // OTP ka verify karna: OTP Model se latest OTP find karte hain jo us email ke liye generate hui thi:
        const recentOtp = await OTP.find({email}).sort({createdAt: -1}).limit(1);
        
        // Agar OTP nahi milti ya invalid hoti hai, error return hota hai
        if(recentOtp.length === 0){
            return res.status(400).json({
                success:false,
                message:"The OTP is not valid"
            });
            // yadi user ka otp and database ka otp match na ho to response send karenge "Invalid Otp"
        }else if(otp !== recentOtp[0].otp){
            return res.status(400).json({
                success:false,
                message:"Invalid Otp"
            })
        }
        
        // Password ko Hash karna: bcrypt ka use karke password ko hash karte hain (secure banate hain)
        const hashPassword = await bcrypt.hash(password, 10);

        // Create the user 
		let approved = "";
		approved === "Instructor" ? (approved = false) : (approved = true);
        
        // Profile Create karna: User ke liye ek empty profile create hota hai
        const profileDetails = await Profile.create({
            gender: null,
            dateOfBirth: null,
            about: null,
            contactNumber: null
        });
        
        // New User ka Data Save karna: User Model me user ka data save hota hai
        const user = await User.create({
            firstName,
            lastName,
            email,
            contactNumber,
            password: hashPassword,
            accountType: accountType,
            approved: approved,
            additionalDetails: profileDetails._id,
            // DiceBear API ka use karke ek profile image generate karna, jisme user ke first name aur last name ka combination hoga.
            image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}` 
        });

        // Success Response Bhejna:
        return res.status(200).json({
            success:true,
            message:"User Registered Successfully",
            user
        })

        // Error Handling: Agar koi bhi unexpected error aata hai toh catch block me error handle hota hai aur response bheja jata hai:
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success:false,
            message:"user can not be registerd, Please try again"
        });
    }
    
}




// login 
// Function Initialization: Yeh function login request handle karta hai:
exports.login = async(req, res) => {
    try {

        // Extract and Validate Input Fields
        const {email, password} = req.body;

        if(!email || !password){
            return res.status(400).json({
                success:false,
                message:"Please Fill up All the Required Fields"
            })
        }

        // Find User in Database
        const user = await User.findOne({email}).populate("additionalDetails");

        // Check If User Exists
        if(!user){
            return res.status(401).json({
                success:false,
                message:"User is not Registered with Us Please SignUp to Continue"
            })
        }

        // Compare Password
        if(await bcrypt.compare(password, user.password)){

            // so now Generate Token
            const payload = {
                email: user.email,
                id: user._id,
                accountType: user.accountType
            }
            const token = jwt.sign(payload, process.env.JWT_SECRET, {
                expiresIn: "24h"
            });

            // Set Token in User Object
            user.token = token;
            user.password = undefined;

            // Cookie Options and Set Cookie
            const options = {
                expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                httpOnly: true
            }

            res.cookie("token", token, options).status(200).json({
                success:true,
                token,
                user,
                message:"Logged In Successfully"
            });

            // Password Mismatch Case
        } else {
            return res.status(401).json({
                success:false,
                message:"Password is incorrect"
            })
        }

        //  Catch Block for Errors
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success:false,
            message:"Login Failure, Please try again"
        });
    }
}



// Define sendOTP Controller Function
exports.sendOTP = async(req, res) => {
    try {

        // Extract email from req.body
        const {email} = req.body;

        // Check if user already exists. bases on email.
        const checkUserPresent = await User.findOne({email});

        if(checkUserPresent){
            return res.status(401).json({
                success:false,
                message:"User is already registerd"
            })
        }

        // Generated otp using otp-generator Library.
        var otp = otpGenerator.generate(6, {
            upperCaseAlphabets:false,
            lowerCaseAlphabets:false,
            specialChars:false
        });

        // Ensure otp Uniqueness
        let result = await OTP.findOne({otp:otp});
        // jab tak ek unique otp generate nahi hoga tab tak ye loop chalega.
        while(result){
            otp = otpGenerator.generate(6, {
                upperCaseAlphabets:false,
                lowerCaseAlphabets:false,
                specialChars:false
            })
            result = await OTP.findOne({otp:otp})
        }

        // Save otp to Database
        const otpPayload = {email, otp}

        const otpBody = await OTP.create(otpPayload)

        // send Response
        res.status(200).json({
            success:true,
            message:"Otp Sent Successfully",
            otp // here otp incudes in response for testing purposes. but  Security: Do not send otp in the response in production.
        }); 
    
        // Error Handling 
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}




// Controller for Changing Password
exports.changePassword = async (req, res) => {
	try {
		// Get user data from req.user
		const userDetails = await User.findById(req.user.id);

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
		const updatedUserDetails = await User.findByIdAndUpdate(
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