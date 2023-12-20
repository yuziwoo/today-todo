import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './store/store';
import { toggleDarkMode, setDarkMode } from './store/slice/darkModeSlice';
import { LOCAL_STORAGE_KEY } from './constants/API';
import Calendar from './pages/Calendar/Calendar';

import './common.css';
import './app.css';
import { importExistingValues } from './store/slice/todoSlice';
import { saveLocalStorage } from './api/todo/saveLocalStorage';

const App = () => {
  const dispatch = useDispatch();
  const darkMode = useSelector((state: RootState) => state.darkMode.value);
  const todo = useSelector((state: RootState) => state.todo);

  const switchDarkMode = () => {
    dispatch(toggleDarkMode());
  };

  useEffect(() => {
    dispatch(setDarkMode());

    const todoInStorage = localStorage.getItem(LOCAL_STORAGE_KEY.todo);
    if (todoInStorage === null) {
      saveLocalStorage(todo);
    }

    if (todoInStorage !== null) {
      const parsedTodo = JSON.parse(todoInStorage);
      dispatch(importExistingValues(parsedTodo));
      console.log(parsedTodo.tasks[0].complete, 'outside');
    }
    // eslint-disable-next-line
  }, []);

  // useEffect(() => {
  //   saveLocalStorage(todo);
  //   console.log(todo.tasks[0].complete, 'update')
  // }, [todo]);

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
