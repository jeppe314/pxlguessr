import React, { createContext, useState } from "react"
import { feedbackQuotes } from "../assets/quotes"

export const GameContext = createContext()
export const GameContextProvider = ({ children }) => {
  const [gameState, setGameState] = useState({
    finished: false,
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

  const { guessed } = gameState

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
        initialTop: e.clientY - el.top,
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
        top:
          relY >= 0
            ? rect.initialTop
            : rect.initialTop - Math.abs(relY),
        left:
          relX >= 0
            ? e.clientX - relX
            : e.clientX - relX - Math.abs(relX),
        width: Math.abs(relX),
        height: Math.abs(relY),
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
      started: prev.finished ? false : true,
      guessed: false,
      round: prev.round + 1,
      finished: prev.round === prev.gameLength ? true : false,
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
      started: true,
      finished: false,
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
        feedbackQuotes,
      }}
    >
      {children}
    </GameContext.Provider>
  )
}
