import React, { useContext } from "react"
import { GameContext } from "../contexts/GameContext"

export const FeedbackQuote = ({ thisRound }) => {
  const { gameState, feedbackQuotes } = useContext(GameContext)
  const { finished, score } = gameState

  let feedback = ""

  switch (true) {
    case !finished && thisRound < 10:
      feedback = feedbackQuotes.round[1]
      break
    case !finished && thisRound < 30:
      feedback = feedbackQuotes.round[2]
      break
    case !finished && thisRound < 75:
      feedback = feedbackQuotes.round[3]
      break
    case !finished && thisRound < 150:
      feedback = feedbackQuotes.round[4]
      break
    case !finished && thisRound < 300:
      feedback = feedbackQuotes.round[5]
      break
    case finished && score < 100:
      feedback = feedbackQuotes.post[1]
      break
    case finished && score < 200:
      feedback = feedbackQuotes.post[2]
      break
    case finished && score < 400:
      feedback = feedbackQuotes.post[3]
      break
    case finished && score < 600:
      feedback = feedbackQuotes.post[4]
      break
    case finished && score < 800:
      feedback = feedbackQuotes.post[5]
      break
    default:
      feedback = "I have no words for you."
  }

  return <h1 style={{color: "white"}}>{feedback}</h1>
}
