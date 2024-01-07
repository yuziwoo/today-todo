import { BasicDateData } from 'src/types/calendarTypes';
import { convertToTwoDigitString } from './converter';

export const formatDateToInputString = ({ year, month, day }: BasicDateData): string => {
  return `${year}-${convertToTwoDigitString(month + 1)}-${convertToTwoDigitString(day)}`;
};
