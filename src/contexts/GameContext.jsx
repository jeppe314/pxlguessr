import React, { createContext, useEffect, useState } from "react"
import { feedbackQuotes } from "../assets/quotes"
import {
  doc,
  updateDoc,
  Timestamp,
  arrayUnion,
} from "firebase/firestore"
import { db } from "../firebase"
import { nanoid } from "nanoid"

export const GameContext = createContext()
export const GameContextProvider = ({ children }) => {
  //STATES START
  const [boxStyles, setBoxStyles] = useState({})
  const [targetBoxStyles, setTargetBoxStyles] = useState({})
  const [err, setErr] = useState(false)
  const [mouseDown, setMouseDown] = useState(false)
  const [rect, setRect] = useState({})
  const [loading, setLoading] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [gameState, setGameState] = useState({
    uid: nanoid(),
    name: "",
    finished: false,
    showPost: false,
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
  //STATES END

  const {
    guessed,
    finished,
    score,
    name,
    showPost,
    targetWidths,
    targetHeights,
  } = gameState

  const pauseGame = () => {
    setShowModal(true)
    document.querySelector(".modal").classList.remove("hide")
  }
  const unPauseGame = () => {
    document.querySelector(".modal").classList.add("hide")
    setShowModal(false)
  }

  function randomIntFromInterval(min, max, n) {
    const arr = []
    for (let i = 0; i < n; i++) {
      arr.push(Math.floor(Math.random() * (max - min + 1) + min))
    }
    return arr
  }

  const curr = gameState.round - 1

  const goHome = () => {
    setGameState({
      uid: nanoid(),
      name: "",
      finished: false,
      showPost: false,
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
    setRect({})
    setTargetBoxStyles({})
    setBoxStyles({})
    if (showModal) {
      setShowModal(false)
    }
  }

  const startGame = async (e) => {
    if (e.target.length < 3) {
      console.log("error")
      setErr(true)
      return
    }

    setGameState((prev) => ({
      ...prev,
      started: true,
      name: e.target.value,
    }))
  }

  //BOX FUNCTIONS START

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
        finished: prev.round >= prev.gameLength ? true : false,
        started: prev.round > prev.gameLength ? false : true,
      }))
      setTargetBoxStyles({
        width: targetWidths[curr],
        height: targetHeights[curr],
        top: boxStyles.top,
        left: boxStyles.left,
        border: "3px dashed white",
      })
    }
  }

  //BOX FUNCTIONS END

  //UPLOADS SCORE TO FIRESTORE

  const uploadScore = async () => {
    try {
      await updateDoc(doc(db, "scores", "users"), {
        scores: arrayUnion({
          name: name,
          score: score,
          date: Timestamp.now(),
        }),
      })
    } catch (err) {
      console.log("error: " + err)
    }
  }
  useEffect(() => {
    if (showPost) {
      uploadScore()
    } else return
  }, [showPost])

  const nextRound = async () => {
    //Resets gameState for a new round
    setGameState((prev) => ({
      ...prev,
      showPost: finished ? true : false,
      guessed: false,
      round: prev.round + 1,
    }))

    //Resets guess box
    setBoxStyles((prev) => ({
      ...prev,
      width: 0,
      height: 0,
    }))
    setTargetBoxStyles({
      width: 0,
      height: 0,
      top: 0,
      left: 0,
      border: "none",
    })
  }

  const playAgain = () => {
    setGameState((prev) => ({
      ...prev,
      started: true,
      finished: false,
      showPost: false,
      round: 1,
      score: 0,
      roundScores: [],
      targetHeights: randomIntFromInterval(20, 400, 5),
      targetWidths: randomIntFromInterval(20, 400, 5),
      widthGuesses: [],
      heightGuesses: [],
      widthDiff: [],
      heightDiff: [],
    }))
    if (showModal) {
      setShowModal(false)
    }
  }

  return (
    <GameContext.Provider
      value={{
        startGame,
        gameState,
        setGameState,
        curr,
        playAgain,
        nextRound,
        boxStyles,
        setBoxStyles,
        startPos,
        boxMove,
        boxGuess,
        feedbackQuotes,
        err,
        setErr,
        targetBoxStyles,
        loading,
        setLoading,
        goHome,
        pauseGame,
        unPauseGame,
        showModal,
      }}
    >
      {children}
    </GameContext.Provider>
  )
}
