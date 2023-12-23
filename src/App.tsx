import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './store/store';
import { toggleDarkMode, setDarkMode } from './store/slice/darkModeSlice';

import './common.css';
import './app.css';
import CalendarPage from './pages/CalendarPage/CalendarPage';

const App = () => {
  const dispatch = useDispatch();
  const darkMode = useSelector((state: RootState) => state.darkMode.value);

  const switchDarkMode = () => {
    dispatch(toggleDarkMode());
  };

  useEffect(() => {
    dispatch(setDarkMode());
    // eslint-disable-next-line
  }, []);

  return (
    <div className={`App${darkMode ? ' darkmode' : ''}`}>
      <main className="stage">
        <CalendarPage />
        <p onClick={switchDarkMode}>{`${darkMode}`}</p>
      </main>
    </div>
  );
};

export default App;
