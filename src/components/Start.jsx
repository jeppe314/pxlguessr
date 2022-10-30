import React from "react"
import { Btn } from "./Btn"

import { Title } from "./Title"

export const Start = () => {
  return (
    <div className="start">
      <div className="start--content">
        <Title />
        <p className="start--content--text">
          Welcome to Pixactly.
          <br />
          An online tool that tests how well you know your pixels.
          <br />
          <br />
          Draw a box that matches the dimensions given and receive a
          score based on how close you are. The lower the score... the
          better! Sounds easy, right?
          <br />
          Pixactly.
        </p>
        <Btn>Start Game</Btn>
      </div>
    </div>
  )
}
