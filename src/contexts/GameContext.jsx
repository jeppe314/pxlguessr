import React, { createContext, useEffect, useReducer } from "react"
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
        dispatch({ type: ACTION_TYPES.MODAL_SHOW })
        document.querySelector(".modal").classList.remove("hide")
    }
    const unPauseGame = () => {
        document.querySelector(".modal").classList.add("hide")
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
        dispatch({ type: ACTION_TYPES.GO_HOME })
    }

    const startGame = async (e) => {
        if (e.target.value.length < 1) {
            dispatch({ type: ACTION_TYPES.ERROR })
            return
        }

        dispatch({
            type: ACTION_TYPES.GAME_START,
            payload: {
                uid: nanoid(),
                name: e.target.value,
                randomHeights: randomIntFromInterval(30, 400, 5),
                randomWidths: randomIntFromInterval(30, 400, 5),
            },
        })
    }

    //BOX FUNCTIONS START

    const startPos = (e) => {
        if (!state.guessed) {
            const el = e.target.getBoundingClientRect()
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
            dispatch({
                type: ACTION_TYPES.BOX_MOVE,
                payload: { relX: relX, relY: relY, x: e.clientX, y: e.clientY },
            })
        } else return
    }

    const boxGuess = () => {
        dispatch({ type: ACTION_TYPES.MOUSE_UP })
        if (
            !state.guessed &&
            state.boxStyles.width > 0 &&
            state.boxStyles.height > 0
        ) {
            dispatch({
                type: ACTION_TYPES.BOX_STOP,
                payload: {
                    width: state.targetWidths[curr],
                    height: state.targetHeights[curr],
                },
            })
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
    }

    const playAgain = () => {
        dispatch({
            type: ACTION_TYPES.PLAY_AGAIN,
            payload: {
                randomHeights: randomIntFromInterval(30, 400, 5),
                randomWidths: randomIntFromInterval(30, 400, 5),
            },
        })

        if (state.showModal) {
            dispatch({ type: ACTION_TYPES.MODAL_HIDE })
        }
    }

    return (
        <GameContext.Provider
            value={{
                state,
                dispatch,
                ACTION_TYPES,
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
