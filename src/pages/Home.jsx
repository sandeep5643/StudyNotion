// This is the Home page component for the website.
// It includes various sections such as the banner, highlighted text, buttons, video, and course information.

import React from 'react'
import { Link } from 'react-router-dom' // For navigation
import { FaArrowRight } from "react-icons/fa6" // Icon for the arrow button
import Banner from "../assets/Images/banner.mp4" // Video asset for the banner
import HighlightText from '../components/core/HomePage/HighlightText' // Component for highlighted text
import CTAButton from '../components/core/HomePage/CTAButton' // Button component for calls to action
import CodeBlocks from '../components/core/HomePage/CodeBlocks' // Component showing example code snippets
import ExploreMore from '../components/core/HomePage/ExploreMore' // Section to explore more content
import TimelineSection from '../components/core/HomePage/TimelineSection' // Component for timeline view
import LearningLanguageSection from '../components/core/HomePage/LearningLanguageSection' // Section displaying available learning languages
import InstructorSection from '../components/core/HomePage/InstructorSection' // Section about instructors
import ReviewSlider from '../components/common/ReviewSlider'
import Footer from '../components/common/Footer'


const Home = () => {
  return (
    <div>

      {/* Section 1: Top of the Home page */}
      <div className="relative mx-auto flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8 text-white">
        
        {/* Link to become an instructor */}
        <Link to={'/signup'}>
          <div className="group mx-auto mt-16 w-fit rounded-full bg-richblack-800 p-1 font-bold text-richblack-200 drop-shadow-[0_1.5px_rgba(255,255,255,0.25)] transition-all duration-200 hover:scale-95 hover:drop-shadow-none">
            <div className="flex flex-row items-center gap-2 rounded-full px-10 py-[5px] transition-all duration-200 group-hover:bg-richblack-900">
              <p>Become an Instructor</p>
              <FaArrowRight /> {/* Arrow icon */}
            </div>
          </div>
        </Link>

        {/* Highlighted text and description */}
        <div className="text-center text-4xl font-semibold">
          Empower Your Future with
          <HighlightText text={"Coding Skills"} /> {/* Highlighting text */}
        </div>

        <div className="-mt-3 w-[90%] text-center text-lg font-bold text-richblack-300">
          With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors. 
        </div>

        {/* CTA buttons for signup and demo */}
        <div className="mt-8 flex flex-row gap-7">
          <CTAButton active={true} linkto={"/signup"}> 
            Learn More
          </CTAButton>
          <CTAButton active={false} linkto={"/login"}> 
            Book a Demo
          </CTAButton>
        </div>

        {/* Banner video */}
        <div className="mx-3 my-7 shadow-[10px_-5px_50px_-5px] shadow-blue-200">
          <video muted loop autoPlay className="shadow-[20px_20px_rgba(255,255,255)]">
            <source src={Banner} type="video/mp4" /> {/* Video source */}
          </video>
        </div>

        {/* Code block section 1 */}
        <div>
          <CodeBlocks
            position={"lg:flex-row"}
            heading={
                <div className="text-4xl font-semibold">
                    Unlock Your
                    <HighlightText text={"coding potential "}/>
                    with our online courses
                </div>
            }
            subheading = {
                "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
            }
            ctabtn1={{
              btnText: "Try it Yourself",
              linkto: "/signup",
              active: true,
            }}
            ctabtn2={{
              btnText: "Learn More",
              linkto: "/login",
              active: false,
            }}
            codeblock={`<!DOCTYPE html>\n <html lang="en">\n<head>\n<title>This is myPage</title>\n</head>\n<body>\n<h1><a href="/">Header</a></h1>\n<nav> <a href="/one">One</a> <a href="/two">Two</a> <a href="/three">Three</a>\n</nav>\n</body>`}
            codeColor={"text-yellow-25"}
            backgroundGradient={<div className="codeblock1 absolute"></div>}
          />
        </div>

        {/* Code block section 2 (reversed layout) */}
        <div>
          <CodeBlocks
            position={"lg:flex-row-reverse"}
            heading={
              <div className="w-[100%] text-4xl font-semibold lg:w-[50%]">
                Start
                <HighlightText text={"coding in seconds"}/>
              </div>
            }
            subheading = {
             "Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."
            }
            ctabtn1={{
              btnText: "Continue Lesson",
              linkto: "/signup",
              active: true,
            }}
            ctabtn2={{
              btnText: "Learn More",
              linkto: "/login",
              active: false,
            }}
            codeblock={`import React from "react";\n import CTAButton from "./Button";\nimport TypeAnimation from "react-type";\nimport { FaArrowRight } from "react-icons/fa";\n\nconst Home = () => {\nreturn (\n<div>Home</div>\n)\n}\nexport default Home;`}
            codeColor={"text-yellow-25"}
            backgroundGradient={<div className="codeblock2 absolute"></div>}
          />
        </div>
        {/* Explore more section */}
        <ExploreMore/>
      </div>

      {/* Section 2: More features and catalog */}
      <div className="bg-pure-greys-5 text-richblack-700">

        {/* Background section with CTA */}
        <div  className="homepage_bg h-[320px]">
          <div className="mx-auto flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8">
            <div className="lg:h-[150px]"></div>
            <div className="flex flex-row gap-7 text-white lg:mt-8">
              <CTAButton active={true} linkto={"/signup"}>
                <div className="flex items-center gap-2">
                  Explore Full Catalog
                  <FaArrowRight/>
                </div>
              </CTAButton>

              <CTAButton active={false} linkto={"/login"}>
                Learn More
              </CTAButton>
            </div>
          </div>
        </div>

        {/* Section with timeline and languages */}
        <div className="mx-auto flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8 ">
          <div className="mb-10 mt-[-100px] flex flex-col justify-between gap-7 lg:mt-20 lg:flex-row lg:gap-0">
            <div className="text-4xl font-semibold lg:w-[45%] ">
              Get the skills you need for a{" "}
              <HighlightText text={"job that is in demand."} />
            </div>

            <div className="flex flex-col items-start gap-10 lg:w-[40%]">
              <div className="text-[16px]">
                The modern StudyNotion is the dictates its own terms. Today, to be a competitive specialist requires more than professional skills.
              </div>
                <CTAButton active={true} linkto={"/signup"}>
                  <div>
                      Learn more
                  </div>
                </CTAButton>
            </div>
          </div>

          <TimelineSection /> {/* Timeline of progress */}
          <LearningLanguageSection /> {/* Available learning languages */}
        </div>
      </div>

      {/* Section 3: Instructors and reviews */}
      <div className="relative mx-auto my-10 flex w-11/12 max-w-maxContent flex-col items-center justify-center gap-8 bg-richblack-900 text-white px-4 sm:px-6 md:px-8 lg:px-12">
        <InstructorSection /> {/* Instructor section */}

        <h1 className="text-center text-3xl md:text-4xl font-semibold mt-4 sm:mt-6 lg:mt-8">Reviews from other learners</h1>

        {/* Review Slider here */}
        <div className="w-full overflow-hidden"> {/* Ensure Swiper can scroll properly */}
            <ReviewSlider />
        </div>
      </div>




      {/* Footer section */}
      <Footer/>

    </div>
  )
}

export default Home
