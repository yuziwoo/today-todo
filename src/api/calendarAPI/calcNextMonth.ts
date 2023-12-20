import { BasicMonthData } from '../../types/calendarTypes';

export const calcNextMonth = ({ year, month }: BasicMonthData): BasicMonthData => {
  const nextMonthYear = month === 11 ? year + 1 : year;
  const nextMonthMonth = (month + 1) % 12;
  return {
    year: nextMonthYear,
    month: nextMonthMonth,
  };
};
