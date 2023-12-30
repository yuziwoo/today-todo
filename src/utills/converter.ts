import { BasicDateData } from '../types/calendarTypes';

export const convertToTwoDigitString = (num: number): string => {
  return num < 10 ? `0${num}` : num.toString();
};

export const convertDateToNumber = ({ year, month, day }: BasicDateData): number => {
  const formatString = `${year}${convertToTwoDigitString(month)}${convertToTwoDigitString(day)}`;
  return parseInt(formatString);
};

export const convertNumberToDateData = (dateNum: number): BasicDateData => {
  const dateString = dateNum.toString();

  if (dateString.length !== 8) {
    return { year: 0, month: 0, day: 0 };
  }

  const year = Number(dateString.slice(0, 4));
  const month = Number(dateString.slice(4, 6));
  const day = Number(dateString.slice(6, 8));

  return { year, month, day };
};
