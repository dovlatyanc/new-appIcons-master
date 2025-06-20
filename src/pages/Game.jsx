import Card from '../Components/Card';

import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { incrementClickCount, resetClickCount, saveCurrentGame, clearCurrentGame } from '../store/slice'


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
  const cardData = [...icons, ...icons].map((IconComponent, index) => ({
    id: index,
    IconComponent,
    isFlipped: false,
    isMatched: false,
    iconName: IconComponent.name || `icon_${index}`
  }));

  // Перемешивание карточек
  const shuffled = [...cardData];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  // Формирование матрицы
  const matrix = [];
  for (let i = 0; i < shuffled.length; i += columns) {
    matrix.push(shuffled.slice(i, i + columns));
  }
  
  return matrix;
}

export default  function Game() {
      const icons = [
        FcAlarmClock, 
        FcBinoculars, 
        FcCellPhone, 
        FcCloseUpMode,
        FcCamcorderPro, 
        FcInTransit, 
        FcLinux, 
        FcHome
      ];
      
      const columns = 4;
      const [matrix, setMatrix] = useState([]);
      const [flippedCards, setFlippedCards] = useState([]);
      const [blockInteraction, setBlockInteraction] = useState(false);
      const [startTime, setStartTime] = useState(null);
      const [gameOver, setGameOver] = useState(false);
      const [showRecords, setShowRecords] = useState(false);
    
      const clickCount = useSelector(
        (state) => state.save_game.clickCount
      )
      const setClickCount = useDispatch()
     
      const dispatch = useDispatch();

      function startNewGame() {

        setClickCount(resetClickCount());
        const newMatrix = createCardMatrix(icons, columns);
        setMatrix(newMatrix);
        setFlippedCards([]);
        setStartTime(Date.now());
        setGameOver(false);

        // Сохраняем начальное состояние игры
        dispatch(saveCurrentGame({
           matrix: newMatrix,
           flippedCards: [],
           startTime: Date.now(),
            gameOver: false,
           clickCount: 0}))
      }
       function handleSaveGame() {
           dispatch(saveCurrentGame({
            matrix: matrix,
             flippedCards: flippedCards,
             startTime: startTime,
             gameOver: gameOver,
             clickCount: clickCount,
  }));
}

          function handleLoadGame(savedGame) {
           if (!savedGame) return;
            setMatrix(savedGame.matrix);
           setFlippedCards(savedGame.flippedCards);
            setStartTime(savedGame.startTime);
             setGameOver(savedGame.gameOver);

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
    
      function checkGameCompletion(updatedMatrix) {
        const allMatched = updatedMatrix.flat().every(card => card.isMatched);
        if (allMatched && !gameOver) {
          const endTime = Date.now();
          const timeTaken = Math.floor((endTime - startTime) / 1000); // секунды
          saveRecord(timeTaken);
          setGameOver(true);
        }
      }
    
      function handleCardClick(rowIndex, colIndex) {
        if (blockInteraction) return;
    
        //setClickCount(prev => prev + 1);
        setClickCount(incrementClickCount())

        const card = matrix[rowIndex][colIndex];
        if (card.isFlipped || card.isMatched || flippedCards.length >= 2) return;
    
        // Переворачиваем карточку
        const newMatrix = [...matrix];
        newMatrix[rowIndex][colIndex] = { ...card, isFlipped: true };
        setMatrix(newMatrix);
    
        const newFlipped = [...flippedCards, { row: rowIndex, col: colIndex }];
        setFlippedCards(newFlipped);
    
        if (newFlipped.length === 2) {
          setBlockInteraction(true);
    
          const [first, second] = newFlipped;
          const firstCard = newMatrix[first.row][first.col];
          const secondCard = newMatrix[second.row][second.col];
    
          if (firstCard.iconName === secondCard.iconName) {
            setTimeout(() => {
              const updatedMatrix = [...newMatrix];
              updatedMatrix[first.row][first.col] = { ...firstCard, isMatched: true };
              updatedMatrix[second.row][second.col] = { ...secondCard, isMatched: true };
              setMatrix(updatedMatrix);
              setFlippedCards([]);
              setBlockInteraction(false);
    
              checkGameCompletion(updatedMatrix);
            }, 500);
          } else {
            setTimeout(() => {
              const updatedMatrix = [...newMatrix];
              updatedMatrix[first.row][first.col] = { ...firstCard, isFlipped: false };
              updatedMatrix[second.row][second.col] = { ...secondCard, isFlipped: false };
              setMatrix(updatedMatrix);
              setFlippedCards([]);
              setBlockInteraction(false);
            }, 1000);
          }
        }
      }
   return (
  
    <div className='app'>
      <button onClick={startNewGame}>Новая игра</button>
      <button onClick={handleSaveGame}>Сохранить игру</button>

      <button onClick={() => {
        const savedGame = useSelector((state) => state.game.currentGame);
         handleLoadGame(savedGame);}}> Загрузить игру </button>

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
          <button onClick={() => localStorage.removeItem('memory-game-records')}>
            Очистить рекорды
          </button>
          <div className="current-game">
             <h3>Текущая игра:</h3>
             <p>Ходы: {clickCount}</p>
             <p>Статус: {gameOver ? 'Игра окончена' : 'Игра активна'}</p>
             <p>Время начала: {startTime ? new Date(startTime).toLocaleTimeString() : '-'}</p>
          </div>
        </div>
        
      )}

      <div className="matrix-container">
        {matrix.map((row, rowIndex) => (
          <div key={`row-${rowIndex}`} className="row">
            {row.map((card, colIndex) => (
              <Card
                key={`card-${card.id}`}
                card={card}
                isFlipped={card.isFlipped || card.isMatched}
                onClick={() => handleCardClick(rowIndex, colIndex)}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
   
  );
}

