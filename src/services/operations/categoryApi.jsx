import { apiConnector } from "../apiConnector";
import toast from 'react-hot-toast';
import { categories } from "../apis";

const { CREATE_CATEGORY_API } = categories;

export const createCategory = async (data, token) => {
  try {
    console.log("Sending API request to create category with data:", data);

    // Extract the token from localStorage
    token = localStorage.getItem("token")?.replace(/['"]+/g, '');  // Clean token if needed
    if (!token) {
      throw new Error("Authorization token is missing.");
    }

    // Check if the API response has already been handled (use a flag)
    let isCategoryCreated = false; // Prevent multiple toasts

    // API request with authorization and content type
    const response = await apiConnector("POST", CREATE_CATEGORY_API, data, {
      Authorization: `Bearer ${token}`,
    });

    console.log("API Response:", response?.data);

    // Check if the response structure is valid and the category is created
    if (response?.data?.success && response?.data?.data) {
      if (!isCategoryCreated) {
        toast.success("Category created successfully!");
        isCategoryCreated = true;  // Set flag to true to prevent duplicate toasts
      }
      return response?.data?.data;  // Return the created category details
    } else {
      console.error("Invalid response structure:", response?.data);
      toast.error("Could not create category - Invalid response structure");
      return null;
    }
  } catch (error) {
    console.error("CREATE_CATEGORY_API Error:", error.message);

    // Error handling with response check
    if (error?.response) {
      console.error("Error Response:", error.response);
      toast.error(`Error: ${error.response?.data?.message || error.message}`);
    } else {
      toast.error(`Error: ${error.message}`);
    }

    return null;  // Return null if error occurs
  }
};
