import { BasicDateData, BasicMonthData } from '../types/calendarTypes';

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
