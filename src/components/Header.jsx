import React from "react"
import { Title } from "./Title"

export const Header = () => {
  return (
    <div className="header">
      <div>
        <p>Round 1/5</p>
      </div>
      <div className="header--mid">
        <Title />
        <div className="header--target">
          <p>Width: 25px</p>
          <p>Height: 35px</p>
        </div>
      </div>
      <div>
        <p>Total score: 0</p>
      </div>
    </div>
  )
}
