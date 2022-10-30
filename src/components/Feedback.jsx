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

  return (
    <div className="feedback">
      <div className="feedback--stats">
        <h1>Good job! Close!</h1>
        <p>
          You were off by <span>{roundDiff} pxls</span>
        </p>
        <div style={{ display: "flex", gap: "2em" }}>
          <p>
            Width: {widthGuesses[curr]}px ({widthDiff > 0 && "+"}
            {widthDiff}px)
          </p>
          <p>
            Height: {heightGuesses[curr]}px ({heightDiff > 0 && "+"}
            {heightDiff}px)
          </p>
        </div>
        <Btn handleClick={() => nextRound()}>Next round</Btn>
      </div>
    </div>
  )
}
