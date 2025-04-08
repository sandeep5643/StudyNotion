const jwt = require("jsonwebtoken");
require("dotenv").config();


exports.auth = async (req, res, next) => {
    try {

        // Token Ko Retrieve Karna
        const token = req.cookies.token
                        || req.body.token
                        || req.header("Authorization").replace("Bearer ", "");

        // Token Missing Check
        if(!token){
            return res.status(401).json({
                success:false,
                message:"Token is missing"
            });
        }

        try {
            // Token Verify Karna
            const decode = jwt.verify(token, process.env.JWT_SECRET);

            //Token Payload ko req.user Mein Store Karna for next middleware.
            req.user = decode;

            // Invalid Token Handling
        } catch (error) {
            return res.status(401).json({
                success:false,
                message:"token is invalid"
            });
        }
        // next() Call
        next();

    } catch (error) {
        return res.status(401).json({
            success:false,
            message:"Something went wrong while validating the token"
        });
    }
}


exports.isStudent = async (req, res, next) => {
    try {
        if(req.user.accountType !== "Student"){
            return res.status(401).json({
                success:false,
                message:"This is protected route for studnet only"
            })
        }
        next();

    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"User role can't verified, Please try again"
        });
    }
}


exports.isInstructor = async (req, res, next) => {
    try {
        if(req.user.accountType !== "Instructor"){
            return res.status(401).json({
                success:false,
                message:"This is protected route for instructor only"
            })
        }
        next();

    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"User role can't verified, Please try again"
        });
    }
}


exports.isAdmin = async (req, res, next) => {
    try {
        if(req.user.accountType !== "Admin"){
            return res.status(401).json({
                success:false,
                message:"This is protected route for admin only"
            })
        }
        next();

    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"User role can't verified, Please try again"
        });
    }
}