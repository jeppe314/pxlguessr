import React, { useContext } from "react"
import { GameContext } from "../contexts/GameContext"

export const Title = () => {
  const { gameState } = useContext(GameContext)
  const { started } = gameState
  return (
    <h1 className={`title stretch ${started && "top"}`}>PxlGuessr</h1>
  )
}
