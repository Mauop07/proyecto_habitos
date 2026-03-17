import { configureStore } from '@reduxjs/toolkit';
import habitoReducer from './habitoSlice';
import authReducer from './authSlice';

export const store = configureStore({
  reducer: {
    habitos: habitoReducer,
    auth: authReducer
  },
});