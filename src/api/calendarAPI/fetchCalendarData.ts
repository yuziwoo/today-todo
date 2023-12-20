import { createAsyncThunk } from '@reduxjs/toolkit';
import { getRestDayData } from './getRestDayData';
import { BasicMonthData, RestDayData, RestDayPayloadData } from '../../types/calendarTypes';
import { calcLastMonth } from './calcLastMonth';
import { calcNextMonth } from './calcNextMonth';

export const fetchCalendarData = createAsyncThunk(
  'calendarSlice/fetchCalendarData',
  async ({ year, month }: BasicMonthData): Promise<RestDayPayloadData> => {
    // const lastMonthData = await getRestDayData(calcLastMonth({ year, month }));
    // const currentMonthData = await getRestDayData({ year, month });
    // const nextMonthData = await getRestDayData(calcNextMonth({ year, month }));

    // const restDayData = [lastMonthData, currentMonthData, nextMonthData];
    const restDayData: RestDayData[] = [{ day: 25, restDay: true, dateName: '기독탄신일' }];
    return { year, month, data: [restDayData, restDayData, restDayData] };
  }
);
