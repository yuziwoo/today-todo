import { CalendarDateProps } from '../../types/calendar';
import { calculateDDay } from '../../utills/calendar';

export const getDDayString = ({ year, month, day }: CalendarDateProps): string => {
  const dDay = calculateDDay(new Date(year, month, day));
  
  if (dDay < 0) {
    return `D - ${Math.abs(dDay)}`;
  }
  if (dDay > 0) {
    return `D + ${dDay}`;
  }

  return '오늘';
};
