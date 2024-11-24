import React, { useState } from 'react';
import { createCategory } from "../../../../services/operations/categoryApi";
import { useDispatch } from 'react-redux';
import { addCategory, setLoading, setError, setSuccessMessage } from "../../../../slices/categorySlice";
import toast from 'react-hot-toast';

const CreateCategory = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility
  const dispatch = useDispatch();

  // Assuming you are storing the token in localStorage, adjust as per your app logic
  const token = localStorage.getItem("token");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Input validation
    if (!name.trim() || !description.trim()) {
      toast.error("Please fill in all fields.");
      return;
    }

    // Dispatch loading action to update Redux state
    dispatch(setLoading(true));

    // API call to create category
    try {
      const newCategory = await createCategory({ name, description }, token);

      // Add new category to Redux store if creation is successful
      if (newCategory) {
        dispatch(addCategory(newCategory));
        dispatch(setSuccessMessage("Category added successfully!"));
        setName(''); // Reset input fields
        setDescription('');
        setIsModalOpen(false); // Close the modal on success
      }
    } catch (error) {
      // Handle any errors that occur during API call
      dispatch(setError(error.message || "Failed to create category. Please try again."));
      toast.error("Failed to create category. Please try again.");
    } finally {
      // Set loading to false after API call
      dispatch(setLoading(false));
    }
  };

  return (
    <div className='text-white'>
      <p className='pb-2'>If you want to create a new category then you can create it.</p>
      {/* Button to trigger modal */}
      <button 
        onClick={() => setIsModalOpen(true)} 
        className="bg-yellow-50 text-black font-bold px-6 py-2 rounded-lg shadow-md hover:bg-yellow-100 transition duration-300"
      >
        Create New Category
      </button>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[1000] !mt-0 grid place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm">
          <div className="w-11/12 max-w-[350px] rounded-lg border border-richblack-400 bg-richblack-800 p-6">
            <h2 className="text-xl font-bold mb-4">Create New Category</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Category Name<sup className="text-pink-200">*</sup></label>
                <input 
                  type="text" 
                  value={name} 
                  onChange={(e) => setName(e.target.value)} 
                  required 
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-richblack-700 text-richblack-100"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Description<sup className="text-pink-200">*</sup></label>
                <textarea 
                  value={description} 
                  onChange={(e) => setDescription(e.target.value)} 
                  required 
                className="min-h-[130px] rounded-lg border w-full bg-richblack-700 text-richblack-100"

                />
              </div>
              <div className="flex justify-between">
                <button 
                  type="submit" 
                  className="bg-yellow-50 text-black font-bold px-6 py-2 rounded-lg shadow-md hover:bg-green-600 transition duration-300"
                >
                  Create Category
                </button>
                <button 
                  type="button" 
                  onClick={() => setIsModalOpen(false)} 
                  className="bg-richblack-25 text-black font-bold px-6 py-2 rounded-lg shadow-md hover:bg-gray-400 transition duration-300"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateCategory;
