import React, { createContext, useState } from "react"

export const GameContext = createContext()

export const GameContextProvider = ({ children }) => {
  const [gameState, setGameState] = useState({
    started: false,
    guessed: false,
    gameLength: 5,
    round: 1,
    targetHeights: randomIntFromInterval(20, 400, 5),
    targetWidths: randomIntFromInterval(20, 400, 5),
    widthGuesses: [],
    heightGuesses: [],
    widthDiff: [],
    heightDiff: [],
    roundScores: [],
    score: 0,
  })
  const {
    started,
    guessed,
    gameLength,
    round,
    targetHeights,
    targetWidths,
    widthGuesses,
    heightGuesses,
    widthDiff,
    heightDiff,
    roundScores,
    score,
  } = gameState

  const [start, setStart] = useState(false)
  const [mouseDown, setMouseDown] = useState(false)
  const [rect, setRect] = useState({})

  function randomIntFromInterval(min, max, n) {
    const arr = []
    for (let i = 0; i < n; i++) {
      arr.push(Math.floor(Math.random() * (max - min + 1) + min))
    }
    return arr
  }
  const [boxStyles, setBoxStyles] = useState({})

  const curr = gameState.round - 1

  const startPos = (e) => {
    if (!guessed) {
      setMouseDown(true)
      const el = e.target.getBoundingClientRect()

      setRect({
        left: e.clientX,
        top: e.clientY,
      })

      setBoxStyles({
        width: "0px",
        height: "0px",
        left: e.clientX,
        top: e.clientY - el.top,
      })
    } else return
  }

  const boxMove = (e) => {
    const relX = e.clientX - rect.left
    const relY = e.clientY - rect.top
    if (mouseDown) {
      setBoxStyles({
        left: boxStyles.left > e.clientX ? e.clientX : boxStyles.left,
        top:
          boxStyles.top > e.clientY
            ? e.clientY - rect.top
            : boxStyles.top,
        width: relX >= 0 ? relX : relX + -(2 * relX),
        height: relY >= 0 ? relY : relY + -(2 * relY),
      })
    } else return
  }
  //FIXME

  const boxGuess = () => {
    setMouseDown(false)
    if (!guessed && boxStyles.width > 0 && boxStyles.height > 0) {
      setGameState((prev) => ({
        ...prev,
        guessed: true,
        widthGuesses: [...prev.widthGuesses, boxStyles.width],
        heightGuesses: [...prev.heightGuesses, boxStyles.height],
      }))
    }
  }

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
  }

  const playAgain = () => {
    setGameState((prev) => ({
      ...prev,
      round: 1,
      score: 0,
      roundScores: [],
      widthGuesses: [],
      heightGuesses: [],
      widthDiff: [],
      heightDiff: [],
    }))
  }

  return (
    <GameContext.Provider
      value={{
        gameState,
        setGameState,
        start,
        setStart,
        curr,
        playAgain,
        nextRound,
        boxStyles,
        setBoxStyles,
        startPos,
        boxMove,
        boxGuess,
      }}
    >
      {children}
    </GameContext.Provider>
  )
}
