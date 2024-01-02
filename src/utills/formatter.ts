import { convertToTwoDigitString } from './converter';

export const formatDateToInputDateString = (date: Date): string => {
  const year = date.getFullYear();
  const month = convertToTwoDigitString(date.getMonth() + 1);
  const day = convertToTwoDigitString(date.getDate());
  return `${year}-${month}-${day}`;
};
