import React, { useState } from 'react';

export default function Game2048() {

  const [grid, setGrid] = useState(createEmptyGrid());

  function createEmptyGrid() {
    return Array(4).fill().map(() => Array(4).fill(0));
  }
    return  <div>
              <h1>2048</h1>
              <div className="game2048-container">
              <div className="grid2048">
                {grid.map((row, rowIndex) =>
                  row.map((cell, colIndex) => (
                    <div key={`${rowIndex}-${colIndex}`} className="tile">
                      {cell}
                    </div>
                  ))
                )}
              </div>
            </div>
           </div>
}