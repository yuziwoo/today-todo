import { IconArrowLeft, IconArrowRight } from '../../icons/icons';
import './monthSelector.css';
// import NumberRotate from '../NumberRotate/NumberRotate';
import { CalendarDateProps } from '../../../types/calendar';

type MonthSelectorType = {
  date: CalendarDateProps;
  onLastMonth: () => void;
  onNextMonth: () => void;
};

const getDigitNumber = (num: number, index: number): string => `${num}`[index];
const getMonthTenDigitNumber = (month: number): number => (month >= 10 ? 1 : 0);
const getMonthOneDigitNumber = (month: number): number => month % 10;

const MonthSelector = ({ date, onLastMonth, onNextMonth }: MonthSelectorType) => {
  return (
    <section className="month-selecter">
      <button className="year-month-label canHover">
        {/* <NumberRotate translate={getDigitNumber(date.year, 0)} />
        <NumberRotate translate={getDigitNumber(date.year, 1)} />
        <NumberRotate translate={getDigitNumber(date.year, 2)} />
        <NumberRotate translate={getDigitNumber(date.year, 3)} />
        <h1>.</h1>
        <NumberRotate translate={getMonthTenDigitNumber(date.month + 1)} />
        <NumberRotate translate={getMonthOneDigitNumber(date.month + 1)} /> */}
      </button>
      <button
        className="last-month canHover"
        onClick={() => {
          onLastMonth();
        }}
      >
        <IconArrowLeft color="black" />
      </button>
      <button
        className="next-month canHover"
        onClick={() => {
          onNextMonth();
        }}
      >
        <IconArrowRight color="black" />
      </button>
    </section>
  );
};

export default MonthSelector;
