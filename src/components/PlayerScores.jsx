import { Btn } from "./Btn"
import CountUp from "react-countup"
import React, { useContext } from "react"
import { GameContext } from "../contexts/GameContext"
import { RoundScores } from "./RoundScores"
import { FeedbackQuote } from "./FeedbackQuote"

export const PlayerScores = () => {
    const { state, playAgain } = useContext(GameContext)
    const { score } = state

    return (
        <div className="result--wrapper">
            <div className="result--score">
                <h2 style={{ fontSize: "1.5em" }}>Total score</h2>
                <br />
                <h1>
                    {" "}
                    <CountUp
                        useEasing={true}
                        style={{ color: "#da3c3c" }}
                        duration={2}
                        start={0}
                        end={score}
                        suffix="%"
                    />
                </h1>
                <FeedbackQuote />
            </div>
            <RoundScores />
            <Btn handleClick={playAgain}>Play again</Btn>
        </div>
    )
}
