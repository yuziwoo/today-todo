import { useEffect, useRef, useState } from 'react';
import './calendarAside.css';
import ThemeButton from './ThemeButton/ThemeButton';
import AsideTrigger from './AsideTrigger/AsideTrigger';

const CalendarAside = () => {
  const [asideSwitch, setAsideSwitch] = useState('off');
  const isTurningOff = useRef(false);
  const asideTransitionTime = 300;

  useEffect(() => {
    if (asideSwitch === 'turning-off') {
      const timeoutId = setTimeout(() => {
        setAsideSwitch('off');
        isTurningOff.current = false;
      }, asideTransitionTime);

      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [asideSwitch]);

  const handleAsideTrigger = () => {
    if (asideSwitch !== 'on' && !isTurningOff.current) {
      setAsideSwitch('on');
      return;
    }
    if (!isTurningOff.current) {
      setAsideSwitch('turning-off');
      isTurningOff.current = true;
    }
  };

  return (
    <>
      <section className={`calendar-aside calendar-aside-${asideSwitch}`}>
        <div className="shadow" onClick={handleAsideTrigger}></div>
        <div className="section-division left-side">
          <ThemeButton />
        </div>
        <div className="section-division right-side">
          <div className="button-wrap">
            <button>
              <img src="./assets/icons/png/icon-edit.png" alt="edit icon" />
            </button>
            <p>할 일 추가</p>
          </div>

          <div className="button-wrap">
            <button>
              <img src="./assets/icons/png/icon-calendar.png" alt="calendar icon" />
            </button>
            <p>일정 관리</p>
          </div>
        </div>
      </section>

      <AsideTrigger asideSwitch={asideSwitch} onClickHandler={handleAsideTrigger} />
    </>
  );
};

export default CalendarAside;
