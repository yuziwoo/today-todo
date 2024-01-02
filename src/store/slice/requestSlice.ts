import { createSlice } from '@reduxjs/toolkit';

export const requestSlice = createSlice({
  name: 'request',
  initialState: {
    calendarTodo: 0,
  },
  reducers: {
    requestChangeCalendarTodo(state) {
      const newState = state.calendarTodo + 1;
      state.calendarTodo = newState;
    },
  },
});

export const { requestChangeCalendarTodo } = requestSlice.actions;
export default requestSlice.reducer;
