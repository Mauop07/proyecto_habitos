import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: {
    habitos: (state = { lista: [] }, action) => state
  },
});