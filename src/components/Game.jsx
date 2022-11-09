import React, { useContext } from "react"
import { GameContext } from "../contexts/GameContext"
import { Feedback } from "./Feedback"

export const Game = () => {
    const { state, startPos, boxMove, boxGuess, showModal } =
        useContext(GameContext)

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
