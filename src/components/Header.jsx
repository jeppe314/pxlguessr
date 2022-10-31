import React, { useContext } from "react"
import { GameContext } from "../contexts/GameContext"

import { HeaderScores } from "./HeaderScores"

export const Header = () => {
  const { gameState, curr } = useContext(GameContext)
  const { targetHeights, targetWidths, score, roundScores, length } =
    gameState

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
          <div
            style={{
              display: "flex",
              gap: "1em",
              alignItems: "center",
            }}
          >
            <HeaderScores />
          </div>
        </div>
      </div>
    </div>
  )
}
