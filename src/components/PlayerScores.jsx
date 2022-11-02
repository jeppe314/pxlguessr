import { Btn } from "./Btn"
import CountUp from "react-countup"
import React, { useContext } from "react"
import { GameContext } from "../contexts/GameContext"
import { RoundScores } from "./RoundScores"
import { FeedbackQuote } from "./FeedbackQuote"

export const PlayerScores = () => {
  const { gameState, playAgain } = useContext(GameContext)
  const { score } = gameState

  return (
    <div className="result--wrapper">
      <div className="result--score">
        <h3>Your total score is</h3>
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
