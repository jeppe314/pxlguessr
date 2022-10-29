import React, { useContext, useState, useRef, useEffect } from "react"
import { GameContext } from "../contexts/GameContext"

export const Game = () => {
  const [mouseDown, setMouseDown] = useState(false)
  const [rect, setRect] = useState({})
  const [boxStyles, setBoxStyles] = useState({})
  const { gameState, setGameState } = useContext(GameContext)
  console.log(gameState)

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
        left: boxStyles.left > e.clientX ? e.clientX : boxStyles.left,
        top:
          boxStyles.top > e.clientY
            ? e.clientY - rect.top
            : boxStyles.top,
        width: relX >= 0 ? relX : relX + -(2 * relX),
        height: relY >= 0 ? relY : relY + -(2 * relY),
      })
    } else return
  }
  //FIXME

  const boxGuess = (e) => {
    setMouseDown(false)
    setGameState((prev) => ({
      widthGuesses: [...prev.widthGuesses, boxStyles.width],
      heightGuesses: [...prev.heightGuesses, boxStyles.height],
    }))
  }

  return (
    <div
      className="game"
      onMouseDown={(e) => startPos(e)}
      onMouseMove={(e) => boxMove(e)}
      onMouseUp={(e) => {
        boxGuess(e)
      }}
    >
      <div className="user--guess" style={boxStyles}></div>
    </div>
  )
}
