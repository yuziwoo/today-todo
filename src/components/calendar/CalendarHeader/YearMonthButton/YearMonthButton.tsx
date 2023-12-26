import './yearMonthButton.css';
import { BasicMonthData, CalendarDataType } from '../../../../types/calendarTypes';
import RotateNumber from '../RotateNumber/RotateNumber';

interface YearMonthButtonProps {
  calendar: CalendarDataType[];
  prevMonth: BasicMonthData;
}

const getYearDigits = (year: number): number[] => {
  const digitThousand = Math.floor(year / 1000);
  const digitHundred = Math.floor((year % 1000) / 100);
  const digitTen = Math.floor((year % 100) / 10);
  const digitOne = year % 10;
  return [digitThousand, digitHundred, digitTen, digitOne];
};

const getMonthDigits = (monthIndex: number): number[] => {
  const month = monthIndex + 1;
  const digitTen = Math.floor(month / 10);
  const digitOne = month % 10;
  return [digitTen, digitOne];
};

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
