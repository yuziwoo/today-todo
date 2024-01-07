import { BasicMonthData } from 'src/types/calendarTypes';
import './calendarHeaderTitle.css';
import { CALENDAR_API } from 'src/constants/API';
import { useDispatch } from 'react-redux';
import { toggleCalendarMonthSelector } from 'src/store/slice/requestSlice';

interface CalendarHeaderTitleProps {
  currentMonth: BasicMonthData;
  prevMonth: BasicMonthData;
}

const monthArr = ['DECEMBER', ...CALENDAR_API.month, 'JANUARY'];

const CalendarHeaderTitle = ({ currentMonth, prevMonth }: CalendarHeaderTitleProps) => {
  const dispatch = useDispatch();
  const triggerSelector = () => {
    dispatch(toggleCalendarMonthSelector());
  };

  return (
    <div className="calendar-header-title">
      <button className="event-hover color-reverse" onClick={triggerSelector}>
        <div className={`month current-${currentMonth.month} prev-${prevMonth.month}`}>
          <div className="wrap" style={{ transform: `translateY(-${currentMonth.month + 1}00%)` }}>
            {monthArr.map((month, index) => (
              <h1 key={index} style={{ transform: `translateY(${index}00%)` }}>
                {month}
              </h1>
            ))}
          </div>
        </div>

        <div className="year">
          <h2>{currentMonth.year}</h2>
        </div>
      </button>
    </div>
  );
};

export default CalendarHeaderTitle;
