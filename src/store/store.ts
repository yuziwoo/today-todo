import { configureStore } from '@reduxjs/toolkit';
import darkModeSlice from './slice/darkModeSlice';
import todoSlice from './slice/todoSlice';
import calendarSlice from './slice/calendarSlice';
import editorSlice from './slice/editorSlice';
import requestSlice from './slice/requestSlice';
import manageSlice from './slice/manageSlice';

export const store = configureStore({
  reducer: {
    darkMode: darkModeSlice,
    todo: todoSlice,
    calendarData: calendarSlice,
    editor: editorSlice,
    request: requestSlice,
    manage: manageSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
