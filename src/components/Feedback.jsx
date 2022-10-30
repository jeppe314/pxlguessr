import React, { useContext, useEffect } from "react"
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
    roundScores,
    guessed,
    score,
  } = gameState

  const curr = round - 1

  function difference(a, b) {
    return Math.abs(a - b)
  }

  function sumArr(arr) {
    return arr.reduce((partialSum, a) => partialSum + a, 0)
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
  const thisRound = difference(
    widthGuesses[curr] + heightGuesses[curr],
    targetHeights[curr] + targetWidths[curr]
  )
  useEffect(() => {
    setGameState((prev) => ({
      ...prev,
      roundScores: [...roundScores, thisRound],
      score: sumArr(prev.roundScores),
    }))
  }, [guessed])

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
          You were off by{" "}
          <span style={resultStyle}>{roundScores[curr]}</span>
        </p>
        <div style={{ display: "flex", gap: "2em" }}>
          <p>
            Width:{" "}
            <span style={{ color: "white" }}>
              {widthGuesses[curr]}{" "}
            </span>
            (
            <span style={resultStyle}>
              {widthDiff > 0 && "+"}
              {widthDiff}
            </span>
            )
          </p>
          <p>
            Height:{" "}
            <span style={{ color: "white" }}>
              {heightGuesses[curr]}{" "}
            </span>
            (
            <span style={resultStyle}>
              {heightDiff > 0 && "+"}
              {heightDiff}
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
