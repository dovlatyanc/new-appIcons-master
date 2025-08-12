import { useState } from 'react';

export default function TicTacToe() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  return (
    <div>
      <h1>Добро пожаловать в игру Крестики-нолики</h1>
      <div>Очередь: {xIsNext ? 'X' : 'O'}</div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 100px)', gap: '2px', margin: '20px' }}>
        {squares.map((value, index) => (
          <button
            key={index}
            onClick={() => handleClick(index)}
            style={{
              width: '100px',
              height: '100px',
              fontSize: '24px',
              border: '1px solid black',
              backgroundColor: '#f0f0f0'
            }}
          >
            {value}
          </button>
        ))}
      </div>
    </div>
  );
}