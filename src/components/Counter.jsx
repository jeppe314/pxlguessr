import React, { useEffect, useState, useContext } from "react"
import { GameContext } from "../contexts/GameContext"

export const Counter = ({ min, max }) => {
  const { gameState } = useContext(GameContext)
  const [counter, setCounter] = useState(min)

  useEffect(() => {
    const interval = setInterval(() => {
      console.log("running")
      if (min < max) {
        setCounter(counter + 1)
      } else return
    }, 500)

    return () => {
      clearInterval(interval)
    }
  })

  return <div>{counter}</div>
}
