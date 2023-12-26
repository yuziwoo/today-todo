import { CalendarDataType } from '../../../types/calendarTypes';
import CalendarTable from './CalendarTable/CalendarTable';

interface CalendarBodyProps {
  calendar: CalendarDataType[];
}

const CalendarBody = ({ calendar }: CalendarBodyProps) => {
  return (
    <section className="calendar-body">
      <CalendarTable calendar={calendar} />
    </section>
  );
};

export default CalendarBody;
