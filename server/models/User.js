// Yeh line mongoose module ko import kar rahi hai jo MongoDB ke saath interaction ke liye use hota hai.
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
    },
    accountType:{
        type: String,
        enum: ["Admin", "Student", "Instructor"],
        required: true
    },
    active: {
        type: Boolean,
        default: true,
    },
    approved: {
        type: Boolean,
        default: true,
    },
    additionalDetails: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Profile"
    },
    courses: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Course" // Yeh field ek array hai jo Course collection ke ObjectId references ko store karti hai. Matlab, ek user ke paas multiple courses ho sakte hain.
        }
    ],
    image: {
        type: String,
        required: true
    },
    token: {
        type: String,
    },
    resetPasswordExpires: {
        type: Date,
    },
    courseProgress: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "courseProgress" // user ke course completion progress ko track karne ke liye yeh references use kiye jayenge.
        }
    ]
},{ timestamps: true });

// ye line User model ko export kar rahi hai using userSchema. es schema ko MongoDB ke sath interact kiya ja sakta hai.
module.exports = mongoose.model("User", userSchema)