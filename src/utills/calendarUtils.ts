import { BasicDateData, BasicMonthData } from '../types/calendarTypes';

export const getMaximumDate = ({ year, month }: BasicMonthData): number => {
  return new Date(year, month + 1, 0).getDate();
};

export const getDayOfWeek = ({ year, month, day }: BasicDateData): number => {
  return new Date(year, month, day).getDay();
};
