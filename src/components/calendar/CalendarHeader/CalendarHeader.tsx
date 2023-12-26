import './calendarHeader.css';

import YearMonthButton from './YearMonthButton/YearMonthButton';
import { IconArrowLeft, IconArrowRight } from '../../icons/icons';
import { BasicMonthData, CalendarDataType, ChangeMonthProps } from '../../../types/calendarTypes';
import { Tasks } from '../../../types/todo';
import { calcLastMonth } from '../../../api/calendarAPI/calcLastMonth';
import { calcNextMonth } from '../../../api/calendarAPI/calcNextMonth';

interface CalendarHeaderProps {
  calendar: CalendarDataType[];
  prevMonth: BasicMonthData;
  onChangeMonth: ({ year, month, todo }: ChangeMonthProps) => void;
  onChangeToNextMonth: ({ year, month, todo }: ChangeMonthProps) => void;
  onChangeToLastMonth: ({ year, month, todo }: ChangeMonthProps) => void;
  todo: Tasks;
}

const CalendarHeader = ({ calendar, prevMonth, onChangeMonth, onChangeToNextMonth, onChangeToLastMonth, todo }: CalendarHeaderProps) => {
  const { year, month } = calendar[1];
  
  return (
    <section className="calendar-header">
      <YearMonthButton calendar={calendar} prevMonth={prevMonth} />

      <button
        className="last-month-button arrow-button canHover"
        onClick={() => {
          const lastMonth = calcLastMonth({ year, month });
          onChangeToLastMonth({ year: lastMonth.year, month: lastMonth.month, todo });
        }}
      >
        <IconArrowLeft color="black" />
      </button>

      <button
        className="next-month-button arrow-button canHover"
        onClick={() => {
          const nextMonth = calcNextMonth({ year, month });
          onChangeToNextMonth({ year: nextMonth.year, month: nextMonth.month, todo });
        }}
      >
        <IconArrowRight color="black" />
      </button>
    </section>
  );
};

export default CalendarHeader;
