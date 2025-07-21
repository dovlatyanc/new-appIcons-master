
import React, { useState, useEffect } from 'react';
import Tile from '../Tile';

export default function Game2048() {
  const [grid, setGrid] = useState(createEmptyGridWithTiles());

  // Создаёт пустую сетку 4x4
  function createEmptyGrid() {
    return Array(4).fill().map(() => Array(4).fill(0));
  }

  // Добавляет одну случайную плитку (2 или 4)
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

  // Создаёт сетку с 2 случайными плитками
  function createEmptyGridWithTiles() {
    let g = createEmptyGrid();
    g = addRandomTile(g);
    g = addRandomTile(g);
    return g;
  }

  // Логика движения вправо
  function moveRight() {
    let newGrid = JSON.parse(JSON.stringify(grid));

    for (let row = 0; row < 4; row++) {
      let line = newGrid[row].filter(val => val !== 0);
      for (let i = line.length - 1; i >= 1; i--) {
        if (line[i] === line[i - 1]) {
          line[i] *= 2;
          line[i - 1] = 0;
        }
      }

      line = line.filter(val => val !== 0);
      while (line.length < 4) line.unshift(0);

      newGrid[row] = line;
    }

    if (JSON.stringify(newGrid) !== JSON.stringify(grid)) {
      newGrid = addRandomTile(newGrid);
      setGrid(newGrid);
    }
  }

  // Логика движения влево
  function moveLeft() {
    let newGrid = JSON.parse(JSON.stringify(grid));

    for (let row = 0; row < 4; row++) {
      let line = newGrid[row].filter(val => val !== 0);

      for (let i = 0; i < line.length - 1; i++) {
        if (line[i] === line[i + 1]) {
          line[i] *= 2;
          line[i + 1] = 0;
        }
      }

      line = line.filter(val => val !== 0);
      while (line.length < 4) line.push(0);

      newGrid[row] = line;
    }

    if (JSON.stringify(newGrid) !== JSON.stringify(grid)) {
      newGrid = addRandomTile(newGrid);
      setGrid(newGrid);
    }
  }

  // Логика движения вверх
  function moveUp() {
    let newGrid = JSON.parse(JSON.stringify(grid));

    for (let col = 0; col < 4; col++) {
      let column = [newGrid[0][col], newGrid[1][col], newGrid[2][col], newGrid[3][col]];
      column = column.filter(val => val !== 0);

      for (let i = 0; i < column.length - 1; i++) {
        if (column[i] === column[i + 1]) {
          column[i] *= 2;
          column[i + 1] = 0;
        }
      }

      column = column.filter(val => val !== 0);
      while (column.length < 4) column.push(0);

      for (let i = 0; i < 4; i++) {
        newGrid[i][col] = column[i];
      }
    }

    if (JSON.stringify(newGrid) !== JSON.stringify(grid)) {
      newGrid = addRandomTile(newGrid);
      setGrid(newGrid);
    }
  }

  // Логика движения вниз
  function moveDown() {
    let newGrid = JSON.parse(JSON.stringify(grid));

    for (let col = 0; col < 4; col++) {
      let column = [newGrid[0][col], newGrid[1][col], newGrid[2][col], newGrid[3][col]];
      column = column.filter(val => val !== 0);

      for (let i = column.length - 1; i >= 1; i--) {
        if (column[i] === column[i - 1]) {
          column[i] *= 2;
          column[i - 1] = 0;
        }
      }

      column = column.filter(val => val !== 0);
      while (column.length < 4) column.unshift(0);

      for (let i = 0; i < 4; i++) {
        newGrid[i][col] = column[i];
      }
    }

    if (JSON.stringify(newGrid) !== JSON.stringify(grid)) {
      newGrid = addRandomTile(newGrid);
      setGrid(newGrid);
    }
  }

  // Проверка победы
  useEffect(() => {
    if (grid.some(row => row.includes(2048))) {
      alert("Победа!");
    }
  }, [grid]);

  // Обработчик нажатий клавиш
  useEffect(() => {
    const handleKeyDown = (e) => {
      switch (e.key) {
        case 'ArrowUp':
          moveUp();
          break;
        case 'ArrowDown':
          moveDown();
          break;
        case 'ArrowLeft':
          moveLeft();
          break;
        case 'ArrowRight':
          moveRight();
          break;
        default:
          return;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [grid]);

  return (
    <div>
      <h1>2048</h1>
      <div className="game2048-container">
        <div className="grid2048">
          {grid.map((row, rowIndex) =>
            row.map((cell, colIndex) => (
              <Tile key={`${rowIndex}-${colIndex}`} value={cell} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}