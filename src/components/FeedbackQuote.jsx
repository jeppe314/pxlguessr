import React, { useContext } from "react"
import { GameContext } from "../contexts/GameContext"

export const FeedbackQuote = ({ thisRound }) => {
    const { state, feedbackQuotes } = useContext(GameContext)
    const { finished, score, showPost, round, gameLength } = state

    let feedback = ""

    switch (true) {
        case round <= gameLength && thisRound < 10:
            feedback = feedbackQuotes.round[1]
            break
        case round <= gameLength && thisRound < 30:
            feedback = feedbackQuotes.round[2]
            break
        case round <= gameLength && thisRound < 75:
            feedback = feedbackQuotes.round[3]
            break
        case round <= gameLength && thisRound < 150:
            feedback = feedbackQuotes.round[4]
            break
        case round <= gameLength && thisRound < 300:
            feedback = feedbackQuotes.round[5]
            break
        case showPost && score < 100:
            feedback = feedbackQuotes.post[1]
            break
        case showPost && score < 200:
            feedback = feedbackQuotes.post[2]
            break
        case showPost && score < 400:
            feedback = feedbackQuotes.post[3]
            break
        case showPost && score < 600:
            feedback = feedbackQuotes.post[4]
            break
        case showPost && score < 800:
            feedback = feedbackQuotes.post[5]
            break
        default:
            feedback = "You tried!"
    }

    return <h2>{feedback}</h2>
}
