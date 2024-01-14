import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { RootState, AppDispatch } from '../../store/store';
import { updateTaskInCalendar } from 'src/store/slice/calendarSlice';
import { ChangeMonthProps } from '../../types/calendarTypes';
import { Tasks } from 'src/types/todo';
import {
  setCalendarData,
  setLastMonthCalendarData,
  setNextMonthCalendarData,
} from '../../api/calendarAPI/setCalendarData';
import CalendarBg from '../../components/calendar/CalendarBg/CalendarBg';
import CalendarHeader from '../../components/calendar/CalendarHeader/CalendarHeader';
import CalendarBody from '../../components/calendar/CalendarBody/CalendarBody';
import CalendarAside from '../../components/calendar/CalendarAside/CalendarAside';
import CalendarMonthSelect from '../../components/calendar/CalendarMonthSelect/CalendarMonthSelect';

interface CalendarPageProps {
  todo: Tasks;
  loading: boolean;
  setLoading: (state: boolean) => void;
}

const CalendarPage = ({ todo, loading, setLoading }: CalendarPageProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const requester = useSelector((state: RootState) => state.request);
  const calendar = useSelector((state: RootState) => state.calendarData);

  const [prevMonth, setPrevMonth] = useState({ year: 0, month: 0 });
  const [currentDay, setCurrentDay] = useState(new Date().getDate());

  const { year, month } = calendar[1];
  const currentDate = { year, month, day: currentDay };

  // event hanlder
  const handleChangeMonth = ({ year, month, todo }: ChangeMonthProps) => {
    setLoading(true);
    dispatch(setCalendarData({ year, month, todo }));
    setCurrentDay(1);
  };
  const handleChangeToNextMonth = ({ year, month, todo }: ChangeMonthProps) => {
    setLoading(true);
    dispatch(setNextMonthCalendarData({ year, month, todo }));
    setCurrentDay(1);
  };
  const handleChangeToLastMonth = ({ year, month, todo }: ChangeMonthProps) => {
    setLoading(true);
    dispatch(setLastMonthCalendarData({ year, month, todo }));
    setCurrentDay(1);
  };

  useEffect(() => {
    setLoading(false);
    return () => {
      setPrevMonth({ year: calendar[1].year, month: calendar[1].month });
    };
    // eslint-disable-next-line
  }, [calendar]);

  // 캘린더에 기록된 할 일들을 새로 업데이트
  useEffect(() => {
    dispatch(updateTaskInCalendar(todo));
    // eslint-disable-next-line
  }, [requester.calendarTodo]);

  return (
    <div
      className="calendar"
      style={{ position: 'relative', minHeight: '100vh', overflow: 'hidden', backgroundColor: 'var(--color-bg-1)' }}
    >
      <CalendarBg />
      <CalendarHeader
        calendar={calendar}
        prevMonth={prevMonth}
        todo={todo}
        onChangeToLastMonth={handleChangeToLastMonth}
        onChangeToNextMonth={handleChangeToNextMonth}
      />
      <CalendarBody
        calendar={calendar}
        currentDay={currentDay}
        loading={loading}
        setCurrentDay={setCurrentDay}
        onChangeMonth={handleChangeMonth}
        onChangeToLastMonth={handleChangeToLastMonth}
        onChangeToNextMonth={handleChangeToNextMonth}
      />
      <CalendarAside currentDate={currentDate} />
      <CalendarMonthSelect date={{ year, month }} todo={todo} onChangeMonth={handleChangeMonth} />
    </div>
  );
};

export default CalendarPage;
