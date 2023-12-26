import { BasicMonthData, CalendarDataType } from '../../types/calendarTypes';
import { getMaximumDate } from '../../utills/calendarUtils';
import { calcLastMonth } from './calcLastMonth';
import { calcNextMonth } from './calcNextMonth';

export const getDefaultCalendarData = ({ year, month }: BasicMonthData): CalendarDataType => {
  const maximumDate = getMaximumDate({ year, month });
  const data = {
    year,
    month,
    datas: Array.from({ length: maximumDate }, (_, index) => ({
      day: index + 1,
      restDay: null,
      dateName: null,
      todo: [],
    })),
  };
  return data;
};

export const setDefaultCalendarData = ({ year, month }: BasicMonthData): CalendarDataType[] => {
  const lastMonth = getDefaultCalendarData(calcLastMonth({ year, month }));
  const currentMonth = getDefaultCalendarData({ year, month });
  const NextMonth = getDefaultCalendarData(calcNextMonth({ year, month }));
  const data = [lastMonth, currentMonth, NextMonth];

  return data;
};
