import { CalendarDateState } from '../../../pages/Calendar/reducer/calendar-reducer';
import { IconArrowLeft, IconArrowRight } from '../../icons/icons';
import './monthSelector.css';
import NumberRotate from '../NumberRotate/NumberRotate';

type MonthSelectorType = {
  darkmode: boolean;
  date: CalendarDateState;
  onLastMonth: () => void;
  onNextMonth: () => void;
};

const getDigitNumber = (num: number, index: number): string => `${num}`[index];
const getMonthTenDigitNumber = (month: number): number => (month >= 10 ? 1 : 0);
const getMonthOneDigitNumber = (month: number): number => Math.floor(month % 10);

const MonthSelector = ({ darkmode, date, onLastMonth, onNextMonth }: MonthSelectorType) => {
  return (
    <section className="month-selecter">
      <button className="year-month-label">
        <NumberRotate translate={getDigitNumber(date.year, 0)} />
        <NumberRotate translate={getDigitNumber(date.year, 1)} />
        <NumberRotate translate={getDigitNumber(date.year, 2)} />
        <NumberRotate translate={getDigitNumber(date.year, 3)} />
        <NumberRotate translate={getMonthTenDigitNumber(date.month + 1)} />
        <NumberRotate translate={getMonthOneDigitNumber(date.month + 1)} />
      </button>
      <button
        className="last-month"
        onClick={() => {
          onLastMonth();
        }}
      >
        <IconArrowLeft color={darkmode ? 'white' : 'black'} />
      </button>
      <button
        className="next-month"
        onClick={() => {
          onNextMonth();
        }}
      >
        <IconArrowRight color={darkmode ? 'white' : 'black'} />
      </button>
    </section>
  );
};

export default MonthSelector;
