import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  step: 1,
  course: {
    courseContent: []
  },
  editCourse: false,
  paymentLoading: false,
};

const courseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {
    setStep: (state, action) => {
      state.step = action.payload;
    },
    setCourse: (state, action) => {
      console.log("setCourse Payload:", action.payload);  // Check what is being passed
      // Ensure courseContent is always an array to prevent rendering issues
      state.course = {
        ...state.course,
        ...action.payload,
        courseContent: action.payload.courseContent || [],
      };
    },
    setEditCourse: (state, action) => {
      state.editCourse = action.payload;
    },
    setPaymentLoading: (state, action) => {
      state.paymentLoading = action.payload;
    },
    resetCourseState: (state) => {
      // Properly reset to initial state to avoid unexpected undefined properties
      state.step = 1;
      state.course = { courseContent: [] };
      state.editCourse = false;
      state.paymentLoading = false;
    },
  },
});

export const {
  setStep,
  setCourse,
  setEditCourse,
  setPaymentLoading,
  resetCourseState,
} = courseSlice.actions;

export default courseSlice.reducer;
