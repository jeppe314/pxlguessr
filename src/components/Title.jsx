import React, { useContext } from "react"
import { GameContext } from "../contexts/GameContext"

export const Title = () => {
    const { state, pauseGame, unPauseGame, showModal } = useContext(GameContext)
    const { started, finished, round, showPost } = state
    return (
        <h1
            className={`title ${!started && !finished && "stretch"} ${
                started && round < 6 && "top"
            } ${showPost && "postPos"}`}
            onClick={
                started && !finished
                    ? showModal
                        ? () => unPauseGame()
                        : () => pauseGame()
                    : undefined
            }
            style={started ? { cursor: "pointer" } : undefined}
        >
            PxlGuessr
        </h1>
    )
}
