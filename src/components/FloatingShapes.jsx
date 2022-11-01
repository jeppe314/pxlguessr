import React from "react"
import "./../floatingBg.scss"

export const FloatingShapes = ({children}) => {
  const shapes = []
  for (let i = 1; i < 50; i++) {
    shapes.push(
      <div className={`shape-container--${i} shape-animation`}>
        <div className="random-shape"></div>
      </div>
    )
  }

  return (
    <div className="container">
      <div className="shape">{children}{shapes}</div>
    </div>
  )
}