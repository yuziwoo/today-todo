import { CalendarDateProps } from '../../types/calendar';

export const compileDateToCalendarDateProps = (date: Date): CalendarDateProps => ({
  year: date.getFullYear(),
  month: date.getMonth(),
  day: date.getDate(),
});
