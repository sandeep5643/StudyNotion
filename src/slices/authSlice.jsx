import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    signupData: null,
    loading: false,
    token: (() => {
        const token = localStorage.getItem("token");
        console.log("Raw token from localStorage:", token);  // Log token here
        try {
            return token ? JSON.parse(token) : null;
        } catch (error) {
            console.error("Error parsing token from localStorage:", error);
            return null;
        }
    })(),
};

const authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {
        setSignupData(state, value) {
            state.signupData = value.payload;
        },
        setLoading(state, value) {
            state.loading = value.payload;
        },
        setToken(state, value) {
            state.token = value.payload;
        }
    }
})

export const { setSignupData, setLoading, setToken } = authSlice.actions;
export default authSlice.reducer;
