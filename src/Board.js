 import React, {useState, useEffect} from "react";
 import './Board.css';

 const Board = () => {
    const boardConfig = {
        squares: Array(9).fill({
            value: '',
            disabled: true
        }),
        winCombinations: [
            [0,1,2],
            [3,4,5],
            [6,7,8],
            [0,3,6],
            [1,4,7],
            [2,5,8],
            [0,4,8],
            [2,4,6]
        ],
        winnerPlayerONE: "Player ONE is the !!!Winner!!!",
        winnerPlayerTWO: "Player TWO is the !!!Winner!!!",
        playerONEPlaying: "Player ONE turn now...",
        playerTWOPlaying: "Player TWO turn now...",
        matchDraw: "Match is Draw!!"
    }
    const [board, updateBoard] = useState(boardConfig.squares);
    const [msg, setMsg] = useState('');
    const [currentPlayer, setCurrentPlayer] = useState(0);
    const [count, setCount] = useState(0);
    const handleStartGame = () => {
        let newboard = board.map((square) => {
            square.disabled = false;
            return square;
        }
        )
        updateBoard(newboard);
        setMsg(boardConfig.playerONEPlaying)
    }
    const handlePlay = (prop) => {
        let newboard = board.map((square, index) => {

            return square = index === prop ? {
                disabled: true,
                value: currentPlayer ? "O" : "X"
            }
                : square
        }

        )
        updateBoard(newboard);
        setCount(count+1);
        setCurrentPlayer(+!currentPlayer);
        currentPlayer ? setMsg(boardConfig.playerONEPlaying) : setMsg(boardConfig.playerTWOPlaying);

    }
    const findWinner = () => {
        
        const positions = board.map(square => {
            return square.value
        });
        
        boardConfig.winCombinations.forEach(item => {
            const winnerOne = item.every((i) => positions[i] === 'X');
            const winnerTwo = item.every((i) => positions[i] === 'O');
            
            if(winnerOne) {
                setMsg(boardConfig.winnerPlayerONE);
            }
            if(winnerTwo) {
                setMsg(boardConfig.winnerPlayerTWO);
            }
            if(winnerOne || winnerTwo)  {
                freezeBoard();
                return;
            }
            if(count === 9 && !winnerOne && !winnerTwo) {
                setMsg(boardConfig.matchDraw);
            }
        });
        
    }
    const freezeBoard = () => {
        let newboard = board.map((square) => {
            square.disabled = true;
            return square;
        }
        )
        updateBoard(newboard);
    }
    useEffect(() => {
        findWinner();
    }, [msg]);
    return <>
        <h1>Tic Tac Toe</h1>
        <div className="board">
            {board.map((square, index) => {
                return (
                    <button key={index} disabled={square?.disabled} className="square" data-testid="column"
                    onClick={() => {
                        handlePlay(index)
                    }}>
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