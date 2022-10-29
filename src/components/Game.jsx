import React, { useState, useRef, useEffect } from "react"

export const Game = () => {
  const [mouseDown, setMouseDown] = useState(false)
  const [rect, setRect] = useState({})
  const [boxStyles, setBoxStyles] = useState({})

  const startPos = (e) => {
    setMouseDown(true)
    const el = e.target.getBoundingClientRect()

    setRect({
      left: e.clientX,
      top: e.clientY,
    })

    setBoxStyles({
      width: "0px",
      height: "0px",
      left: e.clientX,
      top: e.clientY - el.top,
    })
  }

  const boxMove = (e) => {
    const relX = e.clientX - rect.left
    const relY = e.clientY - rect.top
    if (mouseDown) {
      setBoxStyles({
        left:
          boxStyles.left >= e.clientX ? e.clientX : boxStyles.left,

        top: boxStyles.top >= e.clientY ? e.clientY : boxStyles.top,
        width: relX >= 0 ? relX : relX + -(2 * relX),
        height: relY >= 0 ? relY : relY + -(2 * relY),
      })

      console.log(e.clientX + "::" + boxStyles.left)
    } else return
  }

  return (
    <div
      className="game"
      onMouseDown={(e) => startPos(e)}
      onMouseMove={(e) => boxMove(e)}
      onMouseUp={(e) => {
        setMouseDown(false)
      }}
    >
      <div className="user--guess" style={boxStyles}></div>
    </div>
  )
}
