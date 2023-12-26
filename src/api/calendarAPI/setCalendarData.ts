import { createAsyncThunk } from '@reduxjs/toolkit';
import { getRestDayData } from './getRestDayData';
import {
  ChangeMonthProps,
  RestDayData,
  RestDayOneMonthPayloadData,
  RestDayPayloadData,
} from '../../types/calendarTypes';
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

export const setNextMonthCalendarData = createAsyncThunk(
  'calendarSlice/setNextMonthCalendarData',
  async ({ year, month, todo }: SetCalendarDataProps): Promise<RestDayOneMonthPayloadData> => {
    // const nextMonthData = await getRestDayData(calcNextMonth({ year, month }));
    // const restDayData = nextMonthData;
    const restDayData: RestDayData[] = [{ day: 25, restDay: true, dateName: '기독탄신일' }];

    const nextMonth = calcNextMonth({ year, month });
    return { year: nextMonth.year, month: nextMonth.month, restDayData, todo };
  }
);

export const setLastMonthCalendarData = createAsyncThunk(
  'calendarSlice/setLastMonthCalendarData',
  async ({ year, month, todo }: SetCalendarDataProps): Promise<RestDayOneMonthPayloadData> => {
    // const lastMonthData = await getRestDayData(calcLastMonth({ year, month }));
    // const restDayData = nextMonthData;
    const restDayData: RestDayData[] = [{ day: 25, restDay: true, dateName: '기독탄신일' }];

    const lastMonth = calcLastMonth({ year, month });
    return { year: lastMonth.year, month: lastMonth.month, restDayData, todo };
  }
);