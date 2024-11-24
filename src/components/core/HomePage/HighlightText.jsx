// This is a simple React component named "HighlightText".
// It accepts a prop 'text' and wraps it inside a <span> element to apply styling.
// The text is displayed with a bold font and a specific color (richblue-200).

import React from 'react'

const HighlightText = ({text}) => {
  return (
    <span className='font-bold text-richblue-200'>
        {" "}
        {text} {/* Text passed as a prop is displayed here */}
    </span>
  )
}

export default HighlightText

