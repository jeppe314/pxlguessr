import "./style.scss"
import { useContext } from "react"
import { Start } from "./components/Start"
import { Game } from "./components/Game"
import { Header } from "./components/Header"
import { GameContext } from "./contexts/GameContext"
import { Title } from "./components/Title"
import { Result } from "./components/Result"
import { Modal } from "./components/Modal"

function App() {
    const { state } = useContext(GameContext)
    const { started, gameLength, round, showPost } = state

    return (
        <div className="container">
            <Title />
            <div>
                <Modal showModal={state.showModal} />
            </div>
            {started && round <= gameLength ? (
                <div className="wrapper">
                    <Header />
                    <Game />
                </div>
            ) : showPost ? (
                <Result />
            ) : (
                <Start />
            )}
        </div>
    )
}

export default App
