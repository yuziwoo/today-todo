import { CalendarYearMonthProps } from '../../../types/삭제예정/calendar';

export const getNextMonth = (givenYear: number, givenMonth: number): CalendarYearMonthProps => {
  const year = givenMonth === 11 ? givenYear + 1 : givenYear;
  const month = (givenMonth + 1) % 12;

  return { year, month };
};
