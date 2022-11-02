import React, { useContext } from "react"
import { GameContext } from "../contexts/GameContext"
import { nanoid } from "nanoid"

export const RoundScores = () => {
  const { gameState } = useContext(GameContext)
  const { roundScores } = gameState

  const rounds = roundScores.map((round, index) => {
    return (
      <p key={nanoid()}>
        Round {index + 1}:{" "}
        <span style={{ color: "#da3c3c" }}>{round}</span>
      </p>
    )
  })

  return <div className="result--rounds">{rounds}</div>
}
