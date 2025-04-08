const express = require("express")
const router = express.Router()

// import controller and middleware
const { updateProfile, deleteAccount, getAllUserDetails, updateDisplayPicture, getEnrolledCourses , instructorDashboard} = require("../controllers/Profie");
const { auth , isInstructor} = require("../middlewares/auth");


// this is all Profile routes
router.put("/updateProfile", auth, updateProfile)
router.delete("/deleteProfile", auth, deleteAccount)
router.get("/getUserDetails", auth, getAllUserDetails)
// Get Enrolled Courses
router.put("/updateDisplayPicture", auth, updateDisplayPicture)
router.get("/getEnrolledCourses", auth, getEnrolledCourses)
router.get("/instructorDashboard", auth, isInstructor, instructorDashboard)

module.exports = router