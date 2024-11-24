const CategoryModel = require('../models/CategoryModel');


// // // Handler function for creating a category
// exports.createCategory = async(req, res) => {
//     try{
//         // Fetch data from request body
//         const { name, description } = req.body;

//          // Validation: Check if all fields are filled
// 		 if (!name || !description) {
//             return res.status(400).json({
//                 success: false,
//                 message: "All fields are required. Please fill all fields."
//             });
//         }

//         // Create entry in the database
//         const categoryDetails = await CategoryModel.create({ name: name, description: description });
//         console.log("Created Category Details:", categoryDetails);

//         // Return response
//         return res.status(200).json({
//             success: true,
//             message: "Category Created Successfully",
//             data: categoryDetails, // Include created category details
//         });

//     }catch(error){
//         console.error("Error creating category:", error); // Log the whole error object
//         return res.status(500).json({
//             success: false,
//             message: "Something went wrong while creating the category."
//         });
//     }
// }


// Handler function for creating a category
exports.createCategory = async (req, res) => {
    try {
        // Destructure and trim data from request body
        const { name, description } = req.body;
        const trimmedName = name?.trim();
        const trimmedDescription = description?.trim();

        // Validation: Check if all fields are filled
        if (!trimmedName || !trimmedDescription) {
            return res.status(400).json({
                success: false,
                message: "All fields are required. Please fill all fields."
            });
        }

        // Create entry in the database
        const categoryDetails = await CategoryModel.create({ 
            name: trimmedName, 
            description: trimmedDescription 
        });
        console.log("Created Category Details:", categoryDetails);

        // Return response
        return res.status(200).json({
            success: true,
            message: "Category Created Successfully",
            data: categoryDetails, // Include created category details
        });

    } catch (error) {
        console.error("Error creating category:", error); // Log the whole error object
        return res.status(500).json({
            success: false,
            message: "Something went wrong while creating the category.",
            error: error.message, // Optional: include for easier debugging during development
        });
    }
};



// Handler function of fetchAllCategory
exports.fetchAllCategory = async(req, res) => {
    try {
        // find all details in db of Category.
        const fetchAllCategoryDetails = await CategoryModel.find({}, {name:true, description:true});
        console.log(fetchAllCategoryDetails);

        // return response 
        return res.status(200).json({
            success:true,
			      data: fetchAllCategoryDetails,
            message:"All Category fetched successfully"
        })

    } catch (error) {
        console.log(error);
        console.log(error.message);
        return res.status(500).json({
            success:false,
            message:"Something went wrong. While fetching category"
        })
    }
}




// exports.categoryPageDetails = async (req, res) => {
//     try {
//       const { categoryId } = req.body
//       console.log("PRINTING CATEGORY ID: ", categoryId);
//       // Get courses for the specified category
//       const selectedCategory = await CategoryModel.findById(categoryId)
//         .populate({
//           path: "courses",
//           match: { status: "Published" },
//           // populate: "ratingAndReviews",
//         })
//         .exec()
  
//       console.log("SELECTED COURSE", selectedCategory)
//       // Handle the case when the category is not found
//       if (!selectedCategory) {
//         console.log("Category not found.")
//         return res
//           .status(404)
//           .json({ success: false, message: "Category not found" })
//       }
//       // Handle the case when there are no courses
//       if (selectedCategory.courses.length === 0) {
//         console.log("No courses found for the selected category.")
//         return res.status(404).json({
//           success: false,
//           message: "No courses found for the selected category.",
//         })
//       }
  
//       // Get courses for other categories
//       const categoriesExceptSelected = await CategoryModel.find({
//         _id: { $ne: categoryId },
//       })
//       let differentCategory = await CategoryModel.findOne(
//         categoriesExceptSelected[getRandomInt(categoriesExceptSelected.length)]
//           ._id
//       )
//         .populate({
//           path: "courses",
//           match: { status: "Published"},
//         })
//         .exec()
//         console.log("Different COURSE", differentCategory)
//       // Get top-selling courses across all categories
//       const allCategories = await CategoryModel.find()
//         .populate({
//           path: "courses",
//           match: { status: "Published" },
//           populate: {
//             path: "instructor",
//         },
//         })
//         .exec()
//       const allCourses = allCategories.flatMap((category) => category.courses)
//       const mostSellingCourses = allCourses
//         .sort((a, b) => b.sold - a.sold)
//         .slice(0, 10)
//        console.log("mostSellingCourses COURSE", mostSellingCourses)
//       res.status(200).json({
//         success: true,
//         data: {
//           selectedCategory,
//           differentCategory,
//           mostSellingCourses,
//         },
//       })
//     } catch (error) {
//       return res.status(500).json({
//         success: false,
//         message: "Internal server error",
//         error: error.message,
//       })
//     }
//   }



// Handler function for category page details
exports.categoryPageDetails = async (req, res) => {
    try {
        const { categoryId } = req.body;
        console.log("PRINTING CATEGORY ID: ", categoryId);

        // Get courses for the specified category
        const selectedCategory = await CategoryModel.findById(categoryId)
            .populate({
                path: "courses",
                match: { status: "Published" },
            })
            .exec();

        console.log("SELECTED COURSE", selectedCategory);

        // Handle the case when the category is not found
        if (!selectedCategory) {
            console.log("Category not found.");
            return res.status(404).json({ success: false, message: "Category not found" });
        }

        // Handle the case when there are no courses
        if (!selectedCategory.courses || selectedCategory.courses.length === 0) {
            console.log("No courses found for the selected category.");
            return res.status(200).json({
                success: true,
                data: {
                    selectedCategory: { ...selectedCategory.toObject(), courses: [] },
                },
                message: "No courses found for the selected category.",
            });
        }

        // Get courses for other categories
        const categoriesExceptSelected = await CategoryModel.find({
            _id: { $ne: categoryId },
        });

        // Function to get a random integer between min (inclusive) and max (inclusive)
        const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

        // Ensure there are categories to choose from
        if (categoriesExceptSelected.length === 0) {
            console.log("No different categories available.");
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
        let differentCategory = await CategoryModel.findById(categoriesExceptSelected[randomIndex]._id)
            .populate({
                path: "courses",
                match: { status: "Published" },
            })
            .exec();

        console.log("Different COURSE", differentCategory);

        // Get top-selling courses across all categories
        const allCategories = await CategoryModel.find()
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

        console.log("mostSellingCourses COURSE", mostSellingCourses);

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
