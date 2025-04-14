import React, { useState } from "react";
import { HomePageExplore } from "../../../data/homepage-explore";
import CourseCard from "./CourseCard";
import HighlightText from "./HighlightText";

const tabsName = [
  "Free",
  "New to coding",
  "Most popular",
  "Skills paths",
  "Career paths",
];

const ExploreMore = () => {
  const [currentTab, setCurrentTab] = useState(tabsName[0]);
  const [courses, setCourses] = useState(HomePageExplore[0].courses);
  const [currentCard, setCurrentCard] = useState(
    HomePageExplore[0].courses[0].heading
  );

  const setMyCards = (value) => {
    setCurrentTab(value);
    const result = HomePageExplore.filter((course) => course.tag === value);
    setCourses(result[0].courses);
    setCurrentCard(result[0].courses[0].heading);
  };

  return (
    <div className="w-full flex flex-col items-center justify-center">
      {/* Explore more section */}
      <div className="text-4xl font-semibold text-center my-10">
        Unlock the <HighlightText text={"Power of Code"} />
        <p className="text-center text-richblack-300 text-lg font-semibold mt-1">
          Learn to Build Anything You Can Imagine
        </p>
      </div>

      {/* ✅ Tabs Section */}
      <div className="flex flex-wrap justify-center gap-3 mt-5 bg-richblack-800 text-richblack-200 p-2 rounded-xl font-medium drop-shadow-[0_1.5px_rgba(255,255,255,0.25)]">
        {tabsName.map((ele, index) => {
          return (
            <div
              className={`text-sm sm:text-base flex flex-row items-center gap-2 ${
                currentTab === ele
                  ? "bg-richblack-900 text-richblack-5 font-medium"
                  : "text-richblack-200"
              } px-5 py-2 rounded-full transition-all duration-200 cursor-pointer hover:bg-richblack-900 hover:text-richblack-5`}
              key={index}
              onClick={() => setMyCards(ele)}
            >
              {ele}
            </div>
          );
        })}
      </div>

      {/* Responsive Spacing */}
      <div className="h-[50px] sm:h-[80px] md:h-[100px] lg:h-[200px]"></div>

      {/* Cards Group */}
      <div className="flex flex-wrap justify-center lg:justify-between gap-10 lg:gap-0 w-full lg:absolute lg:bottom-[0] lg:left-[50%] lg:translate-x-[-50%] lg:translate-y-[50%] text-black mb-7 px-3 lg:px-0">
        {courses.map((ele, index) => {
          return (
            <CourseCard
              key={index}
              cardData={ele}
              currentCard={currentCard}
              setCurrentCard={setCurrentCard}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ExploreMore;
