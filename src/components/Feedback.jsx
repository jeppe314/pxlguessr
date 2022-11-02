import React, { useContext, useEffect } from "react"
import { GameContext } from "../contexts/GameContext"
import { Btn } from "./Btn"
import { FeedbackQuote } from "./FeedbackQuote"

export const Feedback = () => {
  const { gameState, setGameState, nextRound, curr } =
    useContext(GameContext)
  const {
    widthGuesses,
    heightGuesses,
    targetHeights,
    targetWidths,
    round,
    roundScores,
    guessed,
  } = gameState

  const heightDiff = Math.round(
    (heightGuesses[curr] / targetHeights[curr]) * 100 - 100
  )
  const widthDiff = Math.round(
    (widthGuesses[curr] / targetWidths[curr]) * 100 - 100
  )

  const thisRound = Math.abs(heightDiff) + Math.abs(widthDiff)

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
        <FeedbackQuote thisRound={thisRound} />
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
