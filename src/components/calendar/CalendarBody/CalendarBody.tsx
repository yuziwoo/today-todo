import { CalendarDataType } from '../../../types/calendarTypes';

interface CalendarBodyProps {
  calendar: CalendarDataType[];
}

const CalendarBody = ({ calendar }: CalendarBodyProps) => {
  return <section className="calendar-body"></section>;
};

export default CalendarBody;
