import { CalendarDateProps } from '../../../types/삭제예정/calendar';

const isSameDate = (a: CalendarDateProps, b: Date) => {
  return a.year === b.getFullYear() && a.month === b.getMonth() && a.day === b.getDate();
};

export const compareIsToday = (a: CalendarDateProps) => {
  const today = new Date();
  return isSameDate({ ...a }, today);
};
