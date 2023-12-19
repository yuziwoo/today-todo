import { CalendarYearMonthProps } from '../types/calendar';

export const convertToTwoDigitString = (num: number): string => {
  return num < 10 ? `0${num}` : num.toString();
};

export const getMaxDay = ({ year, month }: CalendarYearMonthProps): number => {
  return new Date(year, month + 1, 0).getDate();
};
