import { createSlice } from '@reduxjs/toolkit'

export const gameSlice = createSlice({
  name: 'game',
  initialState: {
    matrix: [],
    flippedCards: [],
    startTime: Date.now(),
    gameOver: false,
    clickCount: 0
  },
  reducers: {
    incrementClickCount: (state) => {
      state.clickCount += 1
    },
    resetClickCount: (state) => {
      state.clickCount = 0
    },
    saveCurrentGame(state, action) {
      // Сохраняем данные игры
      state.clickCount = action.payload.clickCount
      state.matrix = action.payload.matrix
      state.flippedCards = action.payload.flippedCards
      state.startTime = action.payload.startTime
      state.gameOver = action.payload.gameOver
      //state = action.payload; // Сохраняем данные игры
    },
    clearCurrentGame(state) {
      state.matrix = []
      state.flippedCards = []
      state.startTime = Date.now()
      state.gameOver = false
      state.clickCount = 0
    }  // Очистка текущей игры
  },
   flipCard(state, action) {
      const { rowIndex, colIndex } = action.payload;
      const card = state.matrix[rowIndex][colIndex];
      if (!card.isFlipped && !card.isMatched) {
        state.matrix[rowIndex][colIndex] = { ...card, isFlipped: true };
      }
    },

    unflipCard(state, action) {
      const { rowIndex, colIndex } = action.payload;
      const card = state.matrix[rowIndex][colIndex];
      if (card.isFlipped && !card.isMatched) {
        state.matrix[rowIndex][colIndex] = { ...card, isFlipped: false };
      }
    },
       matchCards(state, action) {
      const { first, second } = action.payload;
      state.matrix[first.row][first.col] = { ...state.matrix[first.row][first.col], isMatched: true };
      state.matrix[second.row][second.col] = { ...state.matrix[second.row][second.col], isMatched: true };
    },
    startNewGame(state, action) {
      return { ...state, ...action.payload };
    }
})

export const { 
   incrementClickCount,
  resetClickCount,
  saveCurrentGame,
  clearCurrentGame,
  flipCard,
  unflipCard,
  matchCards,
  startNewGame,
} = gameSlice.actions

export default gameSlice.reducer