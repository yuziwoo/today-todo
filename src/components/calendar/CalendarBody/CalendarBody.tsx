import { CalendarDataType, ChangeMonthProps } from '../../../types/calendarTypes';
import CalendarTable from './CalendarTable/CalendarTable';
import CalendarDayInfo from './CalendarDayInfo/CalendarDayInfo';
import CalendarTodoList from './CalendarTodoList/CalendarTodoList';
import CalendarLoading from 'src/components/effect/CalendarLoading';
import './calendarBody.css';

interface CalendarBodyProps {
  calendar: CalendarDataType[];
  currentDay: number;
  loading: boolean;
  onChangeMonth: ({ year, month, todo }: ChangeMonthProps) => void;
  onChangeToNextMonth: ({ year, month, todo }: ChangeMonthProps) => void;
  onChangeToLastMonth: ({ year, month, todo }: ChangeMonthProps) => void;
  setCurrentDay: (day: number) => void;
}

const CalendarBody = ({
  calendar,
  currentDay,
  loading,
  onChangeMonth,
  onChangeToNextMonth,
  onChangeToLastMonth,
  setCurrentDay,
}: CalendarBodyProps) => {
  if (loading || calendar[1].year === 0) return <CalendarLoading minHeight={250} />;
  const { year, month } = calendar[1];
  const { dateName, restDay } = calendar[1].datas[currentDay - 1];
  const currentDayTasks = [...calendar[1].datas[currentDay - 1].todo];
  const currentDate = {
    year,
    month,
    day: currentDay,
    dateName,
    restDay,
  };

  return (
    <section className="calendar-body">
      <div className="calendar-body-content">
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
      </div>
    </section>
  );
};

export default CalendarBody;
