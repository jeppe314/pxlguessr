import React, { useContext } from "react"
import { GameContext } from "../contexts/GameContext"

export const Title = () => {
  const { gameState, pauseGame } = useContext(GameContext)
  const { started, finished, round, showPost } = gameState
  return (
    <h1
      className={`title ${!started && !finished && "stretch"} ${
        started && round < 6 && "top"
      } ${showPost && "postPos"}`}
      onClick={() => pauseGame()}
      style={started ? { cursor: "pointer" } : undefined}
    >
      PxlGuessr
    </h1>
  )
}
