import { useEffect, useState } from "react";
import { BsChevronDown } from "react-icons/bs";
import { IoIosArrowBack } from "react-icons/io";
import { FiMenu } from "react-icons/fi";
import { RxCross2 } from "react-icons/rx";
import { useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import IconBtn from "../../common/IconBtn";

export default function VideoDetailsSidebar({ setReviewModal }) {
  const [activeStatus, setActiveStatus] = useState("");
  const [videoBarActive, setVideoBarActive] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const { sectionId, subSectionId } = useParams();

  const {
    courseSectionData,
    courseEntireData,
    totalNoOfLectures,
    completedLectures,
  } = useSelector((state) => state.viewCourse);

  useEffect(() => {
    (() => {
      if (!courseSectionData.length) return;
      const currentSectionIndx = courseSectionData.findIndex(
        (data) => data._id === sectionId
      );
      const currentSubSectionIndx =
        courseSectionData?.[currentSectionIndx]?.subSection.findIndex(
          (data) => data._id === subSectionId
        );
      const activeSubSectionId =
        courseSectionData[currentSectionIndx]?.subSection?.[currentSubSectionIndx]?._id;
      setActiveStatus(courseSectionData?.[currentSectionIndx]?._id);
      setVideoBarActive(activeSubSectionId);
    })();
  }, [courseSectionData, courseEntireData, location.pathname]);

  // Only render the sidebar if we are on the "view-course" page
  const isViewCoursePage = location.pathname.includes("/view-course");

  if (!isViewCoursePage) {
    return null; // Don't render the sidebar on other pages
  }

  return (
    <>
      {/* Hamburger menu for small screens */}
      <div className="md:hidden fixed top-4 left-4 z-auto mt-16">
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="mb-3 items-center gap-1 flex rounded bg-yellow-100 px-4 py-2 text-sm font-semibold text-white"
        >
          <FiMenu size={28} className="text-richblack-5" />
          Course Menu
        </button>
      </div>
  
      {/* Sidebar */}
      <div
        className={`z-40 h-full max-w-[300px] overflow-y-auto border-r border-richblack-700 bg-richblack-800 transition-transform duration-300
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
          fixed md:static top-0 left-0 w-[80%] md:w-[350px] md:translate-x-0`}
      >
        {/* Close button for small screen */}
        <div className="md:hidden flex justify-end p-4">
          <button onClick={() => setIsSidebarOpen(false)}>
            <RxCross2 size={24} className="text-richblack-100" />
          </button>
        </div>
  
        {/* Header */}
        <div className="mx-5 flex flex-col items-start justify-between gap-2 gap-y-4 border-b border-richblack-600 py-5 text-lg font-bold text-richblack-25">
          <div className="flex w-full items-center justify-between">
            <div
              onClick={() => navigate(`/dashboard/enrolled-courses`)}
              className="flex h-[35px] w-[35px] items-center justify-center rounded-full bg-richblack-100 p-1 text-richblack-700 hover:scale-90"
              title="back"
            >
              <IoIosArrowBack size={30} />
            </div>
            <IconBtn
              text="Add Review"
              customClasses="ml-auto"
              onclick={() => setReviewModal(true)}
            />
          </div>
          <div className="flex flex-col">
            <p>{courseEntireData?.courseName}</p>
            <p className="text-sm font-semibold text-richblack-500">
              {completedLectures?.length} / {totalNoOfLectures}
            </p>
          </div>
        </div>
  
        {/* Course Sections */}
        <div className="h-full overflow-y-auto">
          {courseSectionData.map((course, index) => (
            <div
              className="mt-2 cursor-pointer text-sm text-richblack-5"
              onClick={() => setActiveStatus(course?._id)}
              key={index}
            >
              {/* Section */}
              <div className="flex flex-row justify-between bg-richblack-600 px-5 py-4">
                <div className="w-[70%] font-semibold">{course?.sectionName}</div>
                <div className="flex items-center gap-3">
                  <span
                    className={`${
                      activeStatus === course?.sectionName ? "rotate-0" : "rotate-180"
                    } transition-all duration-500`}
                  >
                    <BsChevronDown />
                  </span>
                </div>
              </div>
  
              {/* Subsections */}
              {activeStatus === course?._id && (
                <div className="transition-[height] duration-500 ease-in-out">
                  {course.subSection.map((topic, i) => (
                    <div
                      className={`flex gap-3 px-5 py-2 ${
                        videoBarActive === topic._id
                          ? "bg-yellow-200 font-semibold text-richblack-800"
                          : "hover:bg-richblack-900"
                      }`}
                      key={i}
                      onClick={() => {
                        navigate(
                          `/view-course/${courseEntireData?._id}/section/${course?._id}/sub-section/${topic?._id}`
                        );
                        setVideoBarActive(topic._id);
                        setIsSidebarOpen(false); // auto close on mobile
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={completedLectures.includes(topic?._id)}
                        onChange={() => {}}
                      />
                      {topic.title}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
  
}
