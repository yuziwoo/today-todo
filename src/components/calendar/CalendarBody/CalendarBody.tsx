import { CalendarDataType, ChangeMonthProps } from '../../../types/calendarTypes';
import CalendarTable from './CalendarTable/CalendarTable';
import CalendarDayInfo from './CalendarDayInfo/CalendarDayInfo';
import CalendarTodoList from './CalendarTodoList/CalendarTodoList';

interface CalendarBodyProps {
  calendar: CalendarDataType[];
  onChangeMonth: ({ year, month, todo }: ChangeMonthProps) => void;
  onChangeToNextMonth: ({ year, month, todo }: ChangeMonthProps) => void;
  onChangeToLastMonth: ({ year, month, todo }: ChangeMonthProps) => void;
  setCurrentDay: (day: number) => void;
  currentDay: number;
}

const CalendarBody = ({
  calendar,
  onChangeMonth,
  onChangeToNextMonth,
  onChangeToLastMonth,
  setCurrentDay,
  currentDay,
}: CalendarBodyProps) => {
  const { year, month } = calendar[1];
  const { dateName, restDay } = calendar[1].datas[currentDay - 1];
  const currentDate = {
    year,
    month,
    day: currentDay,
    dateName,
    restDay,
  };
  const currentDayTasks = [...calendar[1].datas[currentDay - 1].todo];

  return (
    <section className="calendar-body">
      <CalendarTable
        calendar={calendar}
        onChangeToLastMonth={onChangeToLastMonth}
        onChangeToNextMonth={onChangeToNextMonth}
        setCurrentDay={setCurrentDay}
        currentDay={currentDay}
      />
      <CalendarDayInfo
        onChangeMonth={onChangeMonth}
        setCurrentDay={setCurrentDay}
        currentDate={currentDate}
      />
      <CalendarTodoList tasks={currentDayTasks} date={{ year, month, day: currentDay }} />
    </section>
  );
};

export default CalendarBody;
