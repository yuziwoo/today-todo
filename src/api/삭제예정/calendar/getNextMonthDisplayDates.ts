import { MonthArray, CalendarYearMonthProps } from '../../../types/삭제예정/calendar';

const getStartDayOfWeek = ({ year, month }: CalendarYearMonthProps) => {
  return new Date(year, month, 1).getDay();
};

interface getNextMonthDisplayDatesProps {
  year: number;
  month: number;
  currentMonthArray: MonthArray;
  nextMonthArray: MonthArray;
}

export const getNextMonthDisplayDates = ({
  year,
  month,
  currentMonthArray,
  nextMonthArray,
}: getNextMonthDisplayDatesProps): MonthArray => {
  const startDayOfWeek = getStartDayOfWeek({ year, month });
  const nextMonthDisplayDatesLength = 7 - ((startDayOfWeek + currentMonthArray.length) % 7);
  return nextMonthArray.slice(
    0,
    nextMonthDisplayDatesLength === 7 ? 0 : nextMonthDisplayDatesLength
  );
};
