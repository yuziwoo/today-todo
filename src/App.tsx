import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './store/store';
import { toggleDarkMode, darkModeOn } from './store/slice/darkModeSlice';
import { LOCAL_STORAGE_KEY } from './constants/API';
import Calendar from './pages/Calendar/Calendar';

import './common.css';
import './app.css';
import { importExistingValues } from './store/slice/todoSlice';

const App = () => {
  const dispatch = useDispatch();
  const darkMode = useSelector((state: RootState) => state.darkMode.value);
  const todo = useSelector((state: RootState) => state.todo);

  const switchDarkMode = () => {
    dispatch(toggleDarkMode());
  };

  useEffect(() => {
    const darkModeInStorage = localStorage.getItem(LOCAL_STORAGE_KEY.darkmode);
    const shouldSetDarkModeOn = darkModeInStorage === 'true';

    localStorage.setItem(
      LOCAL_STORAGE_KEY.darkmode,
      darkModeInStorage === null ? `${darkMode}` : darkModeInStorage
    );

    if (shouldSetDarkModeOn) {
      dispatch(darkModeOn());
    }

    const todoInStorage = localStorage.getItem(LOCAL_STORAGE_KEY.todo);
    if (todoInStorage === null) {
      localStorage.setItem(LOCAL_STORAGE_KEY.todo, JSON.stringify(todo));
    }

    if (todoInStorage !== null) {
      dispatch(importExistingValues(JSON.parse(todoInStorage)));
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const todoInStorage = localStorage.getItem(LOCAL_STORAGE_KEY.todo);
    if (todoInStorage !== null) {
      const todoList = JSON.parse(todoInStorage);
    }
  }, [todo]);

  return (
    <div className={`App${darkMode ? ' darkmode' : ''}`}>
      <main className="stage">
        <Calendar todo={todo} />
        <p onClick={switchDarkMode}>{`${darkMode}`}</p>
      </main>
    </div>
  );
};

export default App;
