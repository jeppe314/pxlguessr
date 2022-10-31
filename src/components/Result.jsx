import React, { useContext } from "react"
import { GameContext } from "../contexts/GameContext"
import { nanoid } from "nanoid"
import { Btn } from "./Btn"

export const Result = () => {
  const { gameState, playAgain, feedbackQuotes } =
    useContext(GameContext)
  const { score, roundScores } = gameState

  const rounds = roundScores.map((round, index) => {
    return (
      <p key={nanoid()}>
        Round {index + 1}:{" "}
        <span style={{ color: "#da3c3c" }}>{round}</span>
      </p>
    )
  })

  let feedback = ""
  switch (true) {
    case score < 100:
      feedback = feedbackQuotes.post[1]
      break
    case score < 200:
      feedback = feedbackQuotes.post[2]
      break
    case score < 400:
      feedback = feedbackQuotes.post[3]
      break
    case score < 600:
      feedback = feedbackQuotes.post[4]
      break
    case score < 800:
      feedback = feedbackQuotes.post[5]
      break
    default:
      feedback = "I have no words for you."
  }

  return (
    <div className="result">
      <div className="result--score">
        <h3>Your total score is</h3>
        <br />
        <h1>{score}%</h1>
        <h2>{feedback}</h2>
      </div>
      <div className="result--rounds">{rounds}</div>
      <Btn handleClick={playAgain}>Play again</Btn>
    </div>
  )
}
