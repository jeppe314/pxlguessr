import React, { useContext, useEffect } from "react"
import { Title } from "./Title"
import { GameContext } from "../contexts/GameContext"

export const Header = () => {
  const { gameState, setGameState } = useContext(GameContext)
  const {
    round,
    targetHeights,
    targetWidths,
    score,
    widthGuesses,
    heightGuesses,
    guessed,
    roundScores,
  } = gameState
  const curr = round - 1

  function difference(a, b) {
    return Math.abs(a - b)
  }

  // useEffect(() => {
  //   setGameState((prev) => ({
  //     ...prev,
  //   }))
  // }, [guessed])

  return (
    <div className="header">
      <div className="header--content">
        <div>
          <p>
            <span>Round: </span> {`${gameState.round}/5`}
          </p>
        </div>
        <div className="header--mid">
          <div className="header--target">
            <p>
              <span>Width: </span>
              {targetWidths[curr]}px
            </p>
            <p>
              <span>Height: </span>
              {targetHeights[curr]}px
            </p>
          </div>
        </div>
        <div>
          <p>
            <span>Score: </span>
            {score}
          </p>
        </div>
      </div>
    </div>
  )
}
