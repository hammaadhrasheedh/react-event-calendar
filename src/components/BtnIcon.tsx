import * as React from "react"

const BtnIcon = (props:any) => (
  <svg
    width={6}
    height={10}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M5 1 1 5l4 4"
      stroke="#9CA3AF"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export default BtnIcon
