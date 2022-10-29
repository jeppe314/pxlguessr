import React, { useState, useRef, useEffect } from "react"

export const Game = () => {
  const boxRef = useRef()

  useEffect(() => {
    boxRef.current.addEventListener("onMouseDown", () => {
      console.log("moin")
    })
  }, [])

  const [pos, setPos] = useState({
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
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

    setPos({
      left: x,
      top: y,
      width: "0",
      height: "0",
    })

    console.log(e)
  }

  const endPos = (e) => {
    const el = e.target.getBoundingClientRect()
    const x = e.clientX - el.left
    const y = e.clientY - el.top

    console.log("endX: ")
  }

  return (
    <div className="game">
      <div
        ref={boxRef}
        className="user--guess"
        style={boxStyles}
        onMouseDown={(e) => startPos(e)}
        // onMouseUp={(e) => endPos(e)}
        // onMouseMove={() => console.log("HI")}
      ></div>
    </div>
  )
}
