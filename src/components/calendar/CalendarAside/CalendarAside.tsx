import { useEffect, useRef, useState } from 'react';
import './calendarAside.css';
import ThemeButton from './ThemeButton/ThemeButton';
import AsideTrigger from './AsideTrigger/AsideTrigger';
import AsideEditButton from './AsideEditButton/AsideEditButton';
import { BasicMonthData, OneDayData } from 'src/types/calendarTypes';

interface CalendarAsideProps {
  currentDay: OneDayData & BasicMonthData;
}

const CalendarAside = ({ currentDay }: CalendarAsideProps) => {
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
          <AsideEditButton onClick={handleAsideTrigger} currentDay={currentDay} />
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
