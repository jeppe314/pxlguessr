import { nanoid } from "nanoid"
import { ACTION_TYPES } from "./ACTION_TYPES"

export const INITIAL_STATE = {
    uid: nanoid(),
    name: "",
    finished: false,
    showPost: false,
    started: false,
    guessed: false,
    gameLength: 5,
    round: 1,
    targetHeights: randomIntFromInterval(20, 400, 5),
    targetWidths: randomIntFromInterval(20, 400, 5),
    widthGuesses: [],
    heightGuesses: [],
    widthDiff: [],
    heightDiff: [],
    roundScores: [],
    score: 0,
    boxStyles: {},
    targetBoxStyles: {},
    err: false,
    mouseDown: false,
    rect: {},
    loading: false,
    showModal: false,
}

export const gameReducer = (state, action) => {
    switch (action.type) {
        case ACTION_TYPES.ERROR:
            return {
                ...state,
                err: true,
            }
        case ACTION_TYPES.LOADING:
            return {
                ...state,
                loading: true,
            }
        case ACTION_TYPES.MODAL_SHOW:
            return {
                ...state,
                showModal: true,
            }
        case ACTION_TYPES.MODAL_HIDE:
            return {
                ...state,
                showModal: false,
            }
        case ACTION_TYPES.GAME_START:
            return {
                ...state,
                started: true,
                name: "FIXME",
            }
        case ACTION_TYPES.NEXT_ROUND:
            return {
                ...state,
                showPost: finished ? true : false,
                guessed: false,
                round: state.round + 1, //state.round or just round?
                boxStyles: {
                    ...state.boxStyles,
                    width: 0,
                    height: 0,
                },
                targetBoxStyles: {
                    width: 0,
                    height: 0,
                    top: 0,
                    left: 0,
                    border: "none",
                },
            }
        case ACTION_TYPES.PLAY_AGAIN:
            return {
                ...state,
                started: true,
                finished: false,
                showPost: false,
                round: 1,
                score: 0,
                roundScores: [],
                targetHeights: randomIntFromInterval(20, 400, 5),
                targetWidths: randomIntFromInterval(20, 400, 5),
                widthGuesses: [],
                heightGuesses: [],
                widthDiff: [],
                heightDiff: [],
            }
        case ACTION_TYPES.BOX_START:
            return {
                ...state,
                mouseDown: true,
                rect: {
                    left: e.clientX,
                    top: e.clientY,
                    initialTop: e.clientY - el.top,
                },
                boxStyles: {
                    width: "0px",
                    height: "0px",
                    left: e.clientX,
                    top: e.clientY - el.top,
                },
            }
        case ACTION_TYPES.BOX_MOVE:
            return {
                boxStyles: {
                    top:
                        relY >= 0
                            ? rect.initialTop
                            : rect.initialTop - Math.abs(relY),
                    left:
                        relX >= 0
                            ? e.clientX - relX
                            : e.clientX - relX - Math.abs(relX),
                    width: Math.abs(relX),
                    height: Math.abs(relY),
                },
            }
        case ACTION_TYPES.BOX_STOP:
            return {
                ...state,
                guessed: true,
                widthGuesses: [...prev.widthGuesses, boxStyles.width],
                heightGuesses: [...prev.heightGuesses, boxStyles.height],
                finished: prev.round >= prev.gameLength ? true : false,
                started: prev.round > prev.gameLength ? false : true,
                targetBoxStyles: {
                    ...state.targetBoxStyles,
                    width: targetWidths[curr],
                    height: targetHeights[curr],
                    top: boxStyles.top,
                    left: boxStyles.left,
                    border: "3px dashed white",
                },
            }
        case ACTION_TYPES.BOX_RESET:
            return {
                ...state,
            }
        case ACTION_TYPES.GO_HOME:
            return INITIAL_STATE
        default:
            return INITIAL_STATE
    }
}
