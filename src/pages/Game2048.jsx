import React, { useState } from 'react';
import Tile from '../Tile';
export default function Game2048() {

  const [grid, setGrid] = useState(createEmptyGrid());

  function createEmptyGrid() {
    return Array(4).fill().map(() => Array(4).fill(0));
  }

   function addRandomTile(grid) {
    let emptyCells = [];
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        if (grid[i][j] === 0) {
          emptyCells.push([i, j]);
        }
      }
    }

    if (emptyCells.length === 0) return grid;

    const [row, col] = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    const value = Math.random() < 0.9 ? 2 : 4;
    grid[row][col] = value;
    return [...grid];
  }

  function createEmptyGridWithTiles() {
    let g = createEmptyGrid();
    g = addRandomTile(g);
    g = addRandomTile(g);
    return g;
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