import React, { useContext } from "react"
import { Btn } from "./Btn"
import { GameContext } from "../contexts/GameContext"

export const Start = () => {
  const { setGameState } = useContext(GameContext)

  return (
    <div className="start">
      <div className="start--content">
        <p className="start--content--text">
          Welcome to PxlGuessr.
          <br />
          Call yourself a <i>web developer</i>?
          <br />
          Ok then, how big is a pixel? You should know this.
          <br />
          Draw a box that fits the dimensions given from the game. The
          lower the score, the better.
          <br />
          You can do this, right?
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
