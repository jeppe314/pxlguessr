import React from "react"
import { Btn } from "./Btn"

import { Title } from "./Title"

export const Start = () => {
  return (
    <div className="start">
      <div className="start--content">
        <Title />
        <p>
          Welcome to Pixactly. An online tool that tests how well you
          know your pixels. Draw a box that matches the dimensions
          given and receive a score based on how close you are. The
          lower the score... the better! Sounds easy, right? Pixactly.
        </p>
        <Btn>Start Game</Btn>
      </div>
    </div>
  )
}
