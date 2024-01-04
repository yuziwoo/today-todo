import { useDispatch, useSelector } from 'react-redux';
import { toggleCalendarYearMonthSelector } from 'src/store/slice/requestSlice';
import { RootState } from 'src/store/store';
import { ChangeMonthProps } from 'src/types/calendarTypes';
import { Tasks } from 'src/types/todo';

import './calendarYearMonthSelector.css';
import { useEffect, useState } from 'react';
import YearSelector from '../DateSelector/YearSelector';
import MonthSelector from '../DateSelector/MonthSelector';
import { IconExit } from '../../icons/icons';

interface CalendarYearMonthSelectorProsp {
  year: number;
  month: number;
  onChangeMonth: ({ year, month, todo }: ChangeMonthProps) => void;
  todo: Tasks;
}

const CalendarYearMonthSelector = ({
  year,
  month,
  onChangeMonth,
  todo,
}: CalendarYearMonthSelectorProsp) => {
  const requestState = useSelector((state: RootState) => state.request);
  const isSelectorOpen = requestState.calendarYearMonthSelector;
  const [selectorClosing, setSelectorClosing] = useState(false);
  const dispatch = useDispatch();

  const [date, setDate] = useState({ year, month });
  const setYear = (newYear: number) => {
    setDate({ ...date, year: newYear });
  };
  const setMonth = (newMonth: number) => {
    setDate({ ...date, month: newMonth });
  };

  useEffect(() => {
    setDate({ year, month });
  }, [year, month]);

  const toggleSelector = () => {
    if (!selectorClosing) {
      dispatch(toggleCalendarYearMonthSelector());
      setSelectorClosing(true);
      onChangeMonth({ year: date.year, month: date.month, todo });
      setTimeout(() => {
        setSelectorClosing(false);
      }, 300);
    }
  };

  return (
    <section
      className={`calendar-year-month-selector${isSelectorOpen ? ' active' : ''}${
        selectorClosing ? ' closing' : ''
      }`}
    >
      <div className="shadow" onClick={toggleSelector}></div>
      <div className="selector">
        {/* <div className="header">
          <button className="canHover close">
            <IconExit color="black" />
          </button>
          <h1>날짜 선택</h1>
        </div> */}
        <div className="body">
          <div className="white-highlight"></div>
          <YearSelector initialYear={year} onYearChange={setYear} />
          <MonthSelector initialMonth={month} onMonthChange={setMonth} />
        </div>
      </div>
    </section>
  );
};

export default CalendarYearMonthSelector;
