import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react'; // Correctly import Swiper and SwiperSlide
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import {FreeMode, Pagination, Autoplay} from 'swiper/modules';
import CourseCard from './CourseCard';

const CourseSlider = ({ Courses }) => {
  return (
    <>
      {
        Courses?.length ? (
            <Swiper
              slidesPerView={1}
              spaceBetween={25}
              loop={true}
              freeMode={true}
              autoplay={{
                delay: 2500,
                disableOnInteraction: false
              }}
              modules={[FreeMode, Pagination, Autoplay]}
              breakpoints={{
                640: {
                  slidesPerView: 2,
                },
                768: {
                  slidesPerView : 3,
                },
                1024: {
                  slidesPerView: 3,
                }
              }}
              className="max-h-[30rem] w-full"
          >
            {
              Courses?.map((course, index) => (
                <SwiperSlide key={index}>
                  <CourseCard course={course} Height={"h-[250px]"} />
                </SwiperSlide>
              ))
            }
          </Swiper>          
        ) : (
          <p className="text-xl text-richblack-5">No Course Found</p>
        )
      }
    </>
  );
}

export default CourseSlider;
