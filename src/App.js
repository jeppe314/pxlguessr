import "./style.scss"
import { useContext } from "react"
import { Start } from "./components/Start"
import { Game } from "./components/Game"
import { Header } from "./components/Header"
import { GameContext } from "./contexts/GameContext"
import { Title } from "./components/Title"
import { Result } from "./components/Result"

function App() {
  const { gameState } = useContext(GameContext)
  const { started, gameLength, round } = gameState

  return (
    <div className="container">
      <Title />
      {started && round <= gameLength ? (
        <div className="wrapper">
          <Header />
          <Game />
        </div>
      ) : started && round > gameLength ? (
        <Result />
      ) : (
        <Start />
      )}
    </div>
  )
}

export default App
