import { createSlice } from '@reduxjs/toolkit';
import { initialCalendarData } from '../../mocks/data/calendar';
import {
  getDefaultCalendarData,
  setDefaultCalendarData,
} from '../../api/calendarAPI/setDefaultCalendarData';
import {
  setCalendarData,
  setLastMonthCalendarData,
  setNextMonthCalendarData,
} from '../../api/calendarAPI/setCalendarData';
import {
  CalendarDataType,
  RestDayPayloadData,
  RestDayOneMonthPayloadData,
} from '../../types/calendarTypes';
import { addOneRestDayData, addRestDayData } from '../../api/calendarAPI/addRestDayData';
import { addOneMonthTodoData, addTodoData } from '../../api/calendarAPI/addTodoData';

const handleSetCalendarDatas = ({
  type,
  payload,
}: {
  type: string;
  payload: RestDayPayloadData;
}): CalendarDataType[] => {
  const currentMonth = {
    year: payload.year,
    month: payload.month,
  };

  const defaultData = setDefaultCalendarData(currentMonth);
  const restDayFilledData = addRestDayData(defaultData, payload.restDayData);
  const finalData = addTodoData(restDayFilledData, payload.todo);
  return finalData;
};

const handleSetNextMonthCalendarData = ({
  type,
  payload,
  prevState,
}: {
  type: string;
  payload: RestDayOneMonthPayloadData;
  prevState: CalendarDataType[];
}): CalendarDataType[] => {
  const newState = prevState.slice(-2);

  const defaultData = getDefaultCalendarData({ year: payload.year, month: payload.month });
  const restDayFilledData = addOneRestDayData(defaultData, payload.restDayData);
  const finalData = addOneMonthTodoData(restDayFilledData, payload.todo);
  return [...newState, finalData];
};

const handleSetLastMonthCalendarData = ({
  type,
  payload,
  prevState,
}: {
  type: string;
  payload: RestDayOneMonthPayloadData;
  prevState: CalendarDataType[];
}): CalendarDataType[] => {
  const newState = prevState.slice(0, 2);

  const defaultData = getDefaultCalendarData({ year: payload.year, month: payload.month });
  const restDayFilledData = addOneRestDayData(defaultData, payload.restDayData);
  const finalData = addOneMonthTodoData(restDayFilledData, payload.todo);
  return [finalData, ...newState];
};

export const calendarSlice = createSlice({
  name: 'calendarData',
  initialState: initialCalendarData,
  reducers: {
    toggleTaskInCalendar(state, action) {
      const toggle = !action.payload.complete;
      const index = state[1].datas[action.payload.day - 1].todo.findIndex(
        (task) => task.id === action.payload.id
      );
      const newTask = { ...state[1].datas[action.payload.day - 1].todo[index], complete: toggle };
      state[1].datas[action.payload.day - 1].todo[index] = newTask;
    },

    updateTaskInCalendar(state: CalendarDataType[], action) {
      const todo = action.payload;
      const newState = addTodoData([...state], todo);

      return [...newState];
    },
  },
  extraReducers: (builder) => {
    // builder.addCase(setCalendarData.pending, (state, action) => {});
    builder.addCase(setCalendarData.fulfilled, (state, action) => {
      state = handleSetCalendarDatas({ type: 'deep reset', payload: action.payload });
      return state;
    });
    builder.addCase(setCalendarData.rejected, (state, action) => {
      console.log('공휴일 API를 가져오는 과정에서 오류가 발생했습니다.');
    });

    builder.addCase(setNextMonthCalendarData.fulfilled, (state, action) => {
      const prevState = JSON.parse(JSON.stringify(state));
      state = handleSetNextMonthCalendarData({
        type: 'deep reset',
        payload: action.payload,
        prevState,
      });
      return state;
    });

    builder.addCase(setLastMonthCalendarData.fulfilled, (state, action) => {
      const prevState = JSON.parse(JSON.stringify(state));
      state = handleSetLastMonthCalendarData({
        type: 'deep reset',
        payload: action.payload,
        prevState,
      });
      return state;
    });
  },
});

export const { toggleTaskInCalendar, updateTaskInCalendar } = calendarSlice.actions;
export default calendarSlice.reducer;
