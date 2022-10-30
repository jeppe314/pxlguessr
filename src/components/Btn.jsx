import React from "react"

export const Btn = ({ handleClick, children, style }) => {
  return (
    <button
      type="button"
      className="btn"
      style={style}
      onClick={handleClick}
    >
      {children}
    </button>
  )
}
