import { createSlice } from '@reduxjs/toolkit'

export const gameSlice = createSlice({
  name: 'game',
  initialState: {
     clickCount: 0,
    currentGame: null
  },
  reducers: {
     incrementClickCount: (state) => {
      state.clickCount += 1
    },
    resetClickCount: (state) => {
      state.clickCount = 0
    }
    ,saveCurrentGame(state, action) {
      state.currentGame = action.payload; // Сохраняем данные игры
    },
    clearCurrentGame(state) {
      state.currentGame = null; // Очистка текущей игры
    }
  },
})

export const { 
  incrementClickCount,
  resetClickCount,
   saveCurrentGame,
    clearCurrentGame
} = gameSlice.actions

export default gameSlice.reducer