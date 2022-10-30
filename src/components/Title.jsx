import React, { useContext } from "react"
import { GameContext } from "../contexts/GameContext"

export const Title = () => {
  const { start } = useContext(GameContext)
  return <h1 className={`title ${start && "top"}`}>PxlGuessr</h1>
}
