import React from "react"

import { HighScore } from "./HighScore"
import { PlayerScores } from "./PlayerScores"

export const Result = () => {
  return (
    <div className="result">
        <PlayerScores />
        <HighScore />
    </div>
  )
}
