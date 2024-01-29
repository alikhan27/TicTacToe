 import React, {useState} from "react";
 import './Board.css';

 const Board = () => {
    const boardConfig = {
        squares: Array(9).fill({
            value: '',
            disabled: true
        })
    }
    const [board] = useState(boardConfig.squares);

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
    </>
 }
 export default Board;