import { CalendarYearMonthProps } from '../../types/calendar';

export const getNextMonth = (givenYear: number, givenMonth: number): CalendarYearMonthProps => {
  const year = givenMonth === 11 ? givenYear + 1 : givenYear;
  const month = (givenMonth + 1) % 12;

  return { year, month };
};
