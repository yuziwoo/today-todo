import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'src/store/store';
import { toggleCalendarMonthSelector } from 'src/store/slice/requestSlice';
import YearSelector from '../DateSelector/YearSelector';
import MonthSelector from '../DateSelector/MonthSelector';
import { IconArrowLeft, IconCheck } from '../../icons/icons';
import { MonthSelectWaveSvg } from '../../assets/svg/svgs';
import { Tasks } from 'src/types/todo';
import { BasicMonthData, ChangeMonthProps } from 'src/types/calendarTypes';
import './calendarMonthSelect.css';

interface CalendarMonthSelectProps {
  date: BasicMonthData;
  todo: Tasks;
  onChangeMonth: ({ year, month, todo }: ChangeMonthProps) => void;
}

const CalendarMonthSelect = ({ date, todo, onChangeMonth }: CalendarMonthSelectProps) => {
  const dispatch = useDispatch();
  const requestState = useSelector((state: RootState) => state.request);
  const [dateState, setDateState] = useState({ year: date.year, month: date.month });
  const editing = requestState.calendarMonthSelectEditing;

  useEffect(() => {
    setDateState({ year: date.year, month: date.month });
  }, [date]);

  const handleChangeYear = (newYear: number) => {
    setDateState({ ...dateState, year: newYear });
  };
  const handleChangeMonth = (newMonth: number) => {
    setDateState({ ...dateState, month: newMonth });
  };

  const handleCancelSelector = () => {
    if (requestState.calendarMonthSelectEditing) dispatch(toggleCalendarMonthSelector());
    setDateState({ year: date.year, month: date.month });
  };
  const handleSubmit = () => {
    onChangeMonth({ year: dateState.year, month: dateState.month, todo });
    handleCancelSelector();
  };

  return (
    <div className={`calendar-month-select${editing ? ' editing' : ''}`}>
      <div className="shadow" onClick={handleCancelSelector}></div>
      <div className="content">
        <div className="title flex-center">
          <button
            className="close event-hover hover-soft flex-center"
            onClick={handleCancelSelector}
          >
            <IconArrowLeft color="black" />
          </button>
          <h1>날짜를 선택해주세요.</h1>
        </div>

        <div className="selector">
          {dateState.year > 0 && (
            <div className="selector-wrap flex-center">
              <div className="highlight"></div>
              <YearSelector
                initialYear={dateState.year}
                onYearChange={handleChangeYear}
                resetTrigger={editing}
              />
              <MonthSelector
                initialMonth={dateState.month}
                onMonthChange={handleChangeMonth}
                resetTrigger={editing}
              />
            </div>
          )}
        </div>

        <div className="bottom-wave">
          <MonthSelectWaveSvg color="white" />
        </div>

        <div className="submit-wrap">
          <button className="submit event-hover hover-soft flex-center" onClick={handleSubmit}>
            <IconCheck color="white" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CalendarMonthSelect;
