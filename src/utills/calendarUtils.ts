import { BasicDateData, BasicMonthData } from '../types/calendarTypes';
import { convertDateToNumber, convertNumberToDateData } from './converter';

export const getMaximumDate = ({ year, month }: BasicMonthData): number => {
  return new Date(year, month + 1, 0).getDate();
};

export const getDayOfWeek = ({ year, month, day }: BasicDateData): number => {
  return new Date(year, month, day).getDay();
};

export const calcDday = ({ year, month, day }: BasicDateData): number => {
  const ONE_DAY = 24 * 60 * 60 * 1000; // 하루의 밀리초
  const formatDate = (date: Date): Date =>
    new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const today = formatDate(new Date());
  const currentDate = new Date(year, month, day);

  const timeDiff = currentDate.getTime() - today.getTime();
  const dday = Math.floor(timeDiff / ONE_DAY);

  return dday;
};

export const getDday = ({ year, month, day }: BasicDateData): string => {
  const dday = calcDday({ year, month, day });
  return dday < 0 ? `D - ${Math.abs(dday)}` : dday > 0 ? `D + ${dday}` : `오늘`;
};

export const isToday = ({ year, month, day }: BasicDateData): boolean => {
  const today = new Date();
  let isSame =
    today.getFullYear() === year && today.getMonth() === month && today.getDate() === day;
  return isSame;
};

export const getToday = (): BasicDateData => {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  const day = today.getDate();

  return { year, month, day };
};

export const getTommorow = (): BasicDateData => {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  const year = tomorrow.getFullYear();
  const month = tomorrow.getMonth();
  const day = tomorrow.getDate();

  return { year, month, day };
};

export const getTommorowAsDate = (): Date => {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  return tomorrow;
};

export const getNextDay = ({ year, month, day }: BasicDateData): BasicDateData => {
  const beforeDay = new Date(year, month, day);
  const nextDay = new Date(beforeDay);
  nextDay.setDate(beforeDay.getDate() + 1);

  const newYear = nextDay.getFullYear();
  const newMonth = nextDay.getMonth();
  const newDay = nextDay.getDate();

  return { year: newYear, month: newMonth, day: newDay };
};

export const getNextDayNumber = (startDay: number): number => {
  const prevDay = convertNumberToDateData(startDay);
  const nextDay = getNextDay(prevDay);
  const nextDayNumber = convertDateToNumber(nextDay);

  return nextDayNumber;
};
