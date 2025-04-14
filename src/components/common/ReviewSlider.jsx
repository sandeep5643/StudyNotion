import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination"
import { FreeMode, Autoplay, Pagination } from "swiper/modules";

import ReactStars from "react-rating-stars-component"
import { apiConnector } from '../../services/apiconnector'
import { ratingsEndpoints } from '../../services/apis'
import { FaStar } from 'react-icons/fa'


function ReviewSlider() {
    const [reviews, setReviews] = useState([])
    const truncateWords = 15
  
    useEffect(() => {
      ;(async () => {
        const { data } = await apiConnector(
          "GET",
          ratingsEndpoints.REVIEWS_DETAILS_API
        )
        if (data?.success) {
          setReviews(data?.data)
        }
      })()
    }, [])
  
  
    return (
      <div className="text-white">
        <div className="my-[50px] h-auto max-w-maxContentTab lg:max-w-maxContent px-2">
          <Swiper
            loop={true}
            freeMode={true}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            spaceBetween={20}
            breakpoints={{
              320: {
                slidesPerView: 1,
              },
              640: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
              1280: {
                slidesPerView: 4,
              },
            }}
            modules={[FreeMode, Pagination, Autoplay]}
            className="w-full"
          >
            {reviews.map((review, i) => (
              <SwiperSlide key={i}>
                <div className="flex flex-col gap-3 bg-richblack-800 p-4 rounded-md h-full text-[14px] text-richblack-25 shadow-md">
                  <div className="flex items-center gap-4">
                    <img
                      src={
                        review?.user?.image
                          ? review.user.image
                          : `https://api.dicebear.com/5.x/initials/svg?seed=${review?.user?.firstName} ${review?.user?.lastName}`
                      }
                      alt="user"
                      className="h-10 w-10 rounded-full object-cover"
                    />
                    <div className="flex flex-col">
                      <h1 className="font-semibold text-richblack-5">
                        {`${review?.user?.firstName} ${review?.user?.lastName}`}
                      </h1>
                      <h2 className="text-[12px] font-medium text-richblack-500">
                        {review?.course?.courseName}
                      </h2>
                    </div>
                  </div>
    
                  <p className="font-medium text-richblack-25 line-clamp-4">
                    {review?.review.split(" ").length > truncateWords
                      ? `${review?.review.split(" ").slice(0, truncateWords).join(" ")} ...`
                      : review?.review}
                  </p>
    
                  <div className="flex items-center gap-2 mt-auto">
                    <h3 className="font-semibold text-yellow-100">
                      {review.rating.toFixed(1)}
                    </h3>
                    <ReactStars
                      count={5}
                      value={review.rating}
                      size={20}
                      edit={false}
                      activeColor="#ffd700"
                      emptyIcon={<FaStar />}
                      fullIcon={<FaStar />}
                    />
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    )    
}

export default ReviewSlider
