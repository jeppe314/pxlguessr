import React, { useState, useContext } from "react"
import { Btn } from "./Btn"
import { Title } from "./Title"
import { GameContext } from "../contexts/GameContext"

export const Start = () => {
  const { gameState, setGameState } = useContext(GameContext)

  return (
    <div className="start">
      <div className="start--content">
        <p className="start--content--text">
          Welcome to Pixactly.
          <br />
          An online tool that tests how well you know your pixels.
          <br />
          <br />
          Draw a box that matches the dimensions given and receive a
          score based on how close you are. The lower the score... the
          better! Sounds easy, right?
          <br />
          Pixactly.
        </p>
        <Btn
          handleClick={() =>
            setGameState((prev) => ({ ...prev, started: true }))
          }
        >
          Start Game
        </Btn>
      </div>
    </div>
  )
}
