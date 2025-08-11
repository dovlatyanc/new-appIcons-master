
import React, { useState, useEffect } from 'react';
import Tile from '../Tile';

export default function Game2048() {
const [score, setScore] = useState(0);
const [gameOver, setGameOver] = useState(false);
const [gameWon, setGameWon] = useState(false);

const [grid, setGrid] = useState(() => {
  let initial = Array(4).fill().map(() => Array(4).fill(0));
  initial = spawnTile(initial);
  initial = spawnTile(initial);
  return initial;
});
  
function spawnTile(grid) {
  const newGrid = JSON.parse(JSON.stringify(grid));
  const emptyCells = [];

  // Найти все пустые ячейки
  for (let row = 0; row < 4; row++) {
    for (let col = 0; col < 4; col++) {
      if (newGrid[row][col] === 0) {
        emptyCells.push({ row, col });
      }
    }
  }

  if (emptyCells.length > 0) {
    const { row, col } = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    newGrid[row][col] = Math.random() < 0.9 ? 2 : 4;
  }

  return newGrid;
}
  // Сравнивает два массива
  function arraysEqual(a, b) {
    return a.length === b.length && a.every((val, index) => val === b[index]);
  }

  // Обрабатывает строку или столбец
  function processLine(line, reverseBefore = false, reverseAfter = false) {
    let filtered = line.filter(val => val !== 0);
    if (reverseBefore) filtered = [...filtered].reverse();

    const merged = [];
    for (let i = 0; i < filtered.length; i++) {
      if (i < filtered.length - 1 && filtered[i] === filtered[i + 1]) {
        merged.push(filtered[i] * 2);
        i++;
      } else {
        merged.push(filtered[i]);
      }
    }

    while (merged.length < 4) {
      merged.push(0);
    }

    if (reverseAfter) {
      merged.reverse();
    }

    return merged;
  }

  // Обработчик движения
  function handleMove(direction) {
  if (gameOver) return;

  const newGrid = JSON.parse(JSON.stringify(grid));
  let changed = false;
  let gainedScore = 0;

  switch (direction) {
    case 'ArrowLeft':
      for (let row = 0; row < 4; row++) {
        const oldRow = [...newGrid[row]];
        const processed = processLine(newGrid[row], false, false);
        newGrid[row] = processed;

        if (!arraysEqual(oldRow, processed)) {
          changed = true;
        }

        // Подсчёт очков
        processed.forEach((val, i) => {
          if (val !== oldRow[i] && val === oldRow[i] * 2) {
            gainedScore += val;
          }
        });
      }
      break;

    case 'ArrowRight':
      for (let row = 0; row < 4; row++) {
        const oldRow = [...newGrid[row]];
        const processed = processLine(newGrid[row], true, true);
        newGrid[row] = processed;

        if (!arraysEqual(oldRow, processed)) {
          changed = true;
        }

        processed.forEach((val, i) => {
          if (val !== oldRow[i] && val === oldRow[i] * 2) {
            gainedScore += val;
          }
        });
      }
      break;

    case 'ArrowUp':
      for (let col = 0; col < 4; col++) {
        const column = [newGrid[0][col], newGrid[1][col], newGrid[2][col], newGrid[3][col]];
        const oldCol = [...column];
        const processed = processLine(column, false, false);

        for (let row = 0; row < 4; row++) {
          newGrid[row][col] = processed[row];
        }

        if (!arraysEqual(oldCol, processed)) {
          changed = true;
        }

        processed.forEach((val, i) => {
          if (val !== oldCol[i] && val === oldCol[i] * 2) {
            gainedScore += val;
          }
        });
      }
      break;

    case 'ArrowDown':
      for (let col = 0; col < 4; col++) {
        const column = [newGrid[0][col], newGrid[1][col], newGrid[2][col], newGrid[3][col]];
        const oldCol = [...column];
        const processed = processLine(column, true, true);

        for (let row = 0; row < 4; row++) {
          newGrid[row][col] = processed[row];
        }

        if (!arraysEqual(oldCol, processed)) {
          changed = true;
        }

        processed.forEach((val, i) => {
          if (val !== oldCol[i] && val === oldCol[i] * 2) {
            gainedScore += val;
          }
        });
      }
      break;
  }

  if (changed) {
    setScore(prev => prev + gainedScore);

    const nextGrid = spawnTile(newGrid);
    setGrid(nextGrid);

    // Проверка на победу
    if (!gameWon && nextGrid.some(row => row.includes(2048))) {
      setGameWon(true);
    }

    // Проверка на game over
    if (isGameOver(nextGrid)) {
      setGameOver(true);
    }
  }
}

  // Обработчик клавиш
  useEffect(() => {
    const handleKeyDown = (e) => {
      e.preventDefault();
      switch (e.key) {
        case 'ArrowUp': handleMove('ArrowUp'); break;
        case 'ArrowDown': handleMove('ArrowDown'); break;
        case 'ArrowLeft': handleMove('ArrowLeft'); break;
        case 'ArrowRight': handleMove('ArrowRight'); break;
        default: return;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [grid]);

  return (
    <div className="game-container">
   
      <div className="grid">
        {grid.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <Tile key={`${rowIndex}-${colIndex}`} value={cell} />
          ))
        )}
      </div>
    </div>
  );
}