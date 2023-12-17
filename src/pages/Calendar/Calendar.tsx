import { useReducer } from 'react';
import './style/calendar.css';
import calendarReducer from './reducer/calendar-reducer';
import MonthSelector from '../../components/calendar/MonthSelector/MonthSelector';
import CalendarTable from '../../components/calendar/CalendarTable/CalendarTable';

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

      <CalendarTable />
    </div>
  );
};

export default Calendar;
