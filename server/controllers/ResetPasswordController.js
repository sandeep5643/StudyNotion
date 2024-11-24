const userModel = require('../models/userModel');
const mailSender = require('../utlis/mailSender');
const bcrypt = require("bcrypt");
const crypto = require('crypto');

// generate token for resetPassword. 
exports.resetTokenPassword = async(req, res) => {
    try {
        //fetch email from req body
        const email = req.body.email;
        
        // email validation for user already exists or not
        const user = await userModel.findOne({email:email});
        // if user not exists in DB. So return response
        if(!user){
            return res.status(401).json({
                success:false,
                message:"Your Email not registered"`This Email: ${email} is not Registered With Us Enter a Valid Email `
            });
        }

        // generate token using crypto
        const token = crypto.randomBytes(20).toString("hex");

        // update user by adding token and expiration time.
        const updatedDetails = await userModel.findOneAndUpdate({email:email}, {token:token, resetPasswordExpires: Date.now() + 5*60*1000}, {new:true});
        console.log("UPDATED DETAILS", updatedDetails);

        // create url
        const url = `http://localhost:3000/update-password/${token}`

        // mail send using this link
        await mailSender(email, "Password Reset", `Password Reset Link: ${url}`);

        // return response
        return res.status(200).json({
            success:true,
            message:"Email sent successfully. Please check email and change password"
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Something went wrong. during email sent and reset password"
        });
    }
}



// reset password logic. thats is actual logic for reset password
exports.resetPassword = async(req, res) => {
    try {
        // data fetch from req body
        const {password, confirmPassword, token} = req.body;

        // validate :- password and confirmPassword this is matching or not
        if(password !== confirmPassword){
            return res.status(401).json({
                success:false,
                message:"Password and confirmPassword do not matched"
            });
        }

        //find userDetails from DB using token
        const userDetails = await userModel.findOne({token:token});
        // if token not find in Db
        if(!userDetails){
            return res.status(401).json({
                success:false,
                message:"Token Invalid"
            });
        }
        // if token is expired means. thats expiry time set in resetPasswordExpires. this expiry time end
        if((!userDetails.resetPasswordExpires > Date.now())){
            return res.status(403).json({
                success:false,
                message:"Token is Expired. Please Regenerate your token"
            });
        }

        // hased password
        const hashedPassword = await bcrypt.hash(password, 10);
        // password Update in DB 
        await userModel.findOneAndUpdate({token:token}, {password:hashedPassword}, {new:true});

        // return response
        return res.status(200).json({
            success:true,
            message:"Password Reset Successfully"
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:`Some Error in Updating the Password`
        })
    }
}