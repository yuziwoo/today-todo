import { createSlice } from '@reduxjs/toolkit';

export const requestSlice = createSlice({
  name: 'request',
  initialState: {
    calendarTodo: 0,
    calendarYearMonthSelector: false,
  },
  reducers: {
    requestChangeCalendarTodo(state) {
      const newState = state.calendarTodo + 1;
      state.calendarTodo = newState;
    },

    toggleCalendarYearMonthSelector(state) {
      state.calendarYearMonthSelector = !state.calendarYearMonthSelector;
    },
  },
});

export const { requestChangeCalendarTodo, toggleCalendarYearMonthSelector } = requestSlice.actions;
export default requestSlice.reducer;
