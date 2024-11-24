import toast from "react-hot-toast";
import {setLoading, setUser} from '../../slices/profileSlice'
import { apiConnector } from "../apiConnector";
import { profileEndpoints } from "../apis";
import {logout} from './authApi'


const {GET_USER_DETAILS_API, GET_USER_ENROLLED_COURSES_API, GET_INSTRUCTOR_DATA_API} = profileEndpoints;


export async function getUserDetails(token, navigate) {
    return async(dispatch) => {
        const toastId = toast.loading("Loading...")
        dispatch(setLoading(true))

        try {
            const response = await apiConnector("GET", GET_USER_DETAILS_API, null, {Authorization: `Bearer ${token}`,})
            console.log("GET_USER_DETAILS API RESPONSE............", response)

            if (!response.data.success) {
                throw new Error(response.data.message)
            }

            const userImage = response.data.data.images
            ? response.data.data.images
            : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.data.firstName} ${response.data.data.lastName}`
            dispatch(setUser({ ...response.data.data, images: userImage }))

        }
        catch (error) {
            dispatch(logout(navigate))
            console.log("GET_USER_DETAILS API ERROR............", error)
            toast.error("Could Not Get User Details")
        }
        toast.dismiss(toastId)
        dispatch(setLoading(false))
    }
}



export async function getUserEnrolledCourses(token) {
     let result = []
    const toastId = toast.loading("Loading...");
    
    try {
      console.log("BEFORE Calling BACKEND API FOR ENROLLED COURSES");
      const response = await apiConnector(
        "GET",
        GET_USER_ENROLLED_COURSES_API,
        null,
        {
            Authorization: `Bearer ${token}`,
        }
      )
      console.log("AFTER Calling BACKEND API FOR ENROLLED COURSES");
  
      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      result = response.data.data

    } catch (error) {
      console.log("GET_USER_ENROLLED_COURSES_API API ERROR............", error)
      toast.error("Could Not Get Enrolled Courses")
    }
    toast.dismiss(toastId)
    return result
}


export async function getInstructorData(token) {
  const toastId = toast.loading("Loading...");
  let result = [];
  try {
    const response = await apiConnector("GET", GET_INSTRUCTOR_DATA_API, null, {
      Authorization: `Bearer ${token}`,
    })

    console.log("GET_INSTRUCTOR API RESPONSE", response);
    result = response?.data?.courses
    
  } catch (error) {
    console.log("Get Instructor Api Error", error)
    toast.error("Could Not Get Instructor Data")
  }
  toast.dismiss(toastId);
  return result;
} 