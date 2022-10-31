import React, { useContext } from "react"
import { GameContext } from "../contexts/GameContext"
import { IoMdArrowDropdown } from "react-icons/io"
import { Btn } from "./Btn"
import CountUp from "react-countup"

export const Header = () => {
  const { gameState, curr } = useContext(GameContext)
  const { targetHeights, targetWidths, score, roundScores } =
    gameState

  return (
    <div className="header">
      <div className="header--content">
        <div>
          <p>
            <span>Round: </span> {`${gameState.round}/5`}
          </p>
        </div>
        <div className="header--mid">
          <div className="header--target">
            <p>
              <span>Width: </span>
              {targetWidths[curr]}px
            </p>
            <p>
              <span>Height: </span>
              {targetHeights[curr]}px
            </p>
          </div>
        </div>
        <div>
          <div
            style={{
              display: "flex",
              gap: "1em",
              alignItems: "center",
            }}
          >
            <div className="header--scores">
              <Btn style={{ borderRadius: "5px", padding: ".5em" }}>
                <IoMdArrowDropdown style={{ display: "flex" }} />
              </Btn>
              <div className="dropdown">
                <ul>
                  <li>Round 1: {roundScores[0]}</li>
                  <li>Round 2: {roundScores[1]}</li>
                  <li>Round 3: {roundScores[2]}</li>
                  <li>Round 4: {roundScores[3]}</li>
                  <li>Round 5: {roundScores[4]}</li>
                </ul>
              </div>
              <p style={{ color: "#da3c3c" }}>
                <span>Score: </span>
                <CountUp
                  useEasing={true}
                  style={{ color: "#da3c3c" }}
                  duration={2}
                  start={0}
                  end={score}
                  suffix="%"
                />
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
