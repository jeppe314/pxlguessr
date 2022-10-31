import React, { useContext } from "react"
import { GameContext } from "../contexts/GameContext"

export const Title = () => {
  const { gameState } = useContext(GameContext)
  const { started, finished } = gameState
  return (
    <h1
      className={`title ${!started && "stretch"} ${
        started && !finished && "top"
      } ${finished && "postPos"}`}
    >
      PxlGuessr
    </h1>
  )
}
