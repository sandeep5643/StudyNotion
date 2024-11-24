import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  categories: [],
  loading: false,
  error: null,
  successMessage: null,
};

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setCategories: (state, action) => {
      state.categories = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setSuccessMessage: (state, action) => {
      state.successMessage = action.payload;
    },
    addCategory: (state, action) => {
      state.categories.push(action.payload);
    },
    resetCategoryState: (state) => {
      state.categories = [];
      state.loading = false;
      state.error = null;
      state.successMessage = null;
    },
  },
});

export const {
  setLoading,
  setCategories,
  setError,
  setSuccessMessage,
  addCategory,
  resetCategoryState,
} = categorySlice.actions;

export default categorySlice.reducer;
