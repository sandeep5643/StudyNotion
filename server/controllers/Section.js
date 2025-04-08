const Section = require("../models/Section");
const Course = require("../models/Course");
const SubSection = require("../models/SubSection");


exports.createSection = async (req, res) => {
    try {
        
        // Request Data Extract karna:
        const {sectionName, courseId} = req.body;

        // Validation
        if(!sectionName || !courseId) {
            return res.status(400).json({
                sucess:false,
                message:"Missing Properties"
            });
        }

        // Create New Section in Db
        const newSection = await Section.create({sectionName});

        // Section ko Course ke saath Link karna:
        const updatedCourse = await Course.findByIdAndUpdate(
            courseId,
            {
                $push:{
                    courseContent:newSection._id
                }
            },
            {new:true}
        ).populate({
            path:"courseContent",
            populate:{
                path:"subSection"
            }
        });

        // Success Return
        return res.status(200).json({
            success:true,
            message:"Section Create Successfully",
            updatedCourse
        });

        //Error Handling: Agar koi error aaye toh console me log aur client ko error message return hota hai.
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success:false,
            message:"Something went wrong, during section creations",
            error: error.message
        });
    }
}



exports.updateSection = async(req, res) => {
    try {
        
        // Input Validation:
        const {sectionName, sectionId, courseId} = req.body;

        if(!sectionName || !sectionId) {
            return res.status(400).json({
                sucess:false,
                message:"Missing Properties"
            });
        }
        
        // Find and Update Section:
        const section = await Section.findByIdAndUpdate(sectionId, {sectionName}, {new:true});

        if (!section) {
            return res.status(404).json({
                success: false,
                message: "Section not found",
            });
        }

        const course = await Course.findById(courseId).
        populate({
            path:"courseContent",
            populate:{
                path:"subSection"
            }
        })
        .exec();

        // Response: Agar section successfully update hota hai, server ek success response deta hai:
        return res.status(200).json({
            success:true,
            data:course,
            message:"Updated Section Successfully",
        });

        // Error Handling : Agar koi error aata hai, toh 500 status ke saath error message return hota hai.
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success:false,
            message:"Something went wrong, during section updations",
            error: error.message
        });
    }
}



// DELETE a section
exports.deleteSection = async (req, res) => {
	try {

		const { sectionId, courseId }  = req.body;
		await Course.findByIdAndUpdate(courseId, {
			$pull: {
				courseContent: sectionId,
			}
		})
		const section = await Section.findById(sectionId);
		if(!section) {
			return res.status(404).json({
				success:false,
				message:"Section not Found",
			})
		}

		//delete sub section
		await SubSection.deleteMany({_id: {$in: section.subSection}});

		await Section.findByIdAndDelete(sectionId);

		//find the updated course and return 
		const course = await Course.findById(courseId).populate({
			path:"courseContent",
			populate: {
				path: "subSection"
			}
		})
		.exec();

		res.status(200).json({
			success:true,
			message:"Section deleted",
			data:course
		});
	} catch (error) {
		console.error("Error deleting section:", error);
		res.status(500).json({
			success: false,
			message: "Internal server error",
		});
	}
};   