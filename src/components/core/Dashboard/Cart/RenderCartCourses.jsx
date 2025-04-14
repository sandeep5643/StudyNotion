import { FaStar } from "react-icons/fa"
import { RiDeleteBin6Line } from "react-icons/ri"
import ReactStars from "react-rating-stars-component"
import { useDispatch, useSelector } from "react-redux"

import { removeFromCart } from "../../../../slices/cartSlice"

export default function RenderCartCourses() {
  const { cart } = useSelector((state) => state.cart)
  const dispatch = useDispatch()
  
  return (
    <div className="flex flex-1 flex-col">
  {cart.map((course, indx) => (
    <div
      key={course._id}
      className={`flex flex-col lg:flex-row items-start justify-between gap-4 ${
        indx !== cart.length - 1 ? "border-b border-b-richblack-400 pb-6" : ""
      } ${indx !== 0 ? "mt-6" : ""}`}
    >
      {/* Image + Info */}
      <div className="flex w-full lg:w-[70%] flex-col sm:flex-row gap-4">
        <img
          src={course?.thumbnail}
          alt={course?.courseName}
          className="w-full sm:w-[220px] h-auto sm:h-[148px] rounded-lg object-cover"
        />
        <div className="flex flex-col space-y-1">
          <p className="text-base sm:text-lg font-medium text-richblack-5">{course?.courseName}</p>
          <p className="text-sm text-richblack-300">{course?.category?.name}</p>
          <div className="flex flex-row lg:flex-row sm:flex-row md:flex-row items-center gap-2">
            <span className="text-yellow-5">4.5</span>
            <ReactStars
              count={5}
              value={course?.ratingAndReviews?.length}
              size={20}
              edit={false}
              activeColor="#ffd700"
              emptyIcon={<FaStar />}
              fullIcon={<FaStar />}
            />
            <span className="text-richblack-400">
              {course?.ratingAndReviews?.length} Ratings
            </span>
          </div>
        </div>
      </div>

      {/* Price + Remove */}
      <div className="flex flex-row lg:flex-col justify-between items-center gap-2 w-full lg:w-auto mt-2 lg:mt-0">
        <button
          onClick={() => dispatch(removeFromCart(course._id))}
          className="flex items-center gap-x-1 rounded-md border border-richblack-600 bg-richblack-700 py-2 px-3 text-pink-200"
        >
          <RiDeleteBin6Line />
          <span className="text-sm">Remove</span>
        </button>
        <p className="text-xl font-medium text-yellow-100">₹ {course?.price}</p>
      </div>
    </div>
  ))}
</div>


  )
}