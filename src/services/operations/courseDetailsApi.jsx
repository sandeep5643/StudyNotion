import {apiConnector} from '../apiConnector'
import {courseEndpoints} from '../apis'
import toast from 'react-hot-toast'


const {
  COURSE_CATEGORIES_API, 
  CREATE_COURSE_API, 
  EDIT_COURSE_API, 
  UPDATE_SECTION_API,
  CREATE_SECTION_API,
  DELETE_SECTION_API,
  DELETE_SUBSECTION_API,
  CREATE_SUBSECTION_API,
  UPDATE_SUBSECTION_API,
  GET_ALL_INSTRUCTOR_COURSES_API,
  DELETE_COURSE_API,
  GET_FULL_COURSE_DETAILS_AUTHENTICATED,
  COURSE_DETAILS_API,
  CREATE_RATING_API,
  LECTURE_COMPLETION_API,

} = courseEndpoints


export const fetchCourseCategories = async () => {
  let result = [];
  try {
    const response = await apiConnector("GET", COURSE_CATEGORIES_API);
    console.log("COURSE_CATEGORIES_API API RESPONSE............", response); 
    
    // Expected success check
    if (response?.data?.success) {
      console.log("Data received from API: ", response.data.data);
      result = response.data.data || [];
    } else {
      throw new Error("Could Not Fetch Course Categories - Invalid Response Structure");
    }
  } catch (error) {
    console.log("COURSE_CATEGORY_API API ERROR............", error.message, error.response);
    toast.error(`Error: ${error.message}`);
  }
  return result;
};




export const addCourseDetails = async (data, token) => {
  let result = null;
  const toastId = toast.loading("Loading...");

  try {
    const response = await apiConnector("POST", CREATE_COURSE_API, data, {
      Authorization: `Bearer ${token}`, 
    });

    console.log("CREATE COURSE API RESPONSE............", response);

    if (!response?.data?.success) {
      throw new Error("Could Not Add Course Details");
    }

    toast.success("Course Details Added Successfully");
    result = response?.data?.data;
  } catch (error) {
    console.log("CREATE COURSE API ERROR............", error);
    toast.error(error.message);
  }

  toast.dismiss(toastId);
  return result;
};

// // add the course details
// export const addCourseDetails = async (data, token) => {
//   let result = null
//   const toastId = toast.loading("Loading...")
//   try {
//     const response = await apiConnector("POST", CREATE_COURSE_API, data, {
//       "Content-Type": "multipart/form-data",
//       Authorization: `Bearer ${token}`,
//     })
//     console.log("CREATE COURSE API RESPONSE............", response)
//     if (!response?.data?.success) {
//       throw new Error("Could Not Add Course Details")
//     }
//     toast.success("Course Details Added Successfully")
//     result = response?.data?.data
//   } catch (error) {
//     console.log("CREATE COURSE API ERROR............", error)
//     toast.error(error.message)
//   }
//   toast.dismiss(toastId)
//   return result
// }



export const editCourseDetails = async (data, token) => {
  let result = null;
  const toastId = toast.loading("Loading...");

  try {
    // Remove explicit Content-Type as FormData handles it automatically
    const response = await apiConnector("POST", EDIT_COURSE_API, data, {
      Authorization: `Bearer ${token}`,
    });

    console.log("EDIT COURSE API RESPONSE:", response);

    // Check for the response structure and status
    if (!response || !response.data) {
      throw new Error("No response from server");
    }

    // Checking the success flag and message
    if (!response.data.success) {
      throw new Error(response.data.message || "Could Not Update Course Details");
    }

    toast.success("Course Details Updated Successfully");
    result = response.data.data;
  } catch (error) {
    // Log detailed error information
    console.error("EDIT COURSE API ERROR:", error);
    
    // Log response errors for more details
    if (error.response) {
      console.error("Error response data:", error.response.data);
      console.error("Error response status:", error.response.status);
    }
    
    toast.error(error.response?.data?.message || error.message || "An error occurred");
  } finally {
    toast.dismiss(toastId); // Ensure toast dismissal on success/error
  }

  return result;
}


