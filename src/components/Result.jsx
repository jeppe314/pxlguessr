import React, { useContext } from "react"
import { GameContext } from "../contexts/GameContext"
import { nanoid } from "nanoid"
import { Btn } from "./Btn"

export const Result = () => {
  const { gameState, setGameState, playAgain} = useContext(GameContext)
  const { score, roundScores } = gameState

  const rounds = roundScores.map((round, index) => {
    return (
      <p key={nanoid()}>
        Round {index + 1}:{" "}
        <span style={{ color: "#da3c3c" }}>{round}</span>
      </p>
    )
  })

  return (
    <div className="result">
      <div className="result--score">
        <h3>Your total score is</h3>
        <br />
        <h1>{score}%</h1>
      </div>
      <div className="result--rounds">{rounds}</div>
      <Btn handleClick={playAgain}>Play again</Btn>
    </div>
  )
}
