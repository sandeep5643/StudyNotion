import React from 'react'
import Logo1 from "../../../assets/TimeLineLogo/Logo1.svg"
import Logo2 from "../../../assets/TimeLineLogo/Logo2.svg"
import Logo3 from "../../../assets/TimeLineLogo/Logo3.svg"
import Logo4 from "../../../assets/TimeLineLogo/Logo4.svg"
import timelineImage from "../../../assets/Images/TimelineImage.png"


const timeline = [
    {
        Logo: Logo1,
        heading: "Leadership",
        Description:"Fully committed to the success company",
    },
    {
        Logo: Logo2,
        heading: "Leadership",
        Description:"Fully committed to the success company",
    },
    {
        Logo: Logo3,
        heading: "Leadership",
        Description:"Fully committed to the success company",
    },
    {
        Logo: Logo4,
        heading: "Leadership",
        Description:"Fully committed to the success company",
    },
];


const TimelineSection = () => {
    return (
        <div className="px-4 py-10">
          <div className="flex flex-col lg:flex-row gap-10 items-center justify-between">
            {/* Left Timeline Details */}
            <div className="w-full lg:w-[45%] flex flex-col gap-6">
              {timeline.map((element, index) => {
                return (
                  <div className="flex flex-row gap-6 items-start" key={index}>
                    <div className="w-[50px] h-[50px] bg-white flex items-center justify-center rounded-full shadow-md">
                      <img src={element.Logo} className="w-[60%] h-[60%]" />
                    </div>
      
                    <div>
                      <h2 className="font-semibold text-[18px] text-richblack-5">
                        {element.heading}
                      </h2>
                      <p className="text-base text-richblack-300">{element.Description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
      
            {/* Right Image & Stats Box */}
            <div className="relative w-full lg:w-[50%]">
              <img
                src={timelineImage}
                alt="timeline"
                className="shadow-white object-cover w-full h-auto max-h-[500px] rounded-md"
              />
              <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-caribbeangreen-700 text-white uppercase flex flex-col md:flex-row py-6 rounded-md shadow-lg">
                <div className="flex gap-4 items-center border-b md:border-b-0 md:border-r border-caribbeangreen-300 px-6 py-2">
                  <p className="text-3xl font-bold">10</p>
                  <p className="text-caribbeangreen-300 text-sm">Years of Experience</p>
                </div>
                <div className="flex gap-4 items-center px-6 py-2">
                  <p className="text-3xl font-bold">250</p>
                  <p className="text-caribbeangreen-300 text-sm">Type of Courses</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
      
}

export default TimelineSection
