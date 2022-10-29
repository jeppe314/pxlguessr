import React, { useState, useRef, useEffect } from "react"

export const Game = () => {
  const [mouseDown, setMouseDown] = useState(false)
  const [rect, setRect] = useState({})

  const [box, setBox] = useState({
    top: "0px",
    left: "0px",
    width: "0px",
    height: "0px",
  })

  const boxStyles = {
    backgroundColor: "yellow",
    top: box.top,
    left: box.left,
    width: box.width,
    height: box.height,
  }

  const startPos = (e) => {
    setMouseDown(true)
    const el = e.target.getBoundingClientRect()

    setRect({
      left: e.clientX,
      top: e.clientY,
    })

    setBox({
      width: "0px",
      height: "0px",
      left: e.clientX,
      top: e.clientY - el.top,
    })
    console.log(rect.left)
  }

  const boxMove = (e) => {
    const relX = e.clientX - rect.left
    const relY = e.clientY - rect.top
    if (mouseDown) {
      setBox({
        ...box,
        width: relX + "px",
        height: relY + "px",
      })
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
