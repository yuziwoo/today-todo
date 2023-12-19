import { CALENDAR_API } from '../constants/API';
import { CalendarYearMonthProps, CalendarDateProps } from '../types/calendar';

export const convertToTwoDigitString = (num: number): string => {
  return num < 10 ? `0${num}` : num.toString();
};

export const getMaxDay = ({ year, month }: CalendarYearMonthProps): number => {
  return new Date(year, month + 1, 0).getDate();
};

export const calcYearMonth = (
  year: number,
  month: number,
  offset: number
): CalendarYearMonthProps => {
  let newMonth = month + offset;
  let newYear = year;

  while (newMonth < 0) {
    newMonth += 12;
    newYear -= 1;
  }

  while (newMonth > 11) {
    newMonth -= 12;
    newYear += 1;
  }

  return { year: newYear, month: newMonth };
};

export const getDayOfWeek = ({ year, month, day }: CalendarDateProps): number => {
  return new Date(year, month, day).getDay();
};

export const getDayOfWeekString = ({ year, month, day }: CalendarDateProps): string => {
  const dayOfWeek = new Date(year, month, day).getDay();
  return CALENDAR_API.dayOfWeek[dayOfWeek];
};

export const calculateDDay = (targetDate: Date): number => {
  const oneDay = 24 * 60 * 60 * 1000; // 하루의 밀리초
  const today = new Date(); // 현재 날짜
  const currentDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());

  // 대상 날짜와 현재 날짜의 차이 계산
  const timeDiff = targetDate.getTime() - currentDate.getTime();
  const daysDiff = Math.floor(timeDiff / oneDay);

  // D-day 반환
  return daysDiff;
};
