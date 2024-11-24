const CourseProgress = require("../models/courseProgressModel");
const SubSection = require("../models/subSectionModel");

exports.updateCourseProgress = async (req, res) => {
    const { courseId, subSectionId } = req.body;
    const userId = req.user.id;

    try {
        // Check if the subsection is valid
        const subSection = await SubSection.findById(subSectionId);
        if (!subSection) {
            return res.status(404).json({
                success: false,
                error: "Invalid SubSection ID",
            });
        }
        console.log("SubSection validation done.");

        // Check for existing course progress entry, if not, create one
        let courseProgress = await CourseProgress.findOne({ courseId, userId });

        if (!courseProgress) {
            // If course progress does not exist, create a new one
            courseProgress = new CourseProgress({
                courseId,
                userId,
                completeVideo: []
            });
            console.log("Course Progress not found, creating a new entry.");
        }

        // Check for already completed video/subsection
        if (courseProgress.completeVideo.includes(subSectionId)) {
            return res.status(400).json({
                success: false,
                error: "This subsection is already marked as complete.",
            });
        }

        // Push the subSectionId into completeVideo array
        courseProgress.completeVideo.push(subSectionId);
        console.log("Subsection successfully added to completeVideo array.");

        // Save the updated course progress document
        await courseProgress.save();
        console.log("Updated courseProgress saved successfully:", courseProgress);

        return res.status(200).json({
            success: true,
            message: "Course Progress Updated Successfully",
            data: courseProgress,
        });
    } catch (error) {
        console.error("Error in updateCourseProgress:", error);
        return res.status(500).json({
            success: false,
            error: "Internal Server Error",
        });
    }
};
