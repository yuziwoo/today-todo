import { DetailedMonthData } from '../../types/calendarTypes';
import { getMaximumDate } from '../../utills/calendarUtils';

export const getMonthInfo = (date: Date): DetailedMonthData => {
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  const info = {
    year,
    month,
    day,
    maximumDate: getMaximumDate({ year, month }),
  };

  return info;
};
