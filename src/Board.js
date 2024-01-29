 import React, {useState} from "react";
 import './Board.css';

 const Board = () => {
    const boardConfig = {
        squares: Array(9).fill({
            value: '',
            disabled: true
        }),
        playerONEPlaying: "Player ONE turn now...",
    }
    const [board, updateBoard] = useState(boardConfig.squares);
    const [msg, setMsg] = useState('');
    const handleStartGame = () => {
        let newboard = board.map((square) => {
            square.disabled = false;
            return square;
        }
        )
        updateBoard(newboard);
        setMsg(boardConfig.playerONEPlaying)
    }
    
    return <>
        <h1>Tic Tac Toe</h1>
        <div className="board">
            {board.map((square, index) => {
                return (
                    <button key={index} disabled={square?.disabled} className="square" data-testid="column">
                        {square?.value}
                    </button>
                )
            })}
        </div>
        <div className="message"><h2>{msg}</h2></div>
        <div className="buttons">
            <button className="btn-start" data-testid="btn-start" onClick={handleStartGame}>Start</button>
            <button className="btn-reset" data-testid="btn-reset">Reset</button>
        </div>
    </>
 }
 export default Board;