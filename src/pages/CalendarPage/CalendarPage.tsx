import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { RootState, AppDispatch } from '../../store/store';
import { saveTodo, setTodo } from '../../store/slice/todoSlice';
import { updateTaskInCalendar } from 'src/store/slice/calendarSlice';
import { ChangeMonthProps } from '../../types/calendarTypes';
import { getInitialTodo } from 'src/api/todoAPI/getInitialTodo';
import {
  setCalendarData,
  setLastMonthCalendarData,
  setNextMonthCalendarData,
} from '../../api/calendarAPI/setCalendarData';
import CalendarBg from '../../components/calendar/CalendarBg/CalendarBg';
import CalendarHeader from '../../components/calendar/CalendarHeader/CalendarHeader';
import CalendarBody from '../../components/calendar/CalendarBody/CalendarBody';
import CalendarAside from '../../components/calendar/CalendarAside/CalendarAside';
import Editor from '../../components/Editor/Editor';
import CalendarYearMonthSelector from '../../components/calendar/CalendarYearMonthSelector/CalendarYearMonthSelector';
import './calendarPage.css';

const CalendarPage = () => {
  // redux
  const dispatch = useDispatch<AppDispatch>();
  const todo = useSelector((state: RootState) => state.todo);
  const requester = useSelector((state: RootState) => state.request);
  const calendar = useSelector((state: RootState) => state.calendarData);

  // useState
  const [prevMonth, setPrevMonth] = useState({ year: 0, month: 0 });
  const [currentDay, setCurrentDay] = useState(new Date().getDate());
  const [loading, setLoading] = useState(true);

  // 데이터 활용
  const { year, month } = calendar[1];
  const currentDate = { year, month, day: currentDay };

  // event hanlder
  const handleChangeMonth = ({ year, month, todo }: ChangeMonthProps) => {
    dispatch(setCalendarData({ year, month, todo }));
    setCurrentDay(1);
  };
  const handleChangeToNextMonth = ({ year, month, todo }: ChangeMonthProps) => {
    dispatch(setNextMonthCalendarData({ year, month, todo }));
    setCurrentDay(1);
  };
  const handleChangeToLastMonth = ({ year, month, todo }: ChangeMonthProps) => {
    dispatch(setLastMonthCalendarData({ year, month, todo }));
    setCurrentDay(1);
  };

  const initialize = async () => {
    const initialTodo = getInitialTodo(todo);
    await dispatch(setTodo());
    await dispatch(
      setCalendarData({
        year: new Date().getFullYear(),
        month: new Date().getMonth(),
        todo: initialTodo,
      })
    );
    setLoading(false);
  };

  // 어플리케이션 기본값 세팅
  useEffect(() => {
    initialize();
    // eslint-disable-next-line
  }, []);

  // 이전 날짜 저장
  useEffect(() => {
    return () => {
      setPrevMonth({ year: calendar[1].year, month: calendar[1].month });
    };
  }, [calendar]);

  // 로컬스토리지에 데이터 저장
  useEffect(() => {
    dispatch(saveTodo());
    // eslint-disable-next-line
  }, [todo]);

  // 캘린더에 기록된 할 일들을 새로 업데이트
  useEffect(() => {
    dispatch(updateTaskInCalendar(todo));
    // eslint-disable-next-line
  }, [requester.calendarTodo]);

  return (
    <div className="calendar" id="calendar">
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
      <Editor />
      <CalendarYearMonthSelector
        year={year}
        month={month}
        todo={todo}
        onChangeMonth={handleChangeMonth}
      />
    </div>
  );
};

export default CalendarPage;
