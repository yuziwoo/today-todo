import { configureStore } from '@reduxjs/toolkit';
import darkModeSlice from './slice/darkModeSlice';
import todoSlice from './slice/todoSlice';

export const store = configureStore({
  reducer: {
    darkMode: darkModeSlice,
    todo: todoSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;