import React, {useState} from "react";
import axios from "axios";

function Square(props) {
    return (
        <button className="square">
            {props.value}
        </button>
    );
}

function Board(props) {
    const [state, setState] = useState(
        {
            squares: Array(9).fill(null).map((_, i) => i),
            gridSize: 4,
            gameConfig:
                {
                    "gridSize": 4, "commands": "UDRR", "zombie": {
                        "x": 1,
                        "y": 2
                    },

                    "creatures": [
                        {"x": 1, "y": 0},
                        {"x": 1, "y": 1}
                    ]
                },
            boardSetup: {
                "creatures": [],
                "zombies": [],
            }
        }
    )

    const handlePlay = e => {
        axios.post(`http://localhost:8080/start`, state.gameConfig)
            .then(res => {
                    setState(prevState => {
                        return {
                            ...prevState, boardSetup: {
                                "creatures": res.data.creatures,
                                "zombies": res.data.zombies,
                            }
                        }
                    })
                }
            )
    }

    const renderSquare = (name) => {
        return (
            <Square
                value={name}
            />
        );
    }

    const renderSquares = (gridSize) => {
        return Array(gridSize).fill(null).map((_, y) => {
            return <div className="board-row">
                {
                    Array(gridSize).fill(null).map((_, x) => {
                            return renderSquare("N")
                    })
                }
            </div>
        })
    }

    const status = 'Zombie Game Console';

    return (
        <div>
            <div className="status">{status}</div>
            <button onClick={handlePlay}>Play</button>
            {renderSquares(state.gridSize)}
        </div>

    );
}

class Game extends React.Component {

    render() {
        return (
            <div className="game">
                <div className="game-board">
                    <Board/>
                </div>
                <div className="game-info">
                    <div>{/* status */}</div>
                    <ol>{/* TODO */}</ol>
                </div>
            </div>
        );
    }
}


export default Game