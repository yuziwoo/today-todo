import { CalendarDateProps } from '../../../types/삭제예정/calendar';

export const compileDateToCalendarDateProps = (date: Date): CalendarDateProps => ({
  year: date.getFullYear(),
  month: date.getMonth(),
  day: date.getDate(),
});
