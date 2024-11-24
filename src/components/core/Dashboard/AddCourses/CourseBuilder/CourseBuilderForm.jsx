import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import IconBtn from '../../../../common/IconBtn';
import { IoAddCircleOutline } from 'react-icons/io5';
import { MdNavigateNext } from 'react-icons/md';
import { createSection, updateSection } from '../../../../../services/operations/courseDetailsApi';
import { setCourse, setEditCourse, setStep } from '../../../../../slices/courseSlice';
import toast from 'react-hot-toast';
import NestedView from './NestedView';

const CourseBuilderForm = () => {
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const dispatch = useDispatch();
    const { course } = useSelector((state) => state.course);
    const { token } = useSelector((state) => state.auth);

    const [loading, setLoading] = useState(false);
    const [editSectionName, setEditSectionName] = useState(null);

    // Monitoring course.courseContent updates
    useEffect(() => {
        if (course.courseContent?.length) {
            console.log("Updated course.courseContent:", course.courseContent);
        } else {
            console.log("course.courseContent is empty or undefined.");
        }
    }, [course.courseContent]);

    const onSubmit = async (data) => {
        setLoading(true);
        let result;
        
        // Editing or creating section
        if (editSectionName) {
            result = await updateSection(
                { sectionName: data.sectionName, sectionId: editSectionName, courseId: course._id },
                token
            );
        } else {
            result = await createSection(
                { sectionName: data.sectionName, courseId: course._id },
                token
            );
        }

        if (result) {
            console.log("API Result:", result); // Log to verify structure
            // Update course with new section and reset form state
            dispatch(setCourse({ ...course, courseContent: result.courseContent || [] }));
            setEditSectionName(null);
            setValue("sectionName", "");
        }
        setLoading(false);
    };

    const cancelEdit = () => {
        setEditSectionName(null);
        setValue("sectionName", "");
    };

    const handleChangeEditSectionName = (sectionId, sectionName) => {
        if (editSectionName === sectionId) {
            cancelEdit();
            return;
        }
        setEditSectionName(sectionId);
        setValue("sectionName", sectionName);
    };

    const goToNext = () => {
        if (!course.courseContent.length) {
            toast.error("Please add at least one section.");
            return;
        }
        if (course.courseContent.some((section) => section.subSection.length === 0)) {
            toast.error("Please add at least one lecture in each section.");
            return;
        }
        dispatch(setStep(3));
    };

    const goBack = () => {
        dispatch(setStep(1));
        dispatch(setEditCourse(true));
    };

    return (
        <div className="space-y-8 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6">
            <p className="text-2xl font-semibold text-richblack-5">Course Builder</p>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="flex flex-col space-y-2">
                    <label className="text-sm text-richblack-5" htmlFor="sectionName">
                        Section Name <sup className="text-pink-200">*</sup>
                    </label>
                    <input
                        id="sectionName"
                        disabled={loading}
                        placeholder="Add a section to build your course"
                        {...register("sectionName", { required: true })}
                        className="form-style w-full bg-richblack-700 text-richblack-200"
                    />
                    {errors.sectionName && (
                        <span className="ml-2 text-xs tracking-wide text-pink-200">
                            Section name is required
                        </span>
                    )}
                </div>

                <div className="flex items-end gap-x-4">
                    <IconBtn 
                        type='submit' 
                        disabled={loading} 
                        text={editSectionName ? "Edit Section Name" : "Create Section"} 
                        outline={true}
                    >
                        <IoAddCircleOutline size={20} className="text-yellow-50"/>
                    </IconBtn>
                    {editSectionName && (
                        <button type='button' onClick={cancelEdit} className='text-sm text-richblack-300 underline'>
                            Cancel Edit
                        </button>
                    )}
                </div>
            </form>

            {course && course.courseContent && course.courseContent.length > 0 ? (
                <NestedView handleChangeEditSection={handleChangeEditSectionName} />
            ) : (<div></div>)}

            <div className="flex justify-end gap-x-3">
                <button 
                    onClick={goBack}
                    className="flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900"
                >
                    Back
                </button>
                <IconBtn disabled={loading} text="Next" onClick={goToNext}>
                    <MdNavigateNext/>
                </IconBtn>
            </div>
        </div>
    );
};

export default CourseBuilderForm;
