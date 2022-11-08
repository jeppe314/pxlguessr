import React, { createContext, useEffect, useState, useReducer } from "react"
import { gameReducer, INITIAL_STATE } from "../reducer/gameReducer"
import { feedbackQuotes } from "../assets/quotes"
import { doc, updateDoc, Timestamp, arrayUnion } from "firebase/firestore"
import { db } from "../firebase"
import { nanoid } from "nanoid"
import { ACTION_TYPES } from "../reducer/ACTION_TYPES"

export const GameContext = createContext()
export const GameContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(gameReducer, INITIAL_STATE)

    const pauseGame = () => {
        // setShowModal(true)
        dispatch({ type: ACTION_TYPES.MODAL_SHOW })
        document.querySelector(".modal").classList.remove("hide")
    }
    const unPauseGame = () => {
        document.querySelector(".modal").classList.add("hide")
        // setShowModal(false)
        dispatch({ type: ACTION_TYPES.MODAL_HIDE })
    }

    function randomIntFromInterval(min, max, n) {
        const arr = []
        for (let i = 0; i < n; i++) {
            arr.push(Math.floor(Math.random() * (max - min + 1) + min))
        }
        return arr
    }

    const curr = state.round - 1

    const goHome = () => {
        // setGameState({
        //     uid: nanoid(),
        //     name: "",
        //     finished: false,
        //     showPost: false,
        //     started: false,
        //     guessed: false,
        //     gameLength: 5,
        //     round: 1,
        //     targetHeights: randomIntFromInterval(20, 400, 5),
        //     targetWidths: randomIntFromInterval(20, 400, 5),
        //     widthGuesses: [],
        //     heightGuesses: [],
        //     widthDiff: [],
        //     heightDiff: [],
        //     roundScores: [],
        //     score: 0,
        // })
        // setRect({})
        // setTargetBoxStyles({})
        // setBoxStyles({})
        // if (showModal) {
        //     setShowModal(false)
        // }
        dispatch({ type: ACTION_TYPES.GO_HOME })
    }

    const startGame = async (e) => {
        if (e.target.length < 3) {
            console.log("error")
            // setErr(true)
            dispatch({ type: ACTION_TYPES.ERROR })
            return
        }

        // setGameState((prev) => ({
        //     ...prev,
        //     started: true,
        //     name: e.target.value,
        // }))
        dispatch({ type: ACTION_TYPES.GAME_START })
    }

    //BOX FUNCTIONS START

    const startPos = (e) => {
        if (!state.guessed) {
            // setMouseDown(true)
            const el = e.target.getBoundingClientRect()

            // setRect({
            //     left: e.clientX,
            //     top: e.clientY,
            //     initialTop: e.clientY - el.top,
            // })

            // setBoxStyles({
            //     width: "0px",
            //     height: "0px",
            //     left: e.clientX,
            //     top: e.clientY - el.top,
            // })
            dispatch({
                type: ACTION_TYPES.BOX_START,
                payload: { x: e.clientX, y: e.clientY, topHeight: el.top },
            })
        } else return
    }

    const boxMove = (e) => {
        const relX = e.clientX - state.rect.left
        const relY = e.clientY - state.rect.top
        if (state.mouseDown) {
            dispatch({ type: ACTION_TYPES.BOX_MOVE })
            // setBoxStyles({
            //     top:
            //         relY >= 0
            //             ? rect.initialTop
            //             : rect.initialTop - Math.abs(relY),
            //     left:
            //         relX >= 0
            //             ? e.clientX - relX
            //             : e.clientX - relX - Math.abs(relX),
            //     width: Math.abs(relX),
            //     height: Math.abs(relY),
            // })
        } else return
    }

    const boxGuess = () => {
        dispatch({ type: ACTION_TYPES.MOUSE_UP })
        if (
            !state.guessed &&
            state.boxStyles.width > 0 &&
            state.boxStyles.height > 0
        ) {
            dispatch({ type: ACTION_TYPES.BOX_STOP })
            // setGameState((prev) => ({
            //     ...prev,
            //     guessed: true,
            //     widthGuesses: [...prev.widthGuesses, boxStyles.width],
            //     heightGuesses: [...prev.heightGuesses, boxStyles.height],
            //     finished: prev.round >= prev.gameLength ? true : false,
            //     started: prev.round > prev.gameLength ? false : true,
            // }))
            // setTargetBoxStyles({
            //     width: targetWidths[curr],
            //     height: targetHeights[curr],
            //     top: boxStyles.top,
            //     left: boxStyles.left,
            //     border: "3px dashed white",
            // })
        }
    }

    //BOX FUNCTIONS END

    //UPLOADS SCORE TO FIRESTORE

    const uploadScore = async () => {
        try {
            await updateDoc(doc(db, "scores", "users"), {
                scores: arrayUnion({
                    uid: state.uid,
                    name: state.name,
                    score: state.score,
                    date: Timestamp.now(),
                }),
            })
        } catch (err) {
            console.log("error: " + err)
        }
    }
    useEffect(() => {
        if (state.showPost) {
            uploadScore()
        } else return
    }, [state.showPost])

    const nextRound = async () => {
        //Resets gameState for a new round
        dispatch({ type: ACTION_TYPES.NEXT_ROUND })
        // setGameState((prev) => ({
        //     ...prev,
        //     showPost: finished ? true : false,
        //     guessed: false,
        //     round: prev.round + 1,
        // }))

        // //Resets guess box
        // setBoxStyles((prev) => ({
        //     ...prev,
        //     width: 0,
        //     height: 0,
        // }))
        // setTargetBoxStyles({
        //     width: 0,
        //     height: 0,
        //     top: 0,
        //     left: 0,
        //     border: "none",
        // })
    }

    const playAgain = () => {
        dispatch({ type: ACTION_TYPES.PLAY_AGAIN })
        // setGameState((prev) => ({
        //     ...prev,
        //     started: true,
        //     finished: false,
        //     showPost: false,
        //     round: 1,
        //     score: 0,
        //     roundScores: [],
        //     targetHeights: randomIntFromInterval(20, 400, 5),
        //     targetWidths: randomIntFromInterval(20, 400, 5),
        //     widthGuesses: [],
        //     heightGuesses: [],
        //     widthDiff: [],
        //     heightDiff: [],
        // }))
        if (state.showModal) {
            dispatch({ type: ACTION_TYPES.MODAL_HIDE })
        }
    }

    return (
        <GameContext.Provider
            value={{
                startGame,
                curr,
                playAgain,
                nextRound,
                startPos,
                boxMove,
                boxGuess,
                feedbackQuotes,
                goHome,
                pauseGame,
                unPauseGame,
            }}
        >
            {children}
        </GameContext.Provider>
    )
}
