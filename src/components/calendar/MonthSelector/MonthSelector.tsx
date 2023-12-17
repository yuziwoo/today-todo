import { CalendarDateState } from '../../../pages/Calendar/reducer/calendar-reducer';
import { IconArrowLeft, IconArrowRight } from '../../icons/icons';
import './monthSelector.css';

type MonthSelectorType = {
  darkmode: boolean;
  date: CalendarDateState;
  onLastMonth: () => void;
  onNextMonth: () => void;
};

const MonthSelector = ({ darkmode, date, onLastMonth, onNextMonth }: MonthSelectorType) => {
  return (
    <section className="month-selecter">
      <button className="year-month-label">
        <h1>
          {date.year}.{date.month + 1}
        </h1>
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
