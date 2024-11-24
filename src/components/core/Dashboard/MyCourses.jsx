import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { fetchInstructorCourses } from '../../../services/operations/courseDetailsApi';
import CoursesTable from './InstructorCourses/CoursesTable';
import IconBtn from '../../common/IconBtn';
import { VscAdd } from 'react-icons/vsc';



const MyCourses = () => {

    const {token} = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const [courses, setCourses] = useState([]);


    useEffect(() => {
        const fetchCourses = async() => {
            const result = await fetchInstructorCourses(token);
            console.log('fectch Instructor Coures:', result)
                if(result){
                    setCourses(result);
                }
        }
        fetchCourses();
    },[])



    return (
        <div>
            <div className="mb-14 flex items-center justify-between">
                <h1 className="text-3xl font-medium text-richblack-5">My Courses</h1>
                <IconBtn
                    text='Add Courses'
                    onClick={() => navigate("/dashboard/add-course")}
                    >
                    <VscAdd/>
                </IconBtn>
            </div>
            {
                courses && <CoursesTable courses={courses} setCourses={setCourses}/> 
            }
        </div>
    )
}

export default MyCourses
