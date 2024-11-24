import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux';
import { HiOutlineCurrencyRupee } from "react-icons/hi";
import RequirementField from './RequirementField';
import { setStep, setCourse } from '../../../../../slices/courseSlice';
import IconBtn from '../../../../common/IconBtn'
import {fetchCourseCategories, addCourseDetails, editCourseDetails} from '../../../../../services/operations/courseDetailsApi'
import {COURSE_STATUS} from '../../../../../utlis/constants'
import toast from 'react-hot-toast';
import TagInput from './TagInput';
import Upload from '../Upload';
import { MdNavigateNext } from "react-icons/md"
import CreateCategory from "../CreateCategory"


const CourseInformationForm = () => {

  const {register, handleSubmit, setValue, getValues, formState:{errors}} = useForm();

  const {course, editCourse} = useSelector((state) => state.course);
  const [courseCategories, setCourseCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const {token} = useSelector((state) => state.auth)


  useEffect(() => {
    const getCategories = async () => {
      setLoading(true);
      try {
        const categories = await fetchCourseCategories();
        
        // Safely check if categories is an array
        if (Array.isArray(categories) && categories.length > 0) {
          setCourseCategories(categories);
        } else {
          console.error("No categories returned or categories is not an array.");
        }
      } catch (error) {
        console.error("Error fetching categories: ", error);
      }
      setLoading(false);
    };

    if(editCourse){
      setValue("courseTitle", course.courseName);
      setValue("courseShortDesc", course.courseDescription);
      setValue("coursePrice", course.price);
      setValue("courseCategory", course.category);
      setValue("courseTags", course.tag);
      setValue("courseImage", course.thumbnail);
      setValue("courseBenefits", course.whatWillYouLearn);
      setValue("courseRequirements", course.instructions);
    }
  
    getCategories();
  }, []);

  const isFormUpdated = () => {
    const currentValues = getValues();
    if(currentValues.courseTitle !== course.courseName ||
        currentValues.courseShortDesc !== course.courseDescription ||
        currentValues.coursePrice !== course.price ||
        currentValues.courseTags.toString() !== course.tag.toString() ||
        currentValues.courseBenefits !== course.whatWillYouLearn ||
        currentValues.courseCategory._id !== course.category._id ||
        currentValues.courseImage !== course.thumbnail ||
        currentValues.courseRequirements.toString() !== course.instructions.toString() )
        return true;
    else
    return false;
  }

  
  //handles next button click 
  const onSubmit = async(data) => {

    if(editCourse) {
        if(isFormUpdated()) {
            const currentValues = getValues();
            const formData = new FormData();

        formData.append("courseId", course._id);
        if(currentValues.courseTitle !== course.courseName) {
            formData.append("courseName", data.courseTitle);
        }

        if(currentValues.courseShortDesc !== course.courseDescription) {
            formData.append("courseDescription", data.courseShortDesc);
        }

        if(currentValues.coursePrice !== course.price) {
            formData.append("price", data.coursePrice);
        }

        if (currentValues.courseTags.toString() !== course.tag.toString()) {
          formData.append("tag", JSON.stringify(data.courseTags))
        }

        if(currentValues.courseBenefits !== course.whatWillYouLearn) {
            formData.append("whatWillYouLearn", data.courseBenefits);
        }

        if(currentValues.courseCategory._id !== course.category._id) {
            formData.append("category", data.courseCategory);
        }

        if(currentValues.courseRequirements.toString() !== course.instructions.toString()) {
            formData.append("instructions", JSON.stringify(data.courseRequirements));
        }
        if (currentValues.courseImage !== course.thumbnail) {
          formData.append("thumbnailImage", data.courseImage)
        }

        setLoading(true);
        const result = await editCourseDetails(formData, token);
        setLoading(false);
        if(result) {
            dispatch(setStep(2))
            dispatch(setCourse(result));
        }
        } 
        else {
            toast.error("NO Changes made so far");
        }
        console.log("PRINTING FORMDATA", formData);
        console.log("PRINTING result", result);

        return;
    }

    //create a new course
    const formData = new FormData();
    formData.append("courseName", data.courseTitle);
    formData.append("courseDescription", data.courseShortDesc);
    formData.append("price", data.coursePrice);
    formData.append("tag", JSON.stringify(data.courseTags))
    formData.append("whatWillYouLearn", data.courseBenefits);
    formData.append("category", data.courseCategory);
    formData.append("status", COURSE_STATUS.DRAFT);
    formData.append("instructions", JSON.stringify(data.courseRequirements));
    formData.append("thumbnailImage", data.courseImage)

    setLoading(true);
    console.log("BEFORE add course API call");
    console.log("PRINTING FORMDATA", formData);
    const result = await addCourseDetails(formData,token);
    if(result) {
        dispatch(setStep(2))
        dispatch(setCourse(result));
    }
    setLoading(false);
    console.log("PRINTING FORMDATA", formData);
    console.log("PRINTING result", result);

  }



  return (
    <div>
      <div className='pb-10'>
        <CreateCategory/>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6">

{/* Course Title */}
<div className="flex flex-col space-y-2">
  <label className="text-sm text-richblack-5" htmlFor="courseTitle">Course Title<sup className="text-pink-200">*</sup></label>
  <input
    id='courseTitle'
    placeholder='Enter Course Title'
    {...register("courseTitle", {required:true})}
    className='form-style w-full bg-richblack-700 text-richblack-100'
  />
  {
    errors.courseTitle && (
      <span className="ml-2 text-xs tracking-wide text-pink-200">Course Title is Required**</span>
    )
  }
</div>

<div className="flex flex-col space-y-2">
  <label className="text-sm text-richblack-5" htmlFor="courseShortDesc">Course Short Description<sup className="text-pink-200">*</sup></label>
  <textarea
    id='courseShortDesc'
    placeholder='Enter Course Description'
    {...register("courseShortDesc", {required:true})}
    className="form-style resize-x-none min-h-[130px] w-full bg-richblack-700 text-richblack-100"
  />
  {
    errors.courseShortDesc && (
      <span className="ml-2 text-xs tracking-wide text-pink-200">Course Description is Required**</span>
    )
  }
</div>

<div className="flex flex-col space-y-2">
  <label className="text-sm text-richblack-5" htmlFor="coursePrice">Course Price<sup className="text-pink-200">*</sup></label>
  <input
    id='coursePrice'
    placeholder='Enter Course Price'
    {...register("coursePrice", {required:true, pattern: {
      value: /^(0|[1-9]\d*)(\.\d+)?$/,
    },})}
    className="form-style w-full !pl-10 bg-richblack-700 text-richblack-100"
  />
  <HiOutlineCurrencyRupee className="left-30 -top-8 relative inline-block -translate-y-1/2 text-2xl text-richblack-400"/>
  {
    errors.coursePrice && (
      <span className="ml-2 text-xs tracking-wide text-pink-200">Course Price is Required**</span>
    )
  }
</div>      

<div className="flex flex-col space-y-2">
  <label className="text-sm text-richblack-5" htmlFor="courseCategory">Course Category<sup className="text-pink-200">*</sup></label>
  <select
    id='courseCategory'
    defaultValue=""
    {...register("courseCategory", {required:true})}
    className="form-style w-full bg-richblack-700 text-richblack-100"
  >
    <option value="" disabled>Choose a Category</option>
    {
      !loading && courseCategories.map((category, index) => (
        <option value={category._id} key={index}>
          {category.name}
        </option>
      ))
    }
  </select>
  {
    errors.courseCategory && (
      <span className="ml-2 text-xs tracking-wide text-pink-200">Course Category is Required**</span>
    )
  }
</div>


  {/* TagInput component */}
<TagInput  
    label="Tags"
    name="courseTags"
    placeholder="Enter Tags and press Enter"
    register={register}
    errors={errors}
    setValue={setValue}
    getValues={getValues}
/> 

{/* Course Thumbnail Image */}
<Upload
  name="courseImage"
  label="Course Thumbnail"
  register={register}
  setValue={setValue}
  errors={errors}
  editData={editCourse ? course?.thumbnail : null}
/>

<div className="flex flex-col space-y-2">
  <label className="text-sm text-richblack-5" htmlFor="courseBenefits">Benefits of the course<sup className="text-pink-200">*</sup></label>
  <textarea
    id='courseBenefits'
    placeholder='Enter Benefits of the course'
    {...register("courseBenefits", {required:true})}
    className="form-style resize-x-none min-h-[130px] w-full bg-richblack-700 text-richblack-100"
  />
  {
    errors.courseBenefits && (
      <span className="ml-2 text-xs tracking-wide text-pink-200">Benefits of the course are required**</span>
    )
  }
</div>

<RequirementField 
  name="courseRequirements"
  label="Requirements/Instructions"
  register={register}
  errors={errors}
  setValue={setValue}
  getValues={getValues}
/>

<div className="flex justify-end gap-x-2">
  {
    editCourse && (
      <button onClick={() => dispatch(setStep(2))} disabled={loading} className={`flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900`}>
        Continue Without Saving
      </button>
    )
  }
  <IconBtn disabled={loading} text={!editCourse ? "Next" : "Save Changes"}>    <MdNavigateNext/> </IconBtn>
</div>

</form>
    </div>
  )
}

export default CourseInformationForm
