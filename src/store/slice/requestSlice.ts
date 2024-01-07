import { createSlice } from '@reduxjs/toolkit';

export const requestSlice = createSlice({
  name: 'request',
  initialState: {
    calendarTodo: 0,
    calendarMonthSelectEditing: false,
  },
  reducers: {
    requestChangeCalendarTodo(state) {
      const newState = state.calendarTodo + 1;
      state.calendarTodo = newState;
    },

    toggleCalendarMonthSelector(state) {
      state.calendarMonthSelectEditing = !state.calendarMonthSelectEditing;
    },
  },
});

export const { requestChangeCalendarTodo, toggleCalendarMonthSelector } = requestSlice.actions;
export default requestSlice.reducer;
