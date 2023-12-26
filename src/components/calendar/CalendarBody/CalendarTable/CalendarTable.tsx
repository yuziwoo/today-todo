import { CalendarDataType } from '../../../../types/calendarTypes';

import './calendarTable.css';
import CalendarTableHead from '../CalendarTableHead/CalendarTableHead';
import CalendarTableCell from '../CalendarTableCell/CalendarTableCell';

interface CalendarTableProps {
  calendar: CalendarDataType[];
}

const CalendarTable = ({ calendar }: CalendarTableProps) => {
  const startDayOfWeek = new Date(calendar[1].year, calendar[1].month, 1).getDay();
  const lastMonth = startDayOfWeek > 0 ? calendar[0].datas.slice(-startDayOfWeek) : [];
  const currentMonth = calendar[1].datas;
  const nextMonthLength = (7 - ((currentMonth.length + lastMonth.length) % 7)) % 7;
  const nextMonth = calendar[2].datas.slice(0, nextMonthLength);

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
          />
        ))}
        {currentMonth.map(({ day, restDay, todo }) => (
          <CalendarTableCell
            key={day}
            day={day}
            restDay={restDay}
            todo={todo}
            isCurrentMonth={true}
          />
        ))}
        {nextMonth.map(({ day, restDay, todo }) => (
          <CalendarTableCell
            key={day}
            day={day}
            restDay={restDay}
            todo={todo}
            isCurrentMonth={false}
          />
        ))}
      </div>
    </section>
  );
};

export default CalendarTable;
