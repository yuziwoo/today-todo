import { createSlice } from '@reduxjs/toolkit';
import { initialCalendarData } from '../../mocks/data/calendar';
import { setDefaultCalendarData } from '../../api/calendarAPI/setDefaultCalendarData';
import { fetchCalendarData } from '../../api/calendarAPI/fetchCalendarData';
import { CalendarDataType, RestDayData } from '../../types/calendarTypes';

const handleSetCalendarDatas = (
  state: CalendarDataType[],
  {
    type,
    payload,
  }: { type: string; payload: { year: number; month: number; data?: RestDayData[] } }
) => {
  const currentMonth = {
    year: payload.year,
    month: payload.month,
  };
  console.log(payload);
  const defaultData = setDefaultCalendarData(currentMonth);
};

export const calendarSlice = createSlice({
  name: 'calendarData',
  initialState: initialCalendarData,
  reducers: {
    setCalendarDatas: handleSetCalendarDatas,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCalendarData.pending, (state, action) => {});
    builder.addCase(fetchCalendarData.fulfilled, (state, action) => {
      handleSetCalendarDatas(state, { type: 'deep reset', payload: action.payload });
    });
    builder.addCase(fetchCalendarData.rejected, (state, action) => {
      console.log('공휴일 API를 가져오는 과정에서 오류가 발생했습니다.');
    });
  },
});

export const { setCalendarDatas } = calendarSlice.actions;
export default calendarSlice.reducer;
