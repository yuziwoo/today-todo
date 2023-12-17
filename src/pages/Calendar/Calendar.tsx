import { useReducer } from 'react';
import './style/calendar.css';
import calendarReducer from './reducer/calendar-reducer';
import MonthSelector from '../../components/calendar/MonthSelector/MonthSelector';

const today = new Date();

const initialTargetDate = {
  year: today.getFullYear(),
  month: today.getMonth(),
  day: today.getDate(),
};

const Calendar = ({ darkmode }: { darkmode: boolean }) => {
  const [targetDate, dispatchDate] = useReducer(calendarReducer, initialTargetDate);

  const handleNextMonth = () => {
    dispatchDate({ type: 'changeToNextMonth' });
  };

  const handleLastMonth = () => {
    dispatchDate({ type: 'changeToLastMonth' });
  };

  return (
    <div className="calendar">
      <MonthSelector
        darkmode={darkmode}
        date={targetDate}
        onLastMonth={handleLastMonth}
        onNextMonth={handleNextMonth}
      />

      <section className="table">
        <div className="tr">
          <span>일</span>
        </div>
        <div className="tr">
          <span>월</span>
        </div>
        <div className="tr">
          <span>화</span>
        </div>
        <div className="tr">
          <span>수</span>
        </div>
        <div className="tr">
          <span>목</span>
        </div>
        <div className="tr">
          <span>금</span>
        </div>
        <div className="tr">
          <span>토</span>
        </div>
      </section>
    </div>
  );
};

export default Calendar;
