import React, { useContext } from "react"
import { GameContext } from "../contexts/GameContext"
import { Feedback } from "./Feedback"

export const Game = () => {
  const {
    gameState,
    startPos,
    boxMove,
    boxGuess,
    boxStyles,
    setBoxStyles,
  } = useContext(GameContext)
  const { guessed } = gameState

  return (
    <div
      className="game"
      onTouchStart={(e) => console.log(e)}
      onMouseDown={(e) => startPos(e)}
      onMouseMove={(e) => boxMove(e)}
      onMouseUp={() => {
        boxGuess()
      }}
    >
      <h1 className="good--luck">Good luck!</h1>
      <div className="user--guess" style={boxStyles}></div>
      {guessed && (
        <Feedback setBoxStyles={setBoxStyles} boxStyles={boxStyles} />
      )}
    </div>
  )
}
