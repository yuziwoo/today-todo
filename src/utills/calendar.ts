import { CALENDAR_API } from '../constants/API';
import { CalendarYearMonthProps, CalendarDateProps } from '../types/calendar';

export const convertToTwoDigitString = (num: number): string => {
  return num < 10 ? `0${num}` : num.toString();
};

export const getMaxDay = ({ year, month }: CalendarYearMonthProps): number => {
  return new Date(year, month + 1, 0).getDate();
};

export const getDayOfWeek = ({ year, month, day }: CalendarDateProps): number => {
  return new Date(year, month, day).getDay();
};

export const getDayOfWeekString = ({ year, month, day }: CalendarDateProps): string => {
  const dayOfWeek = new Date(year, month, day).getDay();
  return CALENDAR_API.dayOfWeek[dayOfWeek];
};
