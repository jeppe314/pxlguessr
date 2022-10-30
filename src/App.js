import "./style.scss"
import { useContext } from "react"
import { Start } from "./components/Start"
import { Game } from "./components/Game"
import { Header } from "./components/Header"
import { GameContext } from "./contexts/GameContext"

function App() {
  const { start, setStart } = useContext(GameContext)

  return (
    <div className="container">
      {start ? (
        <div className="wrapper">
          <Header />
          <Game />
        </div>
      ) : (
        <Start />
      )}
    </div>
  )
}

export default App
