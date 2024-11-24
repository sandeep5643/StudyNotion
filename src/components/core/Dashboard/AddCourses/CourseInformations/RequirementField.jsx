import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const RequirementField = ({ name, label, register, errors, setValue, getValues }) => {

  const { editCourse, course } = useSelector((state) => state.course)
  const [requirement, setRequirement] = useState("");
  const [requirementList, setRequirementList] = useState([]);

  // Register the field with react-hook-form and provide validation rules
  useEffect(() => {
    register(name, {
      required: true,
      validate: (value) => Array.isArray(value) && value.length > 0 // Ensure the list has at least one item
    });
  }, [register, name]);

  // Update the field value with the requirement list whenever it changes
  useEffect(() => {
    setValue(name, requirementList);
  }, [requirementList, name, setValue]);

  // Add requirement to the list
  const handleAddRequirement = () => {
    if (requirement.trim() !== "") { // Avoid adding empty strings
      setRequirementList([...requirementList, requirement.trim()]);
      setRequirement(""); // Clear the input after adding
    }
  };

  // Remove a requirement from the list
  const handleRemoveRequirement = (index) => {
    const updatedRequirementList = [...requirementList];
    updatedRequirementList.splice(index, 1); // Remove the item at the specified index
    setRequirementList(updatedRequirementList);
  };

  return (
    <div className="flex flex-col space-y-2">
      <label className="text-sm text-richblack-5" htmlFor={name}>
        {label} <sup className="text-pink-200">*</sup>
      </label>
      <div className="flex flex-col items-start space-y-2">
        <input
          type="text"
          id={name}
          value={requirement}
          onChange={(e) => setRequirement(e.target.value)}
          className="form-style w-full bg-richblack-700 text-richblack-100"
        />
        <button
          type="button"
          onClick={handleAddRequirement}
          className="font-semibold text-yellow-50"
        >
          Add
        </button>
      </div>
      {requirementList.length > 0 && (
        <ul className="mt-2 list-inside list-disc">
          {requirementList.map((requirement, index) => (
            <li key={index} className="flex items-center text-richblack-5">
              <span>{requirement}</span>
              <button
                type="button"
                className="ml-2 text-xs text-pure-greys-300 "
                onClick={() => handleRemoveRequirement(index)}
              >
                clear
              </button>
            </li>
          ))}
        </ul>
      )}
      {errors[name] && (
        <span className="ml-2 text-xs tracking-wide text-pink-200">
          {label} is required
        </span>
      )}
    </div>
  )
};

export default RequirementField;
