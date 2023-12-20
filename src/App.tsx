import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from './store/store';
import { toggleDarkMode, setDarkMode } from './store/slice/darkModeSlice';
import Calendar from './pages/Calendar/Calendar';

import './common.css';
import './app.css';
import { setTodo } from './store/slice/todoSlice';
import CalendarPage from './pages/CalendarPage/CalendarPage';
import { getMonthInfo } from './api/calendarAPI/getMonthInfo';
import { fetchCalendarData } from './api/calendarAPI/fetchCalendarData';

const App = () => {
  const dispatch = useDispatch<AppDispatch>();
  const darkMode = useSelector((state: RootState) => state.darkMode.value);
  const todo = useSelector((state: RootState) => state.todo);

  const switchDarkMode = () => {
    dispatch(toggleDarkMode());
  };

  useEffect(() => {
    dispatch(setDarkMode());
    dispatch(setTodo());

    // 오늘 날짜로 달력을 초기 세팅
    const { year, month } = getMonthInfo(new Date());
    dispatch(fetchCalendarData({ year, month }));

    // eslint-disable-next-line
  }, []);

  return (
    <div className={`App${darkMode ? ' darkmode' : ''}`}>
      <main className="stage">
        <CalendarPage />
        <Calendar todo={todo} />
        <p onClick={switchDarkMode}>{`${darkMode}`}</p>
      </main>
    </div>
  );
};

export default App;
