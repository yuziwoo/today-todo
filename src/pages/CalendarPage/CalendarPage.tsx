import { useDispatch, useSelector } from 'react-redux';
import CalendarHeader from '../../components/calendar/CalendarHeader/CalendarHeader';
import { RootState, AppDispatch } from '../../store/store';
import { useEffect, useState } from 'react';
import { getMonthInfo } from '../../api/calendarAPI/getMonthInfo';
import { setCalendarData } from '../../api/calendarAPI/setCalendarData';
import { setTodo } from '../../store/slice/todoSlice';
import { ChangeMonthProps } from '../../types/calendarTypes';
import CalendarBody from '../../components/calendar/CalendarBody/CalendarBody';

const CalendarPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const calendar = useSelector((state: RootState) => state.calendarData);
  const [prevDate, setPrevDate] = useState({ year: 0, month: 0 });
  const todo = useSelector((state: RootState) => state.todo);

  const handleChangeMonth = ({ year, month, todo }: ChangeMonthProps) => {
    dispatch(setCalendarData({ year, month, todo }));
  };

  useEffect(() => {
    dispatch(setTodo());

    // 오늘 날짜로 달력을 초기 세팅
    const { year, month } = getMonthInfo(new Date());
    dispatch(setCalendarData({ year, month, todo }));
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    return () => {
      setPrevDate({ year: calendar[1].year, month: calendar[1].month });
    };
  }, [calendar]);

  return (
    <div className="calendar">
      <CalendarHeader
        calendar={calendar}
        prevDate={prevDate}
        onChangeMonth={handleChangeMonth}
        todo={todo}
      />
      <CalendarBody calendar={calendar} />
    </div>
  );
};

export default CalendarPage;
