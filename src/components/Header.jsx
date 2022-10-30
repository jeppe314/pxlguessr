import React, { useContext } from "react"
import { GameContext } from "../contexts/GameContext"

export const Header = () => {
  const { gameState } = useContext(GameContext)
  const { round, targetHeights, targetWidths, score } = gameState
  const curr = round - 1

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
