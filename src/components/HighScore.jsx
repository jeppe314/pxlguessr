import React, { useEffect, useContext, useState } from "react"
import { db } from "../firebase"
import { doc, getDoc } from "firebase/firestore"
import { GameContext } from "../contexts/GameContext"
import { nanoid } from "nanoid"
import { Spinner } from "./Spinner"

export const HighScore = () => {
  const { gameState, loading, setLoading } = useContext(GameContext)
  const [highscores, setHighscores] = useState({})

  useEffect(() => {
    const getScores = async () => {
      setLoading(true)
      console.log("laddar")
      const usersRef = doc(db, "scores", "users")
      const docSnap = await getDoc(usersRef)
      try {
        if (docSnap.exists()) {
          setHighscores(docSnap.data())
        } else {
          console.log("No such document!")
        }
      } catch (err) {
        console.log("error" + err)
      }
      setLoading(false)
      console.log("färdigladdat")
    }

    getScores()
  }, [])

  const sorted = highscores.scores?.sort((a, b) => {
    return a.score - b.score
  })

  const listEl = sorted?.slice(0, 100).map((user) => {
    return (
      <li
        key={nanoid()}
        className="highscore--item"
        style={{
          backgroundColor:
            gameState.uid === user.uid ? "rgb(70, 24, 24)" : "",
        }}
      >
        <p className="highscore--name">
          {highscores.scores.indexOf(user) + 1}. {user.name}
        </p>
        <div className="dots"></div>
        <p className="highscore--score">{user.score}</p>
      </li>
    )
  })

  return (
    <div className="highscore">
      <h2>Top 100</h2>
      {loading ? (
        <Spinner loading={loading} />
      ) : (
        <ul className="highscore--list">{listEl}</ul>
      )}
    </div>
  )
}
