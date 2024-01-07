import { CalendarDataType, ChangeMonthProps } from '../../../../types/calendarTypes';

import './calendarTable.css';
import CalendarTableHead from '../CalendarTableHead/CalendarTableHead';
import CalendarTableCell from '../CalendarTableCell/CalendarTableCell';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../store/store';
import { isToday } from '../../../../utills/calendarUtils';

interface CalendarTableProps {
  calendar: CalendarDataType[];
  onChangeToNextMonth: ({ year, month, todo }: ChangeMonthProps) => void;
  onChangeToLastMonth: ({ year, month, todo }: ChangeMonthProps) => void;
  setCurrentDay: (day: number) => void;
  currentDay: number;
}

const CalendarTable = ({
  calendar,
  onChangeToNextMonth,
  onChangeToLastMonth,
  setCurrentDay,
  currentDay,
}: CalendarTableProps) => {
  const startDayOfWeek = new Date(calendar[1].year, calendar[1].month, 1).getDay();
  const lastMonth = startDayOfWeek > 0 ? calendar[0].datas.slice(-startDayOfWeek) : [];
  const currentMonth = calendar[1].datas;
  const nextMonthLength = (7 - ((currentMonth.length + lastMonth.length) % 7)) % 7;
  const nextMonth = calendar[2].datas.slice(0, nextMonthLength);
  const todo = useSelector((state: RootState) => state.todo);

  const lastMonthClickHandler = (day: number) => {
    onChangeToLastMonth({ year: calendar[0].year, month: calendar[0].month, todo });
    setCurrentDay(day);
  };

  const nextMonthClickHandler = (day: number) => {
    onChangeToNextMonth({ year: calendar[2].year, month: calendar[2].month, todo });
    setCurrentDay(day);
  };

  return (
    <section className="calendar-table">
      <CalendarTableHead />

      <div className="calendar-table-body">
        {lastMonth.map(({ day, restDay, todo }) => (
          <CalendarTableCell
            key={day}
            day={day}
            restDay={restDay}
            todo={todo}
            isCurrentMonth={false}
            isCurrentDay={false}
            isToday={false}
            onClickTable={lastMonthClickHandler}
          />
        ))}
        {currentMonth.map(({ day, restDay, todo }) => (
          <CalendarTableCell
            key={day}
            day={day}
            restDay={restDay}
            todo={todo}
            isCurrentMonth={true}
            isCurrentDay={day === currentDay}
            isToday={isToday({ year: calendar[1].year, month: calendar[1].month, day: day })}
            onClickTable={setCurrentDay}
          />
        ))}
        {nextMonth.map(({ day, restDay, todo }) => (
          <CalendarTableCell
            key={day}
            day={day}
            restDay={restDay}
            todo={todo}
            isCurrentMonth={false}
            isCurrentDay={false}
            isToday={false}
            onClickTable={nextMonthClickHandler}
          />
        ))}
      </div>
    </section>
  );
};

export default CalendarTable;
