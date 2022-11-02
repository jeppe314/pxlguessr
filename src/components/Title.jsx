import React, { useContext } from "react"
import { GameContext } from "../contexts/GameContext"

export const Title = () => {
  const { gameState } = useContext(GameContext)
  const { started, finished, round, showPost } = gameState
  return (
    <h1
      className={`title ${!started && !finished && "stretch"} ${
        started && round < 6 && "top"
      } ${showPost && "postPos"}`}
    >
      PxlGuessr
    </h1>
  )
}
