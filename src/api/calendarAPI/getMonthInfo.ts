import { DetailedMonthData } from '../../types/calendarTypes';
import { getMaximumDate } from '../../utills/calendarUtils';

export const getMonthInfo = (date: Date): DetailedMonthData => {
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  const startDayOfWeek = new Date(year, month, 1).getDay();
  const info = {
    year,
    month,
    day,
    startDayOfWeek,
    maximumDate: getMaximumDate({ year, month }),
  };

  return info;
};
