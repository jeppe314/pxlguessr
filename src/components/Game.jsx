import React, { useState, useRef, useEffect } from "react"

export const Game = () => {
  const [mouseDown, setMouseDown] = useState(false)

  const [pos, setPos] = useState({
    top: 0,
    left: 0,
    width: "0",
    height: "0",
  })

  const boxStyles = {
    backgroundColor: "yellow",
    top: pos.top,
    left: pos.left,
    width: pos.width,
    height: pos.height,
  }

  const startPos = (e) => {
    const el = e.target.getBoundingClientRect()
    const x = e.clientX - el.left
    const y = e.clientY - el.top

    setMouseDown(true)

    setPos({
      left: x,
      top: y,
      width: "50",
      height: "50",
    })

    console.log(e)
  }

  const endPos = (e) => {
    const el = e.target.getBoundingClientRect()
    const x = e.clientX - el.left
    const y = e.clientY - el.top

    console.log("endX: ")
  }

  const boxMove = (e) => {
    if (mouseDown) {
      console.log("hej")
    } else return
  }

  return (
    <div className="game" onMouseDown={(e) => startPos(e)}>
      <div
        className="user--guess"
        style={boxStyles}
        // onMouseUp={(e) => endPos(e)}
        onMouseMove={(e) => boxMove(e)}
      ></div>
    </div>
  )
}
