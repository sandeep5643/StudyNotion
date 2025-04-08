const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const bcrypt = require("bcrypt");


exports.resetPasswordToken = async (req, res) => {
    try {

        // Request Body se Email lena:
        const email = req.body.email;

        //  Database me User Check karna:
        const user = await User.findOne({email: email});

        if(!user) {
            return res.status(401).json({
                success: false,
                message: "Your Email is not registerd with us"
            });
        }

        // Token Generate karna aur User Details Update karna:
        const token = crypto.randomUUID();

        const updateDetails = await User.findOneAndUpdate(
                                                        {email:email}, 
                                                        {token:token, resetPasswordExpires: Date.now() + 5*60*1000}, 
                                                        {new:true}
                                                    );
        
        // Password Reset Link Banana:
        const url = `http://localhost:3000/update-password/${token}`

        // Email Send karna:
        await mailSender(email, "Password Reset Link", `Password Reset Link: ${url}`);
        
        // Success Response:
        return res.status(200).json({
            success:true,
            message:"Email Sent Successfully, Please check email and reset password"
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success:false,
            message:"Something went wrong while send reset password link"
        });
    }
}



exports.resetPassword = async (req, res) => {
    try {
        
        // 
        const {password, confirmPassword, token} = req.body;

        // Request Body Validate Karna
        if(password !== confirmPassword){
            return res.status(401).json({
                success: false,
                message: "Password not matched"
            });
        }

        // Token Ko Verify Karna
        const userDetails = await User.findOne({token: token});

        // if token invalid: yani token user se match nahi karta
        if(!userDetails){
            return res.status(402).json({
                success: false,
                message: "Token is invalid"
            });
        }

        // Token Expiry Check Karna
        if(userDetails.resetPasswordExpires < Date.now()){
            return res.status(403).json({
                success: false,
                message: "Token time is expired, Please regenerate your token"
            });
        }

        //  Password Hash Karna
        const hashedPassword = await bcrypt.hash(password, 10);

        // Database Me Password Update Karna 
        await User.findOneAndUpdate(
            {token: token},
            {password: hashedPassword},
            {new: true}
        );

        // Response Bhejna
        return res.status(200).json({
            success: true,
            message: "Password Reset Successfully"
        });

    // Error Handling
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong while reset password"
        });
    }
}