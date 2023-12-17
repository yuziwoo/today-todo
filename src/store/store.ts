import { configureStore } from '@reduxjs/toolkit';
import darkModeSlice from './slice/darkModeSlice';

export const store = configureStore({
  reducer: {
    darkMode: darkModeSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;