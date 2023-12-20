import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './store/store';
import { toggleDarkMode, setDarkMode } from './store/slice/darkModeSlice';
import Calendar from './pages/Calendar/Calendar';

import './common.css';
import './app.css';
import { setTodo } from './store/slice/todoSlice';

const App = () => {
  const dispatch = useDispatch();
  const darkMode = useSelector((state: RootState) => state.darkMode.value);
  const todo = useSelector((state: RootState) => state.todo);

  const switchDarkMode = () => {
    dispatch(toggleDarkMode());
  };

  useEffect(() => {
    dispatch(setDarkMode());
    dispatch(setTodo());
    // eslint-disable-next-line
  }, []);

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
