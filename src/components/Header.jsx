import React, { useContext } from "react"
import { Title } from "./Title"
import { GameContext } from "../contexts/GameContext"

export const Header = () => {
  const { gameState, setGameState } = useContext(GameContext)
  return (
    <div className="header">
      <div className="header--content">
        <div>
          <p>
            <span>Round: </span> {`${gameState.round}/5`}
          </p>
        </div>
        <div className="header--mid">
          {/* <Title /> */}
          <div className="header--target">
            <p>
              <span>Width: </span>25px
            </p>
            <p>
              <span>Height: </span>35px
            </p>
          </div>
        </div>
        <div>
          <p>
            <span>Score: </span>0
          </p>
        </div>
      </div>
    </div>
  )
}
