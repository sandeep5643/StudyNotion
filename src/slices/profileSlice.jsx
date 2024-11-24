// Importing `createSlice` from Redux Toolkit to create a slice for managing profile-related state
import { createSlice } from "@reduxjs/toolkit";

// Initial state for the profile, starting with `user` set to `null`
const initialState = {
    user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null, // User data will be stored here once set
    loading: false
};

// Creating the profile slice with its name, initial state, and reducers
const profileSlice = createSlice({
    name: "profile", // Slice name
    initialState: initialState, // Initial state passed to the slice
    reducers: {
        // Reducer to set user data in the state
        setUser(state, value) {
            // `value.payload` contains the user data to be saved in the state
            state.user = value.payload;
        },
        setLoading(state, value){
            state.loading = value.payload
        }
    },
});

// Exporting the action creator for `setUser` so it can be dispatched elsewhere in the app
export const { setUser, setLoading } = profileSlice.actions;

// Exporting the reducer to be used in the Redux store
export default profileSlice.reducer;
