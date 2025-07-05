import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Card from '../Components/Card';
import {
  incrementClickCount,
  resetClickCount,
  saveCurrentGame,
  flipCard,
  unflipCard,
  matchCards,
  startNewGame,
  setGameOver,
  clearCurrentGame
} from '../store/slice';

import {
  FcAlarmClock,
  FcBinoculars,
  FcCellPhone,
  FcCloseUpMode,
  FcCamcorderPro,
  FcInTransit,
  FcLinux,
  FcHome,
} from "react-icons/fc";

function createCardMatrix(icons, columns) {
  const cardData = [];
  for (let i = 0; i < icons.length; i++) {
    cardData.push({
      id: i * 2,
      isFlipped: false,
      isMatched: false,
      iconIndex: i,
    });
    cardData.push({
      id: i * 2 + 1,
      isFlipped: false,
      isMatched: false,
      iconIndex: i,
    });
  }

  const shuffled = [...cardData];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  const matrix = [];
  for (let i = 0; i < shuffled.length; i += columns) {
    matrix.push(shuffled.slice(i, i + columns));
  }

  return matrix;
}

export default function Game() {
  const icons = [
    FcAlarmClock,
    FcBinoculars,
    FcCellPhone,
    FcCloseUpMode,
    FcCamcorderPro,
    FcInTransit,
    FcLinux,
    FcHome,
  ];
  const columns = 4;

  const dispatch = useDispatch();

  const matrix = useSelector((state) => state.game.matrix);
  const clickCount = useSelector((state) => state.game.clickCount);
  const startTime = useSelector((state) => state.game.startTime);
  const gameOver = useSelector((state) => state.game.gameOver);
  const flippedCards = useSelector((state) => state.game.flippedCards);

  const [blockInteraction, setBlockInteraction] = useState(false);
  const [showRecords, setShowRecords] = useState(false);

  // Инициализация игры при первом рендере
  useEffect(() => {
    if (matrix.length === 0) {
      startNewGameHandler();
    }
  }, []);

  // Обработка совпадения карт
  useEffect(() => {
    if (flippedCards.length === 2 && !blockInteraction) {
      setBlockInteraction(true);
      const [first, second] = flippedCards;
      const firstCard = matrix[first.row][first.col];
      const secondCard = matrix[second.row][second.col];

      if (firstCard.iconIndex === secondCard.iconIndex) {
        setTimeout(() => {
          dispatch(matchCards({ first, second }));
          setBlockInteraction(false);
      
        }, 500);
      } else {
        setTimeout(() => {
          dispatch(unflipCard(first));
          dispatch(unflipCard(second));
          setBlockInteraction(false);
        }, 1000);
      }
    }
  }, [flippedCards, blockInteraction, dispatch, matrix]);

  // Инициализация новой игры
  function startNewGameHandler() {
    dispatch(resetClickCount());
    const rawMatrix = createCardMatrix(icons, columns);
    const serializableMatrix = rawMatrix.map(row =>
      row.map(card => ({
        id: card.id,
        isFlipped: card.isFlipped,
        isMatched: card.isMatched,
        iconIndex: card.iconIndex,
      }))
    );

    dispatch(setGameOver(false));
    dispatch(clearCurrentGame());
    dispatch(startNewGame({
      matrix: serializableMatrix,
      flippedCards: [],
      startTime: Date.now(),
      gameOver: false,
      clickCount: 0,
    }));
  }

  function handleSaveGame() {
    const gameState = {
      matrix,
      flippedCards,
      startTime,
      gameOver,
      clickCount
    };
    localStorage.setItem('savedMemoryGame', JSON.stringify(gameState));
    alert('Игра сохранена!');
  }

  function handleLoadGame() {
    const savedGame = localStorage.getItem('savedMemoryGame');
    if (savedGame) {
      dispatch(saveCurrentGame(JSON.parse(savedGame)));
      alert('Игра загружена!');
    } else {
      alert('Нет сохраненной игры!');
    }
  }

function saveRecord(time) { 
  const records = getRecords();
  records.push({ time, date: new Date().toISOString() });
  localStorage.setItem('memory-game-records', JSON.stringify(records));
}

  function getRecords() {
    const stored = localStorage.getItem('memory-game-records');
    return stored ? JSON.parse(stored) : [];
  }

function checkGameCompletion() {
  if (!Array.isArray(matrix)) return;

  const flatMatrix = matrix.flat();
  const allMatched = flatMatrix.every(card => card?.isMatched);

  // Добавляем дебаг
  if (!allMatched) {
    console.log('⚠️ Не все карты совпали:');
    flatMatrix.forEach((card, index) => {
      if (!card.isMatched) {
        console.log(`Карта ${index} не совпала:`, card);
      }
    });
  }

  if (allMatched && !gameOver) {
    const endTime = Date.now();
    const timeTaken = Math.floor((endTime - startTime) / 1000);
    saveRecord(timeTaken);
    dispatch(setGameOver(true));
    console.log("✅ Игра завершена! Time taken:", timeTaken);
  } else if (allMatched) {
    console.log("🏁 Игра уже завершена.");
  } else {
    console.log("❌ Не все карты совпали:", { allMatched });
  }
}

  function handleCardClick(rowIndex, colIndex) {
    if (blockInteraction) return;
    
    const card = matrix[rowIndex][colIndex];
    if (card.isFlipped || card.isMatched || flippedCards.length >= 2) return;

    dispatch(incrementClickCount());
    dispatch(flipCard({ rowIndex, colIndex }));
  }

  return (
    <div className='app'>
      <button onClick={startNewGameHandler}>Новая игра</button>
      <button onClick={handleSaveGame}>Сохранить игру</button>
      <button onClick={handleLoadGame}>Загрузить игру</button>

      <button onClick={() => setShowRecords(!showRecords)}>
        {showRecords ? 'Скрыть рекорды' : 'Показать рекорды'}
      </button>

      {showRecords && (
        <div className="records-table">
          <h2>Таблица рекордов</h2>
          <ul>
            {getRecords()
              .sort((a, b) => a.time - b.time)
              .slice(0, 10)
              .map((record, index) => (
                <li key={index}>
                  {record.time} секунд — {new Date(record.date).toLocaleString()}
                </li>
              ))}
          </ul>
          <button onClick={() => {
            localStorage.removeItem('memory-game-records');
            setShowRecords(false);
          }}>
            Очистить рекорды
          </button>
        </div>
      )}

      <div className="matrix-container">
        {matrix.map((row, rowIndex) => (
          <div key={`row-${rowIndex}`} className="row">
            {row.map((card, colIndex) => (
              <Card
                key={`card-${card.id}`}
                card={card}
                icon={icons[card.iconIndex]}
                onClick={() => handleCardClick(rowIndex, colIndex)}
              />
            ))}
          </div>
        ))}
      </div>

      <div className="current-game">
        <h3>Текущая игра:</h3>
        <p>Ходы: {clickCount}</p>
        <p>Статус: {gameOver === true ? 'Игра окончена' : 'Игра активна'} (gameOver={String(gameOver)})</p>
        <p>Время начала: {startTime ? new Date(startTime).toLocaleTimeString() : '-'}</p>
      </div>
    </div>
  );
}