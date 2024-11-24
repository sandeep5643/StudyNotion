// Importing configureStore from Redux Toolkit
import { configureStore } from "@reduxjs/toolkit";

// Importing the rootReducer which combines all your slices
import rootReducer from "../reducer/reducer";

// Creating the Redux store
const store = configureStore({
  reducer: rootReducer,  // Combining all reducers in the store
});

// Exporting the store to be used in the app
export default store;
