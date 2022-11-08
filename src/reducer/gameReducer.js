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
    targetHeights: [], //RANDOMI NT FUNC
    targetWidths: [], //RANDOM INT FUNC
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
        case ACTION_TYPES.MOUSE_UP:
            return {
                ...state,
                mouseDown: false,
            }
        case ACTION_TYPES.MOUSE_DOWN:
            return {
                ...state,
                mouseDown: true,
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
                showPost: state.finished ? true : false,
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
                targetHeights: 50,
                targetWidths: 50,
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
                    left: action.payload.x,
                    top: action.payload.y,
                    initialTop: action.payload.y - action.payload.topHeight,
                },
                boxStyles: {
                    width: "0px",
                    height: "0px",
                    left: action.payload,
                    top: action.payload.y - action.payload.topHeight,
                },
            }
        case ACTION_TYPES.BOX_MOVE:
            return {
                boxStyles: {
                    top:
                        action.payload.relY >= 0
                            ? state.rect.initialTop
                            : state.rect.initialTop -
                              Math.abs(action.payload.relY),
                    left:
                        action.payload.relX >= 0
                            ? action.payload.x - action.payload.relX
                            : action.payload.x -
                              action.payload.relX -
                              Math.abs(action.payload.relX),
                    width: Math.abs(action.payload.relX),
                    height: Math.abs(action.payload.relY),
                },
            }
        case ACTION_TYPES.BOX_STOP:
            return {
                ...state,
                guessed: true,
                widthGuesses: [...state.widthGuesses, state.boxStyles.width],
                heightGuesses: [...state.heightGuesses, state.boxStyles.height],
                finished: state.round >= state.gameLength ? true : false,
                started: state.round > state.gameLength ? false : true,
                targetBoxStyles: {
                    ...state.targetBoxStyles,
                    width: action.payload.width,
                    height: action.payload.height,
                    top: state.boxStyles.top,
                    left: state.boxStyles.left,
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
