import React, { useContext } from "react"
import { GameContext } from "../contexts/GameContext"

export const Feedback = () => {
  const { gameState, setGameState } = useContext(GameContext)
  return <div>Feedback</div>
}
