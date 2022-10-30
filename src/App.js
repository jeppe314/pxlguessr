import "./style.scss"
import { useContext } from "react"
import { Start } from "./components/Start"
import { Game } from "./components/Game"
import { Header } from "./components/Header"
import { GameContext } from "./contexts/GameContext"
import { Title } from "./components/Title"

function App() {
  const { gameState } = useContext(GameContext)
  const { started } = gameState

  return (
    <div className="container">
      <Title />
      {started ? (
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
