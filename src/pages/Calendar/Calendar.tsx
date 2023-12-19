import { useEffect, useReducer, useState } from 'react';
import './style/calendar.css';
import calendarReducer from './reducer/calendar-reducer';
import MonthSelector from '../../components/calendar/MonthSelector/MonthSelector';
import CalendarTable from '../../components/calendar/CalendarTable/CalendarTable';
import { CalendarDateProps, MonthArray } from '../../types/calendar';
import { compileDateToCalendarDateProps, getThreeMonth } from '../../utills/calendar';
import CalendarLoading from '../../components/effect/CalendarLoading';

const initialTargetDate: CalendarDateProps = compileDateToCalendarDateProps(new Date());
const initialMonthArray: MonthArray = [{ day: 1, restDay: null }];

const Calendar = () => {
  const [targetDate, dispatchDate] = useReducer(calendarReducer, initialTargetDate);
  const [threeMonth, setThreeMonth] = useState<MonthArray[]>([
    initialMonthArray,
    initialMonthArray,
    initialMonthArray,
  ]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const resetThreeMonth = async () => {
      try {
        const newThreeMonth = await getThreeMonth(targetDate.year, targetDate.month);
        setThreeMonth(newThreeMonth);
      } finally {
        setLoading(false);
      }
    };
    resetThreeMonth();
  }, [targetDate.month, targetDate.year]);

  const handleChangeDate = ({ year, month, day }: CalendarDateProps) => {
    setLoading(true);
    dispatchDate({ type: 'change', year, month, day });
  };

  const handleNextMonth = () => {
    setLoading(true);
    dispatchDate({ type: 'changeToNextMonth' });
  };

  const handleLastMonth = () => {
    setLoading(true);
    dispatchDate({ type: 'changeToLastMonth' });
  };

  return (
    <div className="calendar">
      <MonthSelector
        date={targetDate}
        onLastMonth={handleLastMonth}
        onNextMonth={handleNextMonth}
      />

      {loading ? (
        <CalendarLoading />
      ) : (
        <CalendarTable date={targetDate} threeMonth={threeMonth} onChangeDate={handleChangeDate} />
      )}
    </div>
  );
};

export default Calendar;
