import React from "react"

export const Btn = ({ handleClick, children }) => {
  return (
    <button type="button" className="btn" onClick={handleClick}>
      {children}
    </button>
  )
}
