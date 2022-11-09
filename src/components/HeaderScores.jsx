import React, { useContext, useState } from "react"
import { IoMdArrowDropdown } from "react-icons/io"
import { Btn } from "./Btn"
import CountUp from "react-countup"
import { GameContext } from "../contexts/GameContext"

export const HeaderScores = () => {
    const { state } = useContext(GameContext)
    const { roundScores, score } = state
    const [dropdown, setDropdown] = useState(false)

    return (
        <div className="header--scores">
            <Btn
                style={{ borderRadius: "5px", padding: ".5em" }}
                handleClick={() => setDropdown(!dropdown)}
            >
                <IoMdArrowDropdown style={{ display: "flex" }} />
            </Btn>
            <div
                className={`dropdown ${dropdown && "anim--dropdown"}`}
                style={dropdown ? { display: "block" } : { display: "none" }}
            >
                <ul>
                    <li>
                        Round 1: {""}
                        <span>{roundScores[0] > 0 ? roundScores[0] : "-"}</span>
                    </li>
                    <li>
                        Round 2: {""}
                        <span>{roundScores[1] > 0 ? roundScores[1] : "-"}</span>
                    </li>{" "}
                    <li>
                        Round 3: {""}
                        <span>{roundScores[3] > 0 ? roundScores[2] : "-"}</span>
                    </li>{" "}
                    <li>
                        Round 4: {""}
                        <span>{roundScores[4] > 0 ? roundScores[3] : "-"}</span>
                    </li>{" "}
                    <li>
                        Round 5: {""}
                        <span>{roundScores[5] > 0 ? roundScores[4] : "-"}</span>
                    </li>
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
    )
}
