import React from 'react'
import { useSelector } from 'react-redux'
import RenderCartCourses from './RenderCartCourses';
import RenderTotalAmount from './RenderTotalAmount';


const Cart = () => {

    const {total, totalItems} = useSelector((state) => state.cart);

    return (
        <div className="px-4 sm:px-6 lg:px-8">
  <h1 className="mb-8 text-2xl lg:text-3xl font-medium text-richblack-5">Your Cart</h1>

  <p className="border-b border-b-richblack-400 pb-2 font-semibold text-richblack-400">
    {totalItems} Courses in Cart
  </p>

  {total > 0 ? (
    <div className="mt-8 flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-x-10">
      {/* Left side (Courses) */}
      <div className="w-full lg:w-3/4">
        <RenderCartCourses />
      </div>

      {/* Right side (Total Box) */}
      <div className="w-full lg:w-1/4">
        <RenderTotalAmount />
      </div>
    </div>
  ) : (
    <p className="mt-14 text-center text-2xl lg:text-3xl text-richblack-100">
      Your Cart is Empty
    </p>
  )}
</div>

      );
      
}

export default Cart