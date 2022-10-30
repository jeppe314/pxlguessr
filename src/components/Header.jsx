import React, { useContext } from "react"
import { GameContext } from "../contexts/GameContext"
import { IoMdArrowDropdown } from "react-icons/io"
import { Btn } from "./Btn"

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
          <div style={{display: "flex", gap: "1em", alignItems: "center"}}>
            <Btn style={{borderRadius: "5px", padding: ".5em"}}>
              <IoMdArrowDropdown style={{display: "flex"}}/>
            </Btn>
            <p>
              <span>Score: </span>
              {score}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
