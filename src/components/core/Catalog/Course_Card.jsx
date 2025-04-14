import React, { useEffect, useState } from 'react'
import RatingStars from '../../common/RatingStars'
import GetAvgRating from '../../../utlis/avgRating';
import { Link } from 'react-router-dom';

const Course_Card = ({course, Height}) => {


    const [avgReviewCount, setAvgReviewCount] = useState(0);

    useEffect(()=> {
        const count = GetAvgRating(course.ratingAndReviews);
        setAvgReviewCount(count);
    },[course])


    
    return (
        <Link to={`/courses/${course._id}`}>
          <div className="rounded-lg overflow-hidden shadow-md bg-richblack-800 hover:scale-[1.02] transition-all duration-200">
            {/* Thumbnail */}
            <div className="aspect-video w-full">
              <img
                src={course.thumbnail}
                alt="course thumbnail"
                className={`w-full h-full object-cover ${Height || "h-[180px]"}`}
              />
            </div>
      
            {/* Info Section */}
            <div className="flex flex-col gap-1 px-3 py-4 sm:gap-2">
              <p className="text-base sm:text-lg font-semibold text-richblack-5 truncate">
                {course?.courseName}
              </p>
              <p className="text-xs sm:text-sm text-richblack-50 truncate">
                {course?.instructor?.firstName} {course?.instructor?.lastName}
              </p>
      
              {/* Rating */}
              <div className="flex items-center gap-2 text-sm">
                <span className="text-yellow-5 font-semibold">{avgReviewCount || 0}</span>
                <RatingStars Review_Count={avgReviewCount} />
                <span className="text-richblack-400 text-xs sm:text-sm">
                  {course?.ratingAndReviews?.length} Ratings
                </span>
              </div>
      
              {/* Price */}
              <p className="text-base sm:text-lg font-medium text-richblack-5">
                ₹ {course?.price}
              </p>
            </div>
          </div>
        </Link>
      );
      
}

export default Course_Card
