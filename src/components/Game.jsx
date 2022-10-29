import React from "react"

export const Game = () => {
  const pos = {
    x: 0,
    y: 0,
  }

  return (
    <div
      className="game"
      onPointerDown={() => console.log("DOWN")}
      onPointerUp={() => console.log("UP")}
      onPointerMove={(e) => console.log(e.screenX)}
    >
      Game
    </div>
  )
}
