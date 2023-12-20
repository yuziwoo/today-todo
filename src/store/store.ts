import { configureStore } from '@reduxjs/toolkit';
import darkModeSlice from './slice/darkModeSlice';
import todoSlice from './slice/todoSlice';
import calendarSlice from './slice/calendarSlice';

export const store = configureStore({
  reducer: {
    darkMode: darkModeSlice,
    todo: todoSlice,
    calendarData: calendarSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
