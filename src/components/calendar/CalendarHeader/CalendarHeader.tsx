import './calendarHeader.css';
import { IconArrowLeft, IconArrowRight } from '../../icons/icons';
import { BasicMonthData, CalendarDataType, ChangeMonthProps } from '../../../types/calendarTypes';
import { Tasks } from '../../../types/todo';
import { calcLastMonth } from '../../../api/calendarAPI/calcLastMonth';
import { calcNextMonth } from '../../../api/calendarAPI/calcNextMonth';
import CalendarHeaderTitle from './CalendarHeaderTitle/CalendarHeaderTitle';

interface CalendarHeaderProps {
  calendar: CalendarDataType[];
  prevMonth: BasicMonthData;
  onChangeToNextMonth: ({ year, month, todo }: ChangeMonthProps) => void;
  onChangeToLastMonth: ({ year, month, todo }: ChangeMonthProps) => void;
  todo: Tasks;
}

const CalendarHeader = ({
  calendar,
  prevMonth,
  onChangeToNextMonth,
  onChangeToLastMonth,
  todo,
}: CalendarHeaderProps) => {
  const { year, month } = calendar[1];

  return (
    <section className="calendar-header">
      <div className="content">
        <button
          className="left event-hover color-reverse"
          onClick={() => {
            onChangeToLastMonth({ ...calcLastMonth({ year, month }), todo });
          }}
        >
          <IconArrowLeft color="white" />
        </button>
        <CalendarHeaderTitle currentMonth={{ year, month }} prevMonth={prevMonth} />
        <button
          className="right event-hover color-reverse"
          onClick={() => {
            onChangeToNextMonth({ ...calcNextMonth({ year, month }), todo });
          }}
        >
          <IconArrowRight color="white" />
        </button>
      </div>
    </section>
  );
};

export default CalendarHeader;
