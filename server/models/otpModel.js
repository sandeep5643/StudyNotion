const mongoose = require('mongoose');
const mailSender = require('../utlis/mailSender');
const emailTemplate = require("../mail/templates/emailVerificationTemplate");

// this is schema. which save data in database.
const otpSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    otp:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now,
        expires:60 * 5, // The document will be automatically deleted after 5 minutes of its creation time
    }
});

// a function for mailSender
async function sendVerificationEmail(email, otp){
    try {
        const mailsender = await mailSender(email, "Verification Email from StudyNotion", emailTemplate(otp));
        console.log("Email sent Successfully", mailsender);
    } catch (error) {
        console.log("Error When I Send Email", error);
        throw error
    }
}

// pre middleware for save data. after mailSender.
otpSchema.pre("save", async function(next) {
	console.log("New document saved to database");

    if(this.isNew){
        await sendVerificationEmail(this.email, this.otp);
    }
    next();
});

module.exports = mongoose.model("OTP", otpSchema);



// summary :- 
// pre middleware db me otp save hone se pahle mail send karta hai. save yaha pe ek method hai jo db me otp save karta hai.
// Jab ham otpSchema.pre("save") hook mein ho, this object wo document hota hai jo abhi database mein save hone wala hai. Toh jab ham this.email aur this.otp use karte hai, ham us specific OTP entry ka email aur OTP value le rahe hai. jo abhi abhi create hui hai.
// next() Mongoose ko batata hai ki jo custom code (jaise email bhejna) hum pre-hook mein kar rahe hain, wo complete ho gaya hai, aur ab save operation ko aage continue kiya ja sakta hai.