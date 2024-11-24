// Import the Mongoose library
const mongoose = require('mongoose');

// Define the user schema using the Mongoose Schema constructor
const userSchema = new mongoose.Schema({
    // Define the name field with type String, required, and trimmed
    firstName:{
        type:String,
        required: true,
        trim:true
    },
    lastName:{
        type:String,
        required:true,
        trim:true
    },
    // Define the email field with type String, required, and trimmed
    email:{
        type:String,
        required:true,
        trim:true
    },
    // Define the password field with type String and required
    password:{
        type:String,
        required:true,
    },
    // Define the role field with type String and enum values of "Admin", "Student", or "Visitor"
    accountType:{
        type:String,
        required:true,
        enum:['Admin', "Student", "Instructor"]
    },
    active:{
        type:Boolean,
        default: true
    },
    additionalDetails:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Profile",
        required:true
    },
    courses:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Course"
        }
    ],
    token:{
        type:String
    },
    resetPasswordExpires:{
        type:Date
    },
    images:{
        type:String,
        required:true
    },
    courseProgress: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "courseProgress",
        },
    ],

    // Add timestamps for when the document is created and last modified

}, { timestamps: true });

// Export the Mongoose model for the User schema, using the name "User"
module.exports = mongoose.model("User", userSchema);