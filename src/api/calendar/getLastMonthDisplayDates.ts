import { MonthArray, CalendarYearMonthProps } from '../../types/calendar';

const getStartDayOfWeek = ({ year, month }: CalendarYearMonthProps) => {
  return new Date(year, month, 1).getDay();
};

interface getLastMonthDisplayDatesProps {
  year: number;
  month: number;
  lastMonthArray: MonthArray;
}

export const getLastMonthDisplayDates = ({
  year,
  month,
  lastMonthArray,
}: getLastMonthDisplayDatesProps): MonthArray => {
  const startDayOfWeek = getStartDayOfWeek({ year, month });
  return startDayOfWeek !== 0 ? lastMonthArray.slice(-startDayOfWeek) : [];
};
