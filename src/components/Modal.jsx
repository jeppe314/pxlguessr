import React, { useContext, useState } from "react"
import { GameContext } from "../contexts/GameContext"
import { Btn } from "./Btn"

export const Modal = ({showModal}) => {
  const { playAgain, goHome, unPauseGame } = useContext(GameContext)
  console.log("modal: " + showModal)
  return (
    <div className={showModal === true ? "modal show" : "modal hide"}>
      <div>
        <h2>Pause</h2>
      </div>
      <Btn handleClick={() => unPauseGame()}>Resume</Btn>
      <Btn handleClick={() => playAgain()}>Restart Game</Btn>
      <Btn handleClick={() => goHome()}>Home</Btn>
    </div>
  )
}

// Modal with restart button (reset state) and home button to get to homepage (reset state) OR new player button ?
