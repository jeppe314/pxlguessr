import React, { useContext } from "react"
import { GameContext } from "../contexts/GameContext"
import { Btn } from "./Btn"

export const Feedback = ({ boxStyles, setBoxStyles }) => {
  const { gameState, setGameState } = useContext(GameContext)
  const {
    widthGuesses,
    heightGuesses,
    targetHeights,
    targetWidths,
    round,
  } = gameState

  const curr = round - 1

  function difference(a, b) {
    return Math.abs(a - b)
  }

  const feedbackQuotes = {
    1: "WOW!! That was inch perfect!",
    2: "Very impressive! That was a great guess!",
    3: "Good guess!",
    4: "That was... below par.",
    5: "Come on... Can you atleast try?",
  }

  const heightDiff = heightGuesses[curr] - targetHeights[curr]
  const widthDiff = widthGuesses[curr] - targetWidths[curr]
  const roundDiff = difference(
    widthGuesses[curr] + heightGuesses[curr],
    targetHeights[curr] + targetWidths[curr]
  )

  const nextRound = () => {
    setGameState((prev) => ({
      ...prev,
      guessed: false,
      round: prev.round + 1,
    }))
    setBoxStyles((prev) => ({
      ...prev,
      width: 0,
      height: 0,
    }))
    console.log(gameState)
  }

  const resultStyle = {
    color: "#da3c3c",
  }

  return (
    <div className="feedback">
      <div className="feedback--stats">
        <h1>{feedbackQuotes[5]}</h1>
        <p>
          You were off by <span style={resultStyle}>{roundDiff}</span>
        </p>
        <div style={{ display: "flex", gap: "2em" }}>
          <p>
            Width:{" "}
            <span style={{ color: "white" }}>
              {widthGuesses[curr]} (
              <span style={resultStyle}>
                {widthDiff > 0 && "+"}
                {widthDiff}
              </span>
            </span>
            )
          </p>
          <p>
            Height:{" "}
            <span style={{ color: "white" }}>
              {heightGuesses[curr]} (
              <span style={resultStyle}>
                {heightDiff > 0 && "+"}
                {heightDiff}
              </span>
            </span>
            )
          </p>
        </div>
        <Btn handleClick={() => nextRound()}>Next round</Btn>
      </div>
    </div>
  )
}
