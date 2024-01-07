import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from './store/store';
import { setDarkMode } from './store/slice/darkModeSlice';
import { saveTodo, setTodo } from './store/slice/todoSlice';
import CalendarPage from './pages/CalendarPage/CalendarPage';
import './common.css';
import './app.css';
import { getInitialTodo } from './api/todoAPI/getInitialTodo';
import { setCalendarData } from './api/calendarAPI/setCalendarData';

const App = () => {
  const dispatch = useDispatch<AppDispatch>();
  const darkMode = useSelector((state: RootState) => state.darkMode.value);
  const todo = useSelector((state: RootState) => state.todo);
  const [loading, setLoading] = useState(true);

  const initialize = async () => {
    const initialTodo = getInitialTodo(todo);
    dispatch(setDarkMode());
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

  useEffect(() => {
    initialize();
    // eslint-disable-next-line
  }, []);

  // 로컬스토리지에 데이터 저장
  useEffect(() => {
    dispatch(saveTodo());
    // eslint-disable-next-line
  }, [todo]);

  return (
    <div className={`App${darkMode ? ' darkmode' : ''}`}>
      <main className="stage">
        <CalendarPage todo={todo} loading={loading} />
      </main>
    </div>
  );
};

export default App;
