import React, { createContext, useState } from "react"

export const GameContext = createContext()

export const GameContextProvider = ({ children }) => {
  const [start, setStart] = useState(false)

  const [gameState, setGameState] = useState({
    widthGuesses: [],
    heightGuesses: [],
  })

  return (
    <GameContext.Provider
      value={{ gameState, setGameState, start, setStart }}
    >
      {children}
    </GameContext.Provider>
  )
}
