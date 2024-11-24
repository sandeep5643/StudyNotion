// Importing `createSlice` from Redux Toolkit to create a slice for managing the cart state
import { createSlice } from "@reduxjs/toolkit";
// Importing toast notifications from `react-hot-toast` to show success or error messages
import toast from "react-hot-toast";

// Initial state of the cart, fetching data from localStorage if available, otherwise setting default values
const initialState = {
    cart: localStorage.getItem("cart") 
      ? JSON.parse(localStorage.getItem("cart")) // If cart data is present in localStorage, parse it
      : [],                                     // If not, set an empty array as the cart
    total: localStorage.getItem("total") 
      ? JSON.parse(localStorage.getItem("total")) // If total is present in localStorage, parse it
      : 0,                                       // If not, set the total to 0
    totalItems: localStorage.getItem("totalItems") 
      ? JSON.parse(localStorage.getItem("totalItems")) // If totalItems is present in localStorage, parse it
      : 0,                                           // If not, set totalItems to 0
}

// Creating the cart slice with its name, initial state, and reducers
const cartSlice = createSlice({
    name: "cart", // Slice name
    initialState: initialState, // Initial state of the cart
    reducers: {
        // Reducer to handle adding a course to the cart
        addToCart: (state, action) => {
            const course = action.payload;
            // Checking if the course is already in the cart
            const index = state.cart.findIndex((item) => item._id === course._id);

            if (index >= 0) {
                // If the course is already in the cart, show an error toast message
                toast.error("Course already in cart");
                return;
            }

            // If the course is not in the cart, add it to the cart
            state.cart.push(course);
            // Update the total number of items and total price in the cart
            state.totalItems++;
            state.total += course.price;

            // Save the updated cart details to localStorage
            localStorage.setItem("cart", JSON.stringify(state.cart));
            localStorage.setItem("total", JSON.stringify(state.total));
            localStorage.setItem("totalItems", JSON.stringify(state.totalItems));

            // Show success message
            toast.success("Course added to cart");
        },

        // Reducer to handle removing a course from the cart
        removeFromCart: (state, action) => {
            const courseId = action.payload;
            // Find the course in the cart by its ID
            const index = state.cart.findIndex((item) => item._id === courseId);
      
            if (index >= 0) {
              // If the course is found, remove it from the cart
              state.totalItems--;
              state.total -= state.cart[index].price;
              state.cart.splice(index, 1);

              // Update localStorage with the new cart details
              localStorage.setItem("cart", JSON.stringify(state.cart));
              localStorage.setItem("total", JSON.stringify(state.total));
              localStorage.setItem("totalItems", JSON.stringify(state.totalItems));

              // Show success message
              toast.success("Course removed from cart");
            }
        },

        // Reducer to reset the cart (clear all items)
        resetCart: (state) => {
            state.cart = [];  // Empty the cart
            state.total = 0;  // Reset the total price
            state.totalItems = 0; // Reset the total number of items

            // Remove cart data from localStorage
            localStorage.removeItem("cart");
            localStorage.removeItem("total");
            localStorage.removeItem("totalItems");

            // No toast message is shown for cart reset
        },
    }
})

// Exporting the action creators for adding, removing, and resetting the cart
export const { addToCart, removeFromCart, resetCart } = cartSlice.actions;
// Exporting the cart reducer to be used in the store
export default cartSlice.reducer;
