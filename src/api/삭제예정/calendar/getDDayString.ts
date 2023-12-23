import { CalendarDateProps } from '../../../types/삭제예정/calendar';
import { calculateDDay } from '../../../utills/삭제예정/calendar';

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
