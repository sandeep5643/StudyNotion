import React from 'react'

const HighlightText = ({text}) => {
  return (
    <span className="font-bold text-richblue-200 underline underline-offset-4 decoration-yellow-400">
      {text}
    </span>
  );
}

export default HighlightText
