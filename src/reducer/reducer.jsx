// Redux se `combineReducers` function ko import kar rahe hain.
// Iska use multiple reducers ko ek root reducer mein combine karne ke liye hota hai.
import {combineReducers} from "@reduxjs/toolkit";

// Different slices ko import kar rahe hain jo Redux store ke alag-alag parts ko manage karte hain.
// `authSlice` authentication-related state (like token, signup data) ko handle karega.
import authReducer from '../slices/authSlice';

// `profileSlice` user profile ke data (like name, age, etc.) ko manage karega.
import profileReducer from '../slices/profileSlice';

// `cartSlice` shopping cart ke data (like items, total count) ko handle karega.
import cartReducer from "../slices/cartSlice";

import courseReducer from '../slices/courseSlice'
import viewCourseReducer from '../slices/viewCourseSlice'
import categoryReducer from "../slices/categorySlice"



// `combineReducers` ke through alag-alag slices ko ek rootReducer mein combine kar rahe hain.
// Yahan pe `auth`, `profile`, aur `cart` Redux store ke different parts ko manage karenge.
const rootReducer = combineReducers({
    auth: authReducer,     // Auth slice ko `auth` state ke liye combine kiya jaa raha hai
    profile: profileReducer, // Profile slice ko `profile` state ke liye combine kiya jaa raha hai
    cart: cartReducer,     // Cart slice ko `cart` state ke liye combine kiya jaa raha hai
    course: courseReducer,
    viewCourse: viewCourseReducer,
    category: categoryReducer,
    
});

// rootReducer ko default export kar rahe hain, taaki isse Redux store mein use kiya ja sake.
export default rootReducer;
