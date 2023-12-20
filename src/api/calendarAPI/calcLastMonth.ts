import { BasicMonthData } from '../../types/calendarTypes';

export const calcLastMonth = ({ year, month }: BasicMonthData): BasicMonthData => {
  const lastMonthYear = month === 0 ? year - 1 : year;
  const lastMonthMonth = month === 0 ? 11 : month - 1;
  return {
    year: lastMonthYear,
    month: lastMonthMonth,
  };
};
