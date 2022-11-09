import React, { useContext } from "react"
import { GameContext } from "../contexts/GameContext"
import { Feedback } from "./Feedback"
import { Modal } from "./Modal"

export const Game = () => {
    const {
        state,
        startPos,
        boxMove,
        boxGuess,
        boxStyles,
        targetBoxStyles,
        showModal,
    } = useContext(GameContext)

    return (
        <div
            className={`game ${showModal && "blur"}`}
            onMouseDown={(e) => startPos(e)}
            onMouseMove={(e) => boxMove(e)}
            onMouseUp={() => {
                boxGuess()
            }}
            style={{}}
        >
            <h1 className="good--luck">Good luck!</h1>
            <div className="user--guess" style={state.boxStyles}></div>
            <div className="target--box" style={state.targetBoxStyles}></div>
            {state.guessed && (
                <Feedback
                    // setBoxStyles={setBoxStyles}
                    boxStyles={state.boxStyles}
                />
            )}
        </div>
    )
}
