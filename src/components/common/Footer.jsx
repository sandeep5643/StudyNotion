import React from "react";
import { FooterLink2 } from "../../data/footer-links";
import { Link } from "react-router-dom";

// Images
import Logo from "../../assets/Logo/Logo-Full-Light.png";

// Icons
import { FaFacebook, FaGoogle, FaTwitter, FaYoutube } from "react-icons/fa";

const BottomFooter = ["Privacy Policy", "Cookie Policy", "Terms"];
const Resources = [
  "Articles",
  "Blog",
  "Chart Sheet",
  "Code challenges",
  "Docs",
  "Projects",
  "Videos",
  "Workspaces",
];
const Plans = ["Paid memberships", "For students", "Business solutions"];
const Community = ["Forums", "Chapters", "Events"];

const Footer = () => {
  return (
    <div className="bg-richblack-800">
      <div className="flex flex-col lg:flex-row gap-10 lg:gap-8 items-start justify-between w-11/12 max-w-maxContent text-richblack-400 leading-6 mx-auto relative py-14">
        <div className="border-b w-full flex flex-col lg:flex-row pb-5 border-richblack-700 gap-10">
          {/* Section 1 */}
          <div className="lg:w-[50%] flex flex-wrap flex-col lg:flex-row justify-between gap-7">
            <div className="w-full lg:w-[30%] flex flex-col gap-3">
              <img src={Logo} alt="Logo" className="object-contain w-[120px]" />
              <h1 className="text-richblack-50 font-semibold text-[16px]">
                Company
              </h1>
              <div className="flex flex-col gap-2">
                {["About", "Careers", "Affiliates"].map((ele, i) => (
                  <div
                    key={i}
                    className="text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200"
                  >
                    <Link to={ele.toLowerCase()}>{ele}</Link>
                  </div>
                ))}
              </div>
              <div className="flex gap-3 text-lg mt-4">
                <FaFacebook />
                <FaGoogle />
                <FaTwitter />
                <FaYoutube />
              </div>
            </div>
  
            <div className="w-full lg:w-[30%]">
              <h1 className="text-richblack-50 font-semibold text-[16px]">
                Resources
              </h1>
              <div className="flex flex-col gap-2 mt-2">
                {Resources.map((ele, index) => (
                  <div
                    key={index}
                    className="text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200"
                  >
                    <Link to={ele.split(" ").join("-").toLowerCase()}>{ele}</Link>
                  </div>
                ))}
              </div>
  
              <h1 className="text-richblack-50 font-semibold text-[16px] mt-7">
                Support
              </h1>
              <div className="text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200 mt-2">
                <Link to="/help-center">Help Center</Link>
              </div>
            </div>
  
            <div className="w-full lg:w-[30%]">
              <h1 className="text-richblack-50 font-semibold text-[16px]">
                Plans
              </h1>
              <div className="flex flex-col gap-2 mt-2">
                {Plans.map((ele, index) => (
                  <div
                    key={index}
                    className="text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200"
                  >
                    <Link to={ele.split(" ").join("-").toLowerCase()}>{ele}</Link>
                  </div>
                ))}
              </div>
  
              <h1 className="text-richblack-50 font-semibold text-[16px] mt-7">
                Community
              </h1>
              <div className="flex flex-col gap-2 mt-2">
                {Community.map((ele, index) => (
                  <div
                    key={index}
                    className="text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200"
                  >
                    <Link to={ele.split(" ").join("-").toLowerCase()}>{ele}</Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
  
          {/* Section 2 */}
          <div className="lg:w-[50%] flex flex-wrap flex-col lg:flex-row justify-between gap-7">
            {FooterLink2.map((ele, i) => (
              <div key={i} className="w-full lg:w-[30%]">
                <h1 className="text-richblack-50 font-semibold text-[16px]">
                  {ele.title}
                </h1>
                <div className="flex flex-col gap-2 mt-2">
                  {ele.links.map((link, index) => (
                    <div
                      key={index}
                      className="text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200"
                    >
                      <Link to={link.link}>{link.title}</Link>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
  
      {/* Bottom Section */}
      <div className="flex flex-col lg:flex-row items-center justify-between w-11/12 max-w-maxContent text-richblack-400 mx-auto pb-14 text-sm gap-4 text-center lg:text-left">
        <div className="flex flex-wrap justify-center lg:justify-start gap-4">
          {BottomFooter.map((ele, i) => (
            <div
              key={i}
              className={`${
                i < BottomFooter.length - 1
                  ? "border-r border-richblack-700 px-3"
                  : "px-3"
              } cursor-pointer hover:text-richblack-50 transition-all duration-200`}
            >
              <Link to={ele.split(" ").join("-").toLowerCase()}>{ele}</Link>
            </div>
          ))}
        </div>
  
        <div>Made with ❤️ Sandeep © 2023 Studynotion</div>
      </div>
    </div>
  );  
};

export default Footer;