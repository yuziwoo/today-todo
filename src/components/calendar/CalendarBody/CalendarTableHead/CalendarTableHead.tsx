import { CALENDAR_API } from '../../../../constants/API';
import './calendarTableHead.css';

const CalendarTableHead = () => {
  const dayOfWeeks = CALENDAR_API.dayOfWeek;

  return (
    <div className="calendar-table-head">
      {dayOfWeeks.map((dayOfWeek) => (
        <div className="calendar-th" key={dayOfWeek}>
          <span>{dayOfWeek}</span>
        </div>
      ))}
    </div>
  );
};

export default CalendarTableHead;
