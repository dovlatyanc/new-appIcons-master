import { configureStore } from '@reduxjs/toolkit'
import gameSlice from './slice'

export default configureStore({
  reducer: {
    save_game: gameSlice
  },
})