import { createAsyncThunk } from '@reduxjs/toolkit';
import { getRestDayData } from './getRestDayData';
import { BasicMonthData, RestDayData } from '../../types/calendarTypes';

export const fetchCalendarData = createAsyncThunk(
  'calendarSlice/fetchCalendarData',
  async ({ year, month }: BasicMonthData) => {
    // const restDayData = await getRestDayData({ year, month });
    const restDayData: RestDayData[] = [{ day: 25, restDay: true, dateName: '기독탄신일' }];
    return { data: restDayData, year, month };
  }
);
