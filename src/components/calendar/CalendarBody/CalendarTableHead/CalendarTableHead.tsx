import { CALENDAR_API } from '../../../../constants/API';
import './calendarTableHead.css';

const CalendarTableHead = () => {
  const dayOfWeeks = CALENDAR_API.dayOfWeekEng;

  return (
    <div className="calendar-table-head">
      {dayOfWeeks.map((dayOfWeek, index) => (
        <div className="calendar-th" key={index}>
          <span>{dayOfWeek}</span>
        </div>
      ))}
    </div>
  );
};

export default CalendarTableHead;
