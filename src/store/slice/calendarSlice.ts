import { createSlice } from '@reduxjs/toolkit';
import { initialCalendarData } from '../../mocks/data/calendar';
import { setDefaultCalendarData } from '../../api/calendarAPI/setDefaultCalendarData';

export const calendarSlice = createSlice({
  name: 'calendarData',
  initialState: initialCalendarData,
  reducers: {
    setCalendarDatas(state, { type, payload }) {
      const currentMonth = {
        year: payload.year,
        month: payload.month,
      };

      const defaultData = setDefaultCalendarData(currentMonth);
      console.log(defaultData);
    },
  },
});

export const { setCalendarDatas } = calendarSlice.actions;
export default calendarSlice.reducer;
