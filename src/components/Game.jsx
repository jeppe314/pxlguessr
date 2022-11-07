import React, { useContext } from "react"
import { GameContext } from "../contexts/GameContext"
import { Feedback } from "./Feedback"
import { Modal } from "./Modal"

export const Game = () => {
  const {
    gameState,
    startPos,
    boxMove,
    boxGuess,
    boxStyles,
    setBoxStyles,
    targetBoxStyles,
    showModal,
  } = useContext(GameContext)
  const { guessed } = gameState

  return (
    <div
      className={`game ${showModal && "blur"}`}
      onMouseDown={(e) => startPos(e)}
      onMouseMove={(e) => boxMove(e)}
      onMouseUp={() => {
        boxGuess()
      }}
      style={{}}
    >
      {/* <div>
        <Modal showModal={showModal} />
      </div> */}

      <h1 className="good--luck">Good luck!</h1>
      <div className="user--guess" style={boxStyles}></div>
      <div className="target--box" style={targetBoxStyles}></div>
      {guessed && (
        <Feedback setBoxStyles={setBoxStyles} boxStyles={boxStyles} />
      )}
    </div>
  )
}
