import './calendarPage.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import { RootState, AppDispatch } from '../../store/store';
import { saveTodo, setTodo } from '../../store/slice/todoSlice';

import CalendarHeader from '../../components/calendar/CalendarHeader/CalendarHeader';
import CalendarBody from '../../components/calendar/CalendarBody/CalendarBody';
import CalendarDayInfo from '../../components/calendar/CalendarDayInfo/CalendarDayInfo';
import CalendarAside from '../../components/calendar/CalendarAside/CalendarAside';
import Editor from '../../components/Editor/Editor';

import { getMonthInfo } from '../../api/calendarAPI/getMonthInfo';
import {
  setCalendarData,
  setLastMonthCalendarData,
  setNextMonthCalendarData,
} from '../../api/calendarAPI/setCalendarData';
import { ChangeMonthProps } from '../../types/calendarTypes';
import { LOCAL_STORAGE_KEY } from '../../constants/API';
import { updateTaskInCalendar } from 'src/store/slice/calendarSlice';
import CalendarLoading from 'src/components/effect/CalendarLoading';

const CalendarPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const todo = useSelector((state: RootState) => state.todo);
  const calendar = useSelector((state: RootState) => state.calendarData);
  const requester = useSelector((state: RootState) => state.request);

  // CalendarHeader의 자연스러운 rotateNumber 이펙트를 위해 prevMonth 데이터를 사용
  const [prevMonth, setPrevMonth] = useState({ year: 0, month: 0 });
  const [currentDay, setCurrentDay] = useState(new Date().getDate());
  const currentDayData = {
    ...calendar[1].datas[currentDay - 1],
    year: calendar[1].year,
    month: calendar[1].month,
  };

  const [loading, setLoading] = useState(true);

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
    await dispatch(setTodo());
    const { year, month } = getMonthInfo(new Date());
    const todoInStorage = localStorage.getItem(LOCAL_STORAGE_KEY.todo);
    const initialTodo = todoInStorage === null ? todo : JSON.parse(todoInStorage);

    await dispatch(setCalendarData({ year, month, todo: initialTodo }));

    setLoading(false);
  };

  // 어플리케이션 기본값 세팅
  useEffect(() => {
    initialize();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    return () => {
      setPrevMonth({ year: calendar[1].year, month: calendar[1].month });
    };
  }, [calendar]);

  useEffect(() => {
    dispatch(saveTodo());
    // eslint-disable-next-line
  }, [todo]);

  useEffect(() => {
    dispatch(updateTaskInCalendar(todo));
    // eslint-disable-next-line
  }, [requester.calendarTodo]);

  return (
    <div className="calendar" id="calendar">
      <CalendarHeader
        calendar={calendar}
        prevMonth={prevMonth}
        onChangeMonth={handleChangeMonth}
        onChangeToLastMonth={handleChangeToLastMonth}
        onChangeToNextMonth={handleChangeToNextMonth}
        todo={todo}
      />
      {loading ? (
        <CalendarLoading minHeight={250} />
      ) : (
        <>
          <CalendarBody
            calendar={calendar}
            onChangeToLastMonth={handleChangeToLastMonth}
            onChangeToNextMonth={handleChangeToNextMonth}
            setCurrentDay={setCurrentDay}
            currentDay={currentDay}
          />
          <CalendarDayInfo data={currentDayData} />
        </>
      )}
      <CalendarAside currentDay={currentDayData} />
      <Editor />
    </div>
  );
};

export default CalendarPage;
