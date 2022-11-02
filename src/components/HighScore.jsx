import React, { useEffect, useContext, useState } from "react"
import { db } from "../firebase"
import { doc, getDoc } from "firebase/firestore"
import { GameContext } from "../contexts/GameContext"
import { nanoid } from "nanoid"

export const HighScore = () => {
  const { gameState } = useContext(GameContext)
  const [highscores, setHighscores] = useState({})

  useEffect(() => {
    const getScores = async () => {
      const usersRef = doc(db, "scores", "users")
      const docSnap = await getDoc(usersRef)
      try {
        if (docSnap.exists()) {
          console.log("Document data:", docSnap.data())
          setHighscores(docSnap.data())
        } else {
          console.log("No such document!")
        }
      } catch (err) {
        console.log("error" + err)
      }
    }
    getScores()
  }, [])

  let listEl
  listEl = highscores.scores?.map((user) => {
    return <li key={nanoid()}>{user.name + user.score}</li>
  })

  return (
    <div className="highscore">
      <h1>High Scores</h1>
      <h2>Top 100</h2>
      <ul className="highscore--list">{listEl}</ul>
    </div>
  )
}
