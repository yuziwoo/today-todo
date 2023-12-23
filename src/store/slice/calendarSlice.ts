import { createSlice } from '@reduxjs/toolkit';
import { initialCalendarData } from '../../mocks/data/calendar';
import { setDefaultCalendarData } from '../../api/calendarAPI/setDefaultCalendarData';
import { setCalendarData } from '../../api/calendarAPI/setCalendarData';
import { CalendarDataType, RestDayPayloadData } from '../../types/calendarTypes';
import { addRestDayData } from '../../api/calendarAPI/addRestDayData';
import { addTodoData } from '../../api/calendarAPI/addTodoData';

const handleSetCalendarDatas = ({
  type,
  payload,
}: {
  type: string;
  payload: RestDayPayloadData;
}) => {
  const currentMonth = {
    year: payload.year,
    month: payload.month,
  };

  const defaultData = setDefaultCalendarData(currentMonth);
  const restDayFilledData = addRestDayData(defaultData, payload.restDayData);
  const finalData = addTodoData(restDayFilledData, payload.todo);
  return finalData;
};

export const calendarSlice = createSlice({
  name: 'calendarData',
  initialState: initialCalendarData,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(setCalendarData.pending, (state, action) => {});
    builder.addCase(setCalendarData.fulfilled, (state, action) => {
      state = handleSetCalendarDatas({ type: 'deep reset', payload: action.payload });
      return state;
    });
    builder.addCase(setCalendarData.rejected, (state, action) => {
      console.log('공휴일 API를 가져오는 과정에서 오류가 발생했습니다.');
    });
  },
});

// export const { } = calendarSlice.actions;
export default calendarSlice.reducer;
