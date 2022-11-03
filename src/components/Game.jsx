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
    targetBoxStyles,
  } = useContext(GameContext)
  const { guessed } = gameState

  return (
    <div
      className="game"
      onMouseDown={(e) => startPos(e)}
      onMouseMove={(e) => boxMove(e)}
      onMouseUp={() => {
        boxGuess()
      }}
    >
      <h1 className="good--luck">Good luck!</h1>
      <div className="user--guess" style={boxStyles}></div>
      <div className="target--box" style={targetBoxStyles}></div>
      {guessed && (
        <Feedback setBoxStyles={setBoxStyles} boxStyles={boxStyles} />
      )}
    </div>
  )
}
