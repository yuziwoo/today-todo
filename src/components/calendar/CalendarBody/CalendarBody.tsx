import { CalendarDataType, ChangeMonthProps } from '../../../types/calendarTypes';
import CalendarTable from './CalendarTable/CalendarTable';

interface CalendarBodyProps {
  calendar: CalendarDataType[];
  onChangeToNextMonth: ({ year, month, todo }: ChangeMonthProps) => void;
  onChangeToLastMonth: ({ year, month, todo }: ChangeMonthProps) => void;
  setCurrentDay: (day: number) => void;
  currentDay: number;
}

const CalendarBody = ({
  calendar,
  onChangeToNextMonth,
  onChangeToLastMonth,
  setCurrentDay,
  currentDay,
}: CalendarBodyProps) => {
  return (
    <section className="calendar-body">
      <CalendarTable
        calendar={calendar}
        onChangeToLastMonth={onChangeToLastMonth}
        onChangeToNextMonth={onChangeToNextMonth}
        setCurrentDay={setCurrentDay}
        currentDay={currentDay}
      />
    </section>
  );
};

export default CalendarBody;