// update a section
export const updateSection = async (data, token) => {
  let result = null
  const toastId = toast.loading("Loading...")
  try {
    const response = await apiConnector("POST", UPDATE_SECTION_API, data, {
      Authorization: `Bearer ${token}`,
    })
    console.log("UPDATE SECTION API RESPONSE............", response)
    if (!response?.data?.success) {
      throw new Error("Could Not Update Section")
    }
    toast.success("Course Section Updated")
    result = response?.data?.data
  } catch (error) {
    console.log("UPDATE SECTION API ERROR............", error)
    toast.error(error.message)
  }
  toast.dismiss(toastId)
  return result
}


// create a section
export const createSection = async (data, token) => {
  let result = null
  const toastId = toast.loading("Loading...")
  try {
    const response = await apiConnector("POST", CREATE_SECTION_API, data, {
      Authorization: `Bearer ${token}`,
    })
    console.log("CREATE SECTION API RESPONSE............", response)
    if (!response?.data?.success) {
      throw new Error("Could Not Create Section")
    }
    toast.success("Course Section Created")
    result = response?.data?.updatedCourse
  } catch (error) {
    console.log("CREATE SECTION API ERROR............", error)
    toast.error(error.message)
  }
  toast.dismiss(toastId)
  return result
}


// delete a section
export const deleteSection = async (data, token) => {
  let result = null
  const toastId = toast.loading("Loading...")
  try {
    const response = await apiConnector("POST", DELETE_SECTION_API, data, {
      Authorization: `Bearer ${token}`,
    })
    console.log("DELETE SECTION API RESPONSE............", response)
    if (!response?.data?.success) {
      throw new Error("Could Not Delete Section")
    }
    toast.success("Course Section Deleted")
    result = response?.data?.data
  } catch (error) {
    console.log("DELETE SECTION API ERROR............", error)
    toast.error(error.message)
  }
  toast.dismiss(toastId)
  return result
}

// delete a subsection
export const deleteSubSection = async (data, token) => {
  let result = null
  const toastId = toast.loading("Loading...")
  try {
    const response = await apiConnector("POST", DELETE_SUBSECTION_API, data, {
      Authorization: `Bearer ${token}`,
    })
    console.log("DELETE SUB-SECTION API RESPONSE............", response)
    if (!response?.data?.success) {
      throw new Error("Could Not Delete Lecture")
    }
    toast.success("Lecture Deleted")
    result = response?.data?.data
  } catch (error) {
    console.log("DELETE SUB-SECTION API ERROR............", error)
    toast.error(error.message)
  }
  toast.dismiss(toastId)
  return result
}

// create a subsection
export const createSubSection = async (data, token) => {
  let result = null
  const toastId = toast.loading("Loading...")
  try {
    const response = await apiConnector("POST", CREATE_SUBSECTION_API, data, {
      Authorization: `Bearer ${token}`,
    })
    console.log("CREATE SUB-SECTION API RESPONSE............", response)
    if (!response?.data?.success) {
      throw new Error("Could Not Add Lecture")
    }
    toast.success("Lecture Added")
    result = response?.data?.data
  } catch (error) {
    console.log("CREATE SUB-SECTION API ERROR............", error)
    toast.error(error.message)
  }
  toast.dismiss(toastId)
  return result
}


// update a subsection
export const updateSubSection = async (data, token) => {
  let result = null
  const toastId = toast.loading("Loading...")
  try {
    const response = await apiConnector("POST", UPDATE_SUBSECTION_API, data, {
      Authorization: `Bearer ${token}`,
    })
    console.log("UPDATE SUB-SECTION API RESPONSE............", response)
    if (!response?.data?.success) {
      throw new Error("Could Not Update Lecture")
    }
    toast.success("Lecture Updated")
    result = response?.data?.data
  } catch (error) {
    console.log("UPDATE SUB-SECTION API ERROR............", error)
    toast.error(error.message)
  }
  toast.dismiss(toastId)
  return result
}

// fetching all courses under a specific instructor
export const fetchInstructorCourses = async (token) => {
  let result = []
  const toastId = toast.loading("Loading...")

  try {
    const response = await apiConnector(
      "GET",
      GET_ALL_INSTRUCTOR_COURSES_API,
      null,
      {
        Authorization: `Bearer ${token}`,
      }
    )

    if (!response?.data?.success) {
      throw new Error("Could Not Fetch Instructor Courses")
    }

    result = response?.data?.data
  } catch (error) {
    toast.dismiss(toastId) // Dismiss loading toast first
    console.log("INSTRUCTOR COURSES API ERROR............", error)
    toast.error(error.message) // Show error toast
  } finally {
    // Ensure toast is dismissed after the process completes
    toast.dismiss(toastId)
  }

  return result
}




