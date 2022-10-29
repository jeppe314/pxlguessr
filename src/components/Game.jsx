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
    const el = e.target.getBoundingClientRect()
    setMouseDown(true)

    setRect({
      left: el.left,
      top: el.top,
    })

    setBox({
      width: "0px",
      height: "0px",
      left: e.clientX + "px",
      top: e.clientY - rect.top + "px",
    })

    console.log(box)
  }

  const boxMove = (e) => {
    const relX = e.clientX
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
