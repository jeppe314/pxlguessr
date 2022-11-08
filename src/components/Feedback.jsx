import React, { useContext, useEffect } from "react"
import { ACTION_TYPES } from "../reducer/ACTION_TYPES"
import { GameContext } from "../contexts/GameContext"
import { Btn } from "./Btn"
import { FeedbackQuote } from "./FeedbackQuote"

export const Feedback = () => {
    const { state, dispatch, nextRound, curr } = useContext(GameContext)
    const {
        widthGuesses,
        heightGuesses,
        targetHeights,
        targetWidths,
        round,
        roundScores,
        guessed,
        gameLength,
    } = state

    const heightDiff = Math.round(
        (heightGuesses[curr] / targetHeights[curr]) * 100 - 100
    )
    const widthDiff = Math.round(
        (widthGuesses[curr] / targetWidths[curr]) * 100 - 100
    )

    const thisRound = Math.abs(heightDiff) + Math.abs(widthDiff)

    useEffect(() => {
        dispatch({
            type: ACTION_TYPES.SCORE_UPDATE,
            payload: { thisRound: thisRound },
        })
    }, [guessed])

    const resultStyle = {
        color: "#da3c3c",
    }

    return (
        <div className="feedback">
            <div className="feedback--stats">
                <FeedbackQuote thisRound={thisRound} />
                <p>
                    You were off by{" "}
                    <span style={resultStyle}>{roundScores[curr]}%</span>
                </p>
                <div style={{ display: "flex", gap: "2em" }}>
                    <p>
                        Width:{" "}
                        <span style={{ color: "white" }}>
                            {state.widthGuesses[curr]}px{" "}
                        </span>
                        (
                        <span style={resultStyle}>
                            {widthDiff}%{widthDiff > 0 && "+"}
                        </span>
                        )
                    </p>
                    <p>
                        Height:{" "}
                        <span style={{ color: "white" }}>
                            {heightGuesses[curr]}px{" "}
                        </span>
                        (
                        <span style={resultStyle}>
                            {heightDiff > 0 && "+"}
                            {heightDiff}%
                        </span>
                        )
                    </p>
                </div>
                <Btn handleClick={() => nextRound()}>
                    {round === gameLength ? "See results" : "Next round"}
                </Btn>
            </div>
        </div>
    )
}
