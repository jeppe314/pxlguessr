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
    console.log(x)
    console.log(y)

    setPos({
      ...pos,
      left: x,
      top: y,
    })
  }

  const boxMove = (e) => {
    const el = e.target.getBoundingClientRect()
    const x = e.clientX - el.left
    const y = e.clientY - el.top

    if (mouseDown) {
      console.log("moved x: " + x)
      console.log("moved y: " + y)
      setPos({
        ...pos,
        width: x + "px",
        height: y + "px",
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
