import React from 'react'
import Instructor from "../../../assets/Images/Instructor.png"
import HighlightText from './HighlightText'
import CTAButton from "../HomePage/CTAButton"
import { FaArrowRight } from 'react-icons/fa'


const InstructorSection = () => {
    return (
        <div className="mt-16 px-4">
          <div className="flex flex-col-reverse md:flex-row gap-10 md:gap-20 items-center">
      
            {/* Text Section */}
            <div className="w-full md:w-[50%] flex flex-col gap-6 md:gap-10 text-center md:text-left items-center md:items-start">
              <div className="text-3xl md:text-4xl font-semibold w-full md:w-[80%]">
                Become an
                <HighlightText text={" Instructor"} />
              </div>
      
              <p className="font-medium text-[16px] text-richblack-300 w-full md:w-[80%]">
                Instructors from around the world teach millions of students on StudyNotion.
                We provide the tools and skills to teach what you love.
              </p>
      
              <div className="w-fit">
                <CTAButton active={true} linkto={"/signup"}>
                  <div className="flex flex-row gap-2 items-center">
                    Start Learning Today
                    <FaArrowRight />
                  </div>
                </CTAButton>
              </div>
            </div>
      
            {/* Image Section */}
            <div className="w-full md:w-[50%]">
              <img
                src={Instructor}
                alt="Instructor"
                className="shadow-white w-full h-auto"
              />
            </div>
      
          </div>
        </div>
      );
      
}

export default InstructorSection
