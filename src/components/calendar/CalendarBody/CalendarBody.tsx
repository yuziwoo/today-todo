import { CalendarDataType, ChangeMonthProps } from '../../../types/calendarTypes';
import CalendarTable from './CalendarTable/CalendarTable';

interface CalendarBodyProps {
  calendar: CalendarDataType[];
  onChangeToNextMonth: ({ year, month, todo }: ChangeMonthProps) => void;
  onChangeToLastMonth: ({ year, month, todo }: ChangeMonthProps) => void;
  setCurrentDay: (day: number) => void;
}

const CalendarBody = ({
  calendar,
  onChangeToNextMonth,
  onChangeToLastMonth,
  setCurrentDay,
}: CalendarBodyProps) => {
  return (
    <section className="calendar-body">
      <CalendarTable
        calendar={calendar}
        onChangeToLastMonth={onChangeToLastMonth}
        onChangeToNextMonth={onChangeToNextMonth}
        setCurrentDay={setCurrentDay}
      />
    </section>
  );
};

export default CalendarBody;
