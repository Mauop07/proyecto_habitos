import { configureStore } from '@reduxjs/toolkit';
import habitoReducer from './habitoSlice';

export const store = configureStore({
  reducer: {
    habitos: habitoReducer
  },
});