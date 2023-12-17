import { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './store/store';
import { toggleDarkMode, darkModeOn } from './store/slice/darkModeSlice';

import { LOCAL_STORAGE_KEY } from './constants/API';
import Calendar from './pages/Calendar';

import './common.css';
import './app.css';

const App = () => {
  const dispatch = useDispatch();
  const darkMode = useSelector((state: RootState) => state.darkMode.value);

  const switchDarkMode = () => {
    dispatch(toggleDarkMode());
  };

  const setDarkModeOn = () => {
    dispatch(darkModeOn());
  }

  useEffect(() => {
    const darkModeInStorage = localStorage.getItem('darkmode');
    localStorage.setItem(
      LOCAL_STORAGE_KEY.darkmode,
      darkModeInStorage === null ? `${darkMode}` : darkModeInStorage
    );

    if (darkModeInStorage === 'true') {
      setDarkModeOn();
    }
    // eslint-disable-next-line
  }, []);

  return (
    <div className={`App${darkMode ? ' darkmode' : ''}`}>
      <main className="stage">
        <Calendar />
        <p onClick={switchDarkMode}>{`${darkMode}`}</p>
      </main>
    </div>
  );
};

export default App;
