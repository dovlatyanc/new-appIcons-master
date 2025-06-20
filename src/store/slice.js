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
  },
})

export const { 
  incrementClickCount,
  resetClickCount,
} = gameSlice.actions

export default gameSlice.reducer