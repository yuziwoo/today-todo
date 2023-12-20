import { BasicDateData } from '../types/calendarTypes';

export const convertToTwoDigitString = (num: number): string => {
  return num < 10 ? `0${num}` : num.toString();
};

export const convertDateToNumber = ({ year, month, day }: BasicDateData): number => {
  const formatString = `${year}${convertToTwoDigitString(month)}${convertToTwoDigitString(day)}`;
  return parseInt(formatString);
};
