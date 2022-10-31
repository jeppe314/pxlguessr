import React, { useContext, useEffect } from "react"
import { GameContext } from "../contexts/GameContext"
import { Btn } from "./Btn"

export const Feedback = () => {
  const { gameState, setGameState, nextRound, curr, feedbackQuotes } =
    useContext(GameContext)
  const {
    widthGuesses,
    heightGuesses,
    targetHeights,
    targetWidths,
    round,
    roundScores,
    guessed,
    score,
  } = gameState

  const heightDiff = Math.round(
    (heightGuesses[curr] / targetHeights[curr]) * 100 - 100
  )
  const widthDiff = Math.round(
    (widthGuesses[curr] / targetWidths[curr]) * 100 - 100
  )

  const thisRound = Math.abs(heightDiff) + Math.abs(widthDiff)

  let feedback = ""
  switch (true) {
    case thisRound < 10:
      feedback = feedbackQuotes.round[1]
      break
    case thisRound < 30:
      feedback = feedbackQuotes.round[2]
      break
    case thisRound < 75:
      feedback = feedbackQuotes.round[3]
      break
    case thisRound < 150:
      feedback = feedbackQuotes.round[4]
      break
    case thisRound < 300:
      feedback = feedbackQuotes.round[5]
      break
    default:
      feedback = "I have no words for you."
  }

  useEffect(() => {
    setGameState((prev) => ({
      ...prev,
      roundScores: [...roundScores, thisRound],
      score: prev.score + thisRound,
    }))
  }, [guessed])

  const resultStyle = {
    color: "#da3c3c",
  }

  return (
    <div className="feedback">
      <div className="feedback--stats">
        <h1>{feedback}</h1>
        <p>
          You were off by{" "}
          <span style={resultStyle}>{roundScores[curr]}%</span>
        </p>
        <div style={{ display: "flex", gap: "2em" }}>
          <p>
            Width:{" "}
            <span style={{ color: "white" }}>
              {widthGuesses[curr]}px{" "}
            </span>
            (
            <span style={resultStyle}>
              {widthDiff > 0 && "+"}
              {widthDiff}%
            </span>
            )
          </p>
          <p>
            Height:{" "}
            <span style={{ color: "white" }}>
              {heightGuesses[curr]}px{" "}
            </span>
            (
            <span style={resultStyle}>
              {heightDiff > 0 && "+"}
              {heightDiff}%
            </span>
            )
          </p>
        </div>
        <Btn handleClick={() => nextRound()}>
          {round === 5 ? "See results" : "Next round"}
        </Btn>
      </div>
    </div>
  )
}
