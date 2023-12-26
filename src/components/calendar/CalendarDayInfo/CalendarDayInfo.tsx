import { CALENDAR_API } from '../../../constants/API';
import { BasicDateData, BasicMonthData, OneDayData } from '../../../types/calendarTypes';
import { calcDday } from '../../../utills/calendarUtils';
import CalendarTodoList from './CalendarTodoList/CalendarTodoList';
import './calendarDayInfo.css';

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

  return (
    <section className="calendar-dayInfo">
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

      <CalendarTodoList year={year} month={month} day={day} todoList={todo} />
    </section>
  );
};

export default CalendarDayInfo;
