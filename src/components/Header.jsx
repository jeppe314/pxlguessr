import React, { useContext } from "react"
import { Title } from "./Title"
import { GameContext } from "../contexts/GameContext"

export const Header = () => {
  const { gameState, setGameState } = useContext(GameContext)
  return (
    <div className="header">
      <div>
        <p>Round {`${gameState.round}/5`}</p>
      </div>
      <div className="header--mid">
        <Title />
        <div className="header--target">
          <p>Width: 25px</p>
          <p>Height: 35px</p>
        </div>
      </div>
      <div>
        <p>Total score: 0</p>
      </div>
    </div>
  )
}
