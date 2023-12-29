import { useDispatch, useSelector } from 'react-redux';
import CalendarHeader from '../../components/calendar/CalendarHeader/CalendarHeader';
import { RootState, AppDispatch } from '../../store/store';
import { useEffect, useState } from 'react';
import { getMonthInfo } from '../../api/calendarAPI/getMonthInfo';
import {
  setCalendarData,
  setLastMonthCalendarData,
  setNextMonthCalendarData,
} from '../../api/calendarAPI/setCalendarData';
import { saveTodo, setTodo } from '../../store/slice/todoSlice';
import { ChangeMonthProps } from '../../types/calendarTypes';
import CalendarBody from '../../components/calendar/CalendarBody/CalendarBody';
import CalendarDayInfo from '../../components/calendar/CalendarDayInfo/CalendarDayInfo';
import { LOCAL_STORAGE_KEY } from '../../constants/API';
import CalendarAside from '../../components/calendar/CalendarAside/CalendarAside';

const CalendarPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const todo = useSelector((state: RootState) => state.todo);

  // target month 전후로 한 달씩 총 3달의 달력 정보를 저장한다.
  const calendar = useSelector((state: RootState) => state.calendarData);

  // CalendarHeader의 자연스러운 rotateNumber 이펙트를 위해 prevMonth 데이터를 사용
  const [prevMonth, setPrevMonth] = useState({ year: 0, month: 0 });
  const [currentDay, setCurrentDay] = useState(new Date().getDate());
  const currentDayData = {
    ...calendar[1].datas[currentDay - 1],
    year: calendar[1].year,
    month: calendar[1].month,
  };

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

    dispatch(setCalendarData({ year, month, todo: initialTodo }));
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

  return (
    <div className="calendar" style={{ position: 'relative', minHeight: '100vh' }}>
      <CalendarHeader
        calendar={calendar}
        prevMonth={prevMonth}
        onChangeMonth={handleChangeMonth}
        onChangeToLastMonth={handleChangeToLastMonth}
        onChangeToNextMonth={handleChangeToNextMonth}
        todo={todo}
      />
      <CalendarBody
        calendar={calendar}
        onChangeToLastMonth={handleChangeToLastMonth}
        onChangeToNextMonth={handleChangeToNextMonth}
        setCurrentDay={setCurrentDay}
        currentDay={currentDay}
      />
      <CalendarDayInfo data={currentDayData} />
      <CalendarAside />
    </div>
  );
};

export default CalendarPage;
