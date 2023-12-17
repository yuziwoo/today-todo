import './calendarTable.css'
import { CALENDAR_API } from '../../../constants/API';

const CalendarTable = () => {
  return (
    <section className="table">
      {
        CALENDAR_API.dayOfWeek.map((day, index) => (
          <div className='tr' key={index}>
            <span>{day}</span>
          </div>
        ))
      }
    </section>
  );
};

export default CalendarTable;
