import { CALENDAR_API } from 'src/constants/API';
import { BasicDateData, ChangeMonthProps, RestData } from '../../../../types/calendarTypes';
import { getDday } from 'src/utills/calendarUtils';
import { useSelector } from 'react-redux';
import { RootState } from 'src/store/store';
import './calendarDayInfo.css';

interface CalendarDayInfoProps {
  onChangeMonth: ({ year, month, todo }: ChangeMonthProps) => void;
  setCurrentDay: (day: number) => void;
  currentDate: BasicDateData & RestData;
}

const CalendarDayInfo = ({ onChangeMonth, setCurrentDay, currentDate }: CalendarDayInfoProps) => {
  const todo = useSelector((state: RootState) => state.todo);
  const { year, month, day, dateName, restDay } = currentDate;
  const dayOfWeek = CALENDAR_API.dayOfWeek[new Date(year, month, day).getDay()];
  const dday = getDday({ year, month, day });
  const getTextColor = () => {
    if (restDay || dayOfWeek === CALENDAR_API.dayOfWeek[0]) return ' red';
    if (dayOfWeek === CALENDAR_API.dayOfWeek[6]) return ' blue';
    return '';
  };

  const handleTodayButtonClick = () => {
    const today = new Date();
    if (year !== today.getFullYear() || month !== today.getMonth()) {
      onChangeMonth({ year: today.getFullYear(), month: today.getMonth(), todo });
    }
    setCurrentDay(today.getDate());
  };

  return (
    <div className={`calendar-day-info${getTextColor()}`}>
      <div className="left">
        <h1 className="date">
          {day} {dayOfWeek}
        </h1>
        <p className="name">{dateName !== null ? dateName : ''}</p>
      </div>
      <div className="right">
        <div className="dday">
          <span>{dday}</span>
        </div>
        <button className="today event-hover hover-soft" onClick={handleTodayButtonClick}>
          <span>TODAY</span>
        </button>
      </div>
    </div>
  );
};

export default CalendarDayInfo;
