import { useState } from 'react';
import './TicTacToe.css'; 
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

export default function TicTacToe() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = `Победитель: ${winner}`;
  } else if (squares.every(square => square !== null)) {
    status = 'Ничья!';
  } else {
    status = `Очередь: ${xIsNext ? 'X' : 'O'}`;
  }

  function handleClick(index) {
    if (squares[index] || winner) return;

    const newSquares = squares.slice();
    newSquares[index] = xIsNext ? 'X' : 'O';
    setSquares(newSquares);
    setXIsNext(!xIsNext);
  }

  return (
    <div className="tic-tac-toe">
      <h1>Добро пожаловать в игру Крестики-нолики</h1>
      <div className="status">{status}</div>
      <div className="board">
        {squares.map((value, index) => (
          <button
            key={index}
            onClick={() => handleClick(index)}
          >
            {value}
          </button>
        ))}
      </div>
      <button
        className="reset-button"
        onClick={() => {
          setSquares(Array(9).fill(null));
          setXIsNext(true);
        }}
      >
        Начать заново
      </button>
    </div>
  );
}