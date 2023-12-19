import { useEffect, useReducer, useState } from 'react';
import './style/calendar.css';
import calendarReducer from './reducer/calendar-reducer';
import MonthSelector from '../../components/calendar/MonthSelector/MonthSelector';
import CalendarTable from '../../components/calendar/CalendarTable/CalendarTable';
import { CalendarDateProps, MonthArray } from '../../types/calendar';
import { compileDateToCalendarDateProps, getThreeMonth } from '../../utills/calendar';

const initialTargetDate: CalendarDateProps = compileDateToCalendarDateProps(new Date());
const initialMonthArray: MonthArray = [{ day: 1, restDay: null }];

const Calendar = () => {
  const [targetDate, dispatchDate] = useReducer(calendarReducer, initialTargetDate);
  const [threeMonth, setThreeMonth] = useState<MonthArray[]>([
    initialMonthArray,
    initialMonthArray,
    initialMonthArray,
  ]);

  useEffect(() => {
    const resetThreeMonth = async () => {
      const newThreeMonth = await getThreeMonth(targetDate.year, targetDate.month);
      setThreeMonth(newThreeMonth);
    };
    resetThreeMonth();
  }, [targetDate.month, targetDate.year]);

  const handleChangeDate = ({ year, month, day }: CalendarDateProps) => {
    dispatchDate({ type: 'change', year, month, day });
  };

  const handleNextMonth = () => {
    dispatchDate({ type: 'changeToNextMonth' });
  };

  const handleLastMonth = () => {
    dispatchDate({ type: 'changeToLastMonth' });
  };

  return (
    <div className="calendar">
      <MonthSelector
        date={targetDate}
        onLastMonth={handleLastMonth}
        onNextMonth={handleNextMonth}
      />

      <CalendarTable date={targetDate} threeMonth={threeMonth} onChangeDate={handleChangeDate} />
    </div>
  );
};

export default Calendar;
