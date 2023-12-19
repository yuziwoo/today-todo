import { CalendarYearMonthProps } from '../../types/calendar';

export const getLastMonth = (givenYear: number, givenMonth: number): CalendarYearMonthProps => {
  const year = givenMonth === 0 ? givenYear - 1 : givenYear;
  const month = givenMonth === 0 ? 11 : givenMonth - 1;

  return { year, month };
};