export const deleteCourse = async (data, token) => {
  const toastId = toast.loading("Loading...")
  try {
    const response = await apiConnector("DELETE", DELETE_COURSE_API, data, {
      Authorization: `Bearer ${token}`,
    })
    console.log("DELETE COURSE API RESPONSE............", response)
    if (!response?.data?.success) {
      throw new Error("Could Not Delete Course")
    }
    toast.success("Course Deleted")
  } catch (error) {
    console.log("DELETE COURSE API ERROR............", error)
    toast.error(error.message)
  }
  toast.dismiss(toastId)
}




// get full details of a course
export const getFullDetailsOfCourse = async (courseId, token) => {
  const toastId = toast.loading("Loading...")
  //   dispatch(setLoading(true));
  let result = null
  try {
    const response = await apiConnector(
      "POST",
      GET_FULL_COURSE_DETAILS_AUTHENTICATED,
      {
        courseId,
      },
      {
        Authorization: `Bearer ${token}`,
      }
    )
    console.log("COURSE_FULL_DETAILS_API API RESPONSE............", response)

    if (!response.data.success) {
      throw new Error(response.data.message)
    }
    result = response?.data?.data
  } catch (error) {
    console.log("COURSE_FULL_DETAILS_API API ERROR............", error)
    result = error.response.data
    // toast.error(error.response.data.message);
  }
  toast.dismiss(toastId)
  //   dispatch(setLoading(false));
  return result
}



export const fetchCourseDetails = async (courseId) => {
  const toastId = toast.loading("Loading...")
  //   dispatch(setLoading(true));
  let result = null
  try {
    const response = await apiConnector("POST", COURSE_DETAILS_API, {
      courseId,
    })
    console.log("COURSE_DETAILS_API API RESPONSE............", response)

    if (!response.data.success) {
      throw new Error(response.data.message)
    }
    result = response.data
  } catch (error) {
    console.log("COURSE_DETAILS_API API ERROR............", error)
    result = error.response.data
    // toast.error(error.response.data.message);
  }
  toast.dismiss(toastId)
  //   dispatch(setLoading(false));
  return result
}


// create a rating for course
export const createRating = async (data, token) => {
  const toastId = toast.loading("Loading...");
  let success = false;

  // Log request data to verify that rating and review are being sent
  console.log("Creating rating with data:", data);

  try {
    // Make the API call
    const response = await apiConnector("POST", CREATE_RATING_API, data, {
      Authorization: `Bearer ${token}`,
    });

    // Log the response from the API
    console.log("CREATE RATING API RESPONSE............", response);

    // Check if the response indicates success
    if (!response?.data?.success) {
      throw new Error(response.data?.message || "Could Not Create Rating");
    }

    toast.success("Rating Created");
    success = true;
  } catch (error) {
    // Handle errors and log more detailed information
    console.error("CREATE RATING API ERROR............", error);
    const errorMessage = error.response?.data?.message || error.message || "An error occurred";
    toast.error(errorMessage);
  }

  // Dismiss the loading toast
  toast.dismiss(toastId);
  return success;
}



// mark a lecture as complete
export const markLectureAsComplete = async (data, token) => {
  let result = null
  console.log("mark complete data", data)
  const toastId = toast.loading("Loading...")
  try {
    const response = await apiConnector("POST", LECTURE_COMPLETION_API, data, {
      Authorization: `Bearer ${token}`,
    })
    console.log(
      "MARK_LECTURE_AS_COMPLETE_API API RESPONSE............",
      response
    )

    if (!response.data.message) {
      throw new Error(response.data.error)
    }
    toast.success("Lecture Completed")
    result = true
  } catch (error) {
    console.log("MARK_LECTURE_AS_COMPLETE_API API ERROR............", error)
    toast.error(error.message)
    result = false
  }
  toast.dismiss(toastId)
  return result
}
