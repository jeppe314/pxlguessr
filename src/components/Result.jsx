import React from "react"

import { HighScore } from "./HighScore"
import { PlayerScores } from "./PlayerScores"

export const Result = () => {
  return (
    <div className="result">
      {/* <div className="result--box"> */}
        <PlayerScores />
        <HighScore />
      {/* </div> */}
    </div>
  )
}
