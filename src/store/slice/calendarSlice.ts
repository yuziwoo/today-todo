import { createSlice } from '@reduxjs/toolkit';

const initialCalendar = [
  {
    day: 1,
    restDay: null,
    dateName: null,
    todo: [
      {
        id: 0,
        day: 1,
        workToDo: 'sample',
        complete: true,
        repeat: false,
      },
    ],
  },
];

export const calendarSlice = createSlice({
  name: 'calendarData',
  initialState: initialCalendar,
  reducers: {
    setCalendarData() {},
  },
});

export const { setCalendarData } = calendarSlice.actions;
export default calendarSlice.reducer;
