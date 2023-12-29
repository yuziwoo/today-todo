import './yearMonthButton.css';
import { BasicMonthData, CalendarDataType } from '../../../../types/calendarTypes';
import RotateNumber from '../RotateNumber/RotateNumber';
import { getMonthDigits, getYearDigits } from '../../../../api/calendarAPI/getDateDigits';

interface YearMonthButtonProps {
  calendar: CalendarDataType[];
  prevMonth: BasicMonthData;
}

const YearMonthButton = ({ calendar, prevMonth }: YearMonthButtonProps) => {
  const { year, month } = calendar[1];

  const yearDigits = getYearDigits(year);
  const prevYearDigits = getYearDigits(prevMonth.year);

  const monthDigits = getMonthDigits(month);
  const prevMonthDigits = getMonthDigits(prevMonth.month);

  return (
    <button className="year-month-button canHover">
      <RotateNumber prev={prevYearDigits[0]} current={yearDigits[0]} />
      <RotateNumber prev={prevYearDigits[1]} current={yearDigits[1]} />
      <RotateNumber prev={prevYearDigits[2]} current={yearDigits[2]} />
      <RotateNumber prev={prevYearDigits[3]} current={yearDigits[3]} />
      <h1>.</h1>
      <RotateNumber prev={prevMonthDigits[0]} current={monthDigits[0]} />
      <RotateNumber prev={prevMonthDigits[1]} current={monthDigits[1]} />
    </button>
  );
};

export default YearMonthButton;
