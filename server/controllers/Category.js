const { default: mongoose } = require("mongoose");
const Category = require("../models/Category");


exports.createCategory = async(req, res) => {
    try {
        
        // fetch data from request body
        const {name, description} = req.body;

        // validation
        if(!name || !description){
            return res.status(400).json({
                success:false,
                message:"All fields are required"
            });
        }

        // Database Entry
        const CategorysDetails = await Category.create({name:name, description:description});

        // Success Response
        return res.status(200).json({
            success:true,
            message:"Categorys Created Successfully"
        });

        // Error Handling
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success:false,
            message:error.message
        });
    }
}



exports.showAllCategories = async (req, res) => {
	try {
		const allCategorys = await Category.find({});
		res.status(200).json({
			success: true,
			data: allCategorys,
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: error.message,
		});
	}
};



// Handler function for category page details
exports.categoryPageDetails = async (req, res) => {
    try {
        const { categoryId } = req.body;

        // Get courses for the specified category
        const selectedCategory = await Category.findById(categoryId)
            .populate({
                path: "courses",
                match: { status: "Published" },
            })
            .exec();

        ("SELECTED COURSE", selectedCategory);

        // Handle the case when the category is not found
        if (!selectedCategory) {
            return res.status(404).json({ success: false, message: "Category not found" });
        }

        // Handle the case when there are no courses
        if (!selectedCategory.courses || selectedCategory.courses.length === 0) {
            return res.status(200).json({
                success: true,
                data: {
                    selectedCategory: { ...selectedCategory.toObject(), courses: [] },
                },
                message: "No courses found for the selected category.",
            });
        }

        // Get courses for other categories
        const categoriesExceptSelected = await Category.find({
            _id: { $ne: categoryId },
        });

        // Function to get a random integer between min (inclusive) and max (inclusive)
        const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

        // Ensure there are categories to choose from
        if (categoriesExceptSelected.length === 0) {
            return res.status(200).json({
                success: true,
                data: {
                    selectedCategory,
                    differentCategory: null,
                },
                message: "No different categories available.",
            });
        }

        // Get a random category from categoriesExceptSelected
        let randomIndex = getRandomInt(0, categoriesExceptSelected.length - 1);
        let differentCategory = await Category.findById(categoriesExceptSelected[randomIndex]._id)
            .populate({
                path: "courses",
                match: { status: "Published" },
            })
            .exec();


        // Get top-selling courses across all categories
        const allCategories = await Category.find()
            .populate({
                path: "courses",
                match: { status: "Published" },
                populate: {
                    path: "instructor",
                },
            })
            .exec();

        const allCourses = allCategories.flatMap((category) => category.courses);
        const mostSellingCourses = allCourses
            .sort((a, b) => b.sold - a.sold)
            .slice(0, 10);


        res.status(200).json({
            success: true,
            data: {
                selectedCategory,
                differentCategory,
                mostSellingCourses,
            },
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message,
        });
    }
};
