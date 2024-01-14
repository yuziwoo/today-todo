import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from './store/store';
import { Routes, Route } from 'react-router-dom';
import CalendarPage from './pages/CalendarPage/CalendarPage';

import { setDarkMode } from './store/slice/darkModeSlice';
import { saveTodo, setTodo } from './store/slice/todoSlice';
import { getInitialTodo } from './api/todoAPI/getInitialTodo';
import { setCalendarData } from './api/calendarAPI/setCalendarData';
import './common.css';
import './app.css';
import ManagePage from './pages/ManagePage/ManagePage';
import Editor from './components/Editor/Editor';

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

  const handleSetLoading = (state: boolean) => {
    setLoading(state);
  };

  return (
    <div className={`App${darkMode ? ' darkmode' : ''}`}>
      <main className="stage">
        <Routes>
          <Route
            path="/"
            element={<CalendarPage todo={todo} loading={loading} setLoading={handleSetLoading} />}
          ></Route>
          <Route path="/managetask" element={<ManagePage todo={todo} loading={loading} />}></Route>
        </Routes>

        <Editor />
      </main>
    </div>
  );
};

export default App;
