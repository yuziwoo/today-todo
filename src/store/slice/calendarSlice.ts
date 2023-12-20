import { createSlice } from '@reduxjs/toolkit';
import { initialCalendarData } from '../../mocks/data/calendar';
import { setDefaultCalendarData } from '../../api/calendarAPI/setDefaultCalendarData';
import { setCalendarData } from '../../api/calendarAPI/fetchCalendarData';
import { CalendarDataType, RestDayData, RestDayPayloadData } from '../../types/calendarTypes';
import { addRestDayData } from '../../api/calendarAPI/addRestDayData';

const handleSetCalendarDatas = (
  state: CalendarDataType[],
  { type, payload }: { type: string; payload: RestDayPayloadData }
) => {
  const currentMonth = {
    year: payload.year,
    month: payload.month,
  };

  const defaultData = setDefaultCalendarData(currentMonth);
  const restDayFilledData = addRestDayData(defaultData, payload.data);
};

export const calendarSlice = createSlice({
  name: 'calendarData',
  initialState: initialCalendarData,
  reducers: {
    setCalendarDatas: handleSetCalendarDatas,
  },
  extraReducers: (builder) => {
    builder.addCase(setCalendarData.pending, (state, action) => {});
    builder.addCase(setCalendarData.fulfilled, (state, action) => {
      handleSetCalendarDatas(state, { type: 'deep reset', payload: action.payload });
    });
    builder.addCase(setCalendarData.rejected, (state, action) => {
      console.log('공휴일 API를 가져오는 과정에서 오류가 발생했습니다.');
    });
  },
});

export const { setCalendarDatas } = calendarSlice.actions;
export default calendarSlice.reducer;
