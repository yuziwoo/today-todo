import { CALENDAR_API } from '../../../constants/API';
import { BasicDateData, BasicMonthData, OneDayData } from '../../../types/calendarTypes';
import { calcDday } from '../../../utills/calendarUtils';
import CalendarTodoList from './CalendarTodoList/CalendarTodoList';
import './calendarDayInfo.css';
import CompleteEffect from '../../effect/CompleteEffect';
import { useEffect, useState } from 'react';

interface CalendarDayInfoProps {
  data: OneDayData & BasicMonthData;
}

const CalendarDayInfo = ({ data }: CalendarDayInfoProps) => {
  const { year, month, day, dateName, restDay, todo } = data;

  const dayOfWeek = new Date(year, month, day).getDay();
  const dayColor = restDay || dayOfWeek === 0 ? ' red' : dayOfWeek === 6 ? ' blue' : '';

  const getDday = ({ year, month, day }: BasicDateData): string => {
    const dday = calcDday({ year, month, day });
    return dday < 0 ? `D - ${Math.abs(dday)}` : dday > 0 ? `D + ${dday}` : `오늘`;
  };

  const [playAnimation, setPlayAnimation] = useState(false);
  const [firstVisit, setFirstVisit] = useState(true);
  const setPlayAnimationOff = () => {
    setPlayAnimation(false);
  };

  const setFirstVisitFalse = () => {
    setFirstVisit(false);
  };

  useEffect(() => {
    setFirstVisit(true);
  }, [year, month, day]);

  useEffect(() => {
    if (todo?.every((task) => task.complete) && !firstVisit) {
      setPlayAnimation(true);
      setFirstVisit(true);
    }
    // eslint-disable-next-line
  }, [todo]);

  return (
    <section className="calendar-dayInfo">
      <div className={`complete-animation${playAnimation ? ' play' : ''}`}>
        <CompleteEffect trigger={playAnimation} setTriggerOff={setPlayAnimationOff} />
      </div>

      <div className="about-day">
        <div className={`info${dayColor}`}>
          <h1 className="date">
            {data.day} {CALENDAR_API.dayOfWeek[dayOfWeek]}
          </h1>
          <p className="date-name">{dateName !== null ? dateName : ''}</p>
        </div>
        <div className="dday">
          <span>{getDday({ year, month, day })}</span>
        </div>
      </div>

      <CalendarTodoList
        year={year}
        month={month}
        day={day}
        todoList={todo}
        setFirstVisitFalse={setFirstVisitFalse}
      />
    </section>
  );
};

export default CalendarDayInfo;
