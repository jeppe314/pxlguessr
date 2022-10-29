import React, { useState, useRef } from "react"
import { createElement } from "react"

export const Game = () => {

  const draw = () => {}

  return (
    <div
      className="game"
      onDrag={() => console.log("dragging lol")}
      onClick={() => draw()}
    >
    </div>
  )
}
