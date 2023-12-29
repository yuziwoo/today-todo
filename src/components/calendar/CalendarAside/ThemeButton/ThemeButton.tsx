import { useDispatch, useSelector } from 'react-redux';
import './themeButton.css';
import { RootState } from 'src/store/store';
import { toggleDarkMode } from 'src/store/slice/darkModeSlice';

const ThemeButton = () => {
  const dispatch = useDispatch();
  const darkmode = useSelector((state: RootState) => state.darkMode.value);

  const switchDarkMode = () => {
    dispatch(toggleDarkMode());
  };

  const text = {
    darkmode: ['다', '크', '모', '드', ''],
    lightmode: ['라', '이', '트', '모', '드'],
  };

  return (
    <div className={`button-wrap theme-button ${darkmode ? 'darkmode' : 'lightmode'}`}>
      <button onClick={switchDarkMode}>
        <div className="img-wrap">
          <img src="./assets/icons/png/icon-darkmode.png" alt="darkmode icon" />
          <img src="./assets/icons/png/icon-lightmode.png" alt="lightmode icon" />
          <img src="./assets/icons/png/icon-darkmode.png" alt="darkmode icon" />
        </div>
      </button>
      <div className="text-wrap">
        {darkmode
          ? text.darkmode.map((letter, index) => (
              <div className="text">
                <span>{letter}</span>
                <span>{text.lightmode[index]}</span>
              </div>
            ))
          : text.lightmode.map((letter, index) => (
              <div className="text">
                <span>{letter}</span>
                <span>{text.darkmode[index]}</span>
              </div>
            ))}
      </div>
    </div>
  );
};

export default ThemeButton;
