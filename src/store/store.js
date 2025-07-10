import { configureStore } from '@reduxjs/toolkit'
import gameSlice from './slice'
import authReducer from './authSlice';

export default configureStore({
  reducer: {
    game: gameSlice,
    auth: authReducer
  },
})