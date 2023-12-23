import './calendarHeader.css';

import YearMonthButton from '../YearMonthButton/YearMonthButton';
import { IconArrowLeft, IconArrowRight } from '../../icons/icons';
import { BasicMonthData, CalendarDataType, ChangeMonthProps } from '../../../types/calendarTypes';
import { Tasks } from '../../../types/todo';
import { calcLastMonth } from '../../../api/calendarAPI/calcLastMonth';
import { calcNextMonth } from '../../../api/calendarAPI/calcNextMonth';

interface CalendarHeaderProps {
  calendar: CalendarDataType[];
  prevDate: BasicMonthData;
  onChangeMonth: ({ year, month, todo }: ChangeMonthProps) => void;
  todo: Tasks;
}

const CalendarHeader = ({ calendar, prevDate, onChangeMonth, todo }: CalendarHeaderProps) => {
  const { year, month } = calendar[1];
  
  return (
    <section className="calendar-header">
      <YearMonthButton calendar={calendar} prevDate={prevDate} />

      <button
        className="last-month-button arrow-button canHover"
        onClick={() => {
          const lastMonth = calcLastMonth({ year, month });
          onChangeMonth({ year: lastMonth.year, month: lastMonth.month, todo });
        }}
      >
        <IconArrowLeft color="black" />
      </button>

      <button
        className="next-month-button arrow-button canHover"
        onClick={() => {
          const nextMonth = calcNextMonth({ year, month });
          onChangeMonth({ year: nextMonth.year, month: nextMonth.month, todo });
        }}
      >
        <IconArrowRight color="black" />
      </button>
    </section>
  );
};

export default CalendarHeader;
