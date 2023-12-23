import { createAsyncThunk } from '@reduxjs/toolkit';
import { getRestDayData } from './getRestDayData';
import { ChangeMonthProps, RestDayData, RestDayPayloadData } from '../../types/calendarTypes';
import { calcLastMonth } from './calcLastMonth';
import { calcNextMonth } from './calcNextMonth';

type SetCalendarDataProps = ChangeMonthProps;

export const setCalendarData = createAsyncThunk(
  'calendarSlice/setCalendarData',
  async ({ year, month, todo }: SetCalendarDataProps): Promise<RestDayPayloadData> => {
    // const lastMonthData = await getRestDayData(calcLastMonth({ year, month }));
    // const currentMonthData = await getRestDayData({ year, month });
    // const nextMonthData = await getRestDayData(calcNextMonth({ year, month }));

    // const restDayData = [lastMonthData, currentMonthData, nextMonthData];
    const restDayData: RestDayData[][] = [
      [{ day: 25, restDay: true, dateName: '기독탄신일' }],
      [{ day: 25, restDay: true, dateName: '기독탄신일' }],
      [{ day: 25, restDay: true, dateName: '기독탄신일' }],
    ];
    return { year, month, restDayData, todo };
  }
);
