const express = require("express")
const router = express.Router()

const { auth, isInstructor } = require("../middleware/AuthMiddleware");
const {updateProfile, deleteAccount, getAllProfileDetails, updateDisplayPicture, getEnrolledCourses, instructorDashboard} = require("../controllers/ProfileController");

// ********************************************************************************************************
//                                      Profile routes
// ********************************************************************************************************
// Delet User Account
router.put("/updateProfile", auth, updateProfile)
router.delete("/deleteProfile", auth, deleteAccount)
router.get("/getAllProfileDetails", auth, getAllProfileDetails)

// Get Enrolled Courses
router.put("/updateDisplayPicture", auth, updateDisplayPicture);
router.get("/getEnrolledCourses", auth, getEnrolledCourses);

router.get("/instructorDashboard", auth, isInstructor, instructorDashboard);

module.exports = router