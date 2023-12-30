import { useDispatch, useSelector } from 'react-redux';
import './editorDateSelect.css';
import { RootState } from 'src/store/store';
import { convertDateToNumber, convertNumberToDateData } from 'src/utills/converter';
import YearSelector from '../../DateSelector/YearSelector';
import { useEffect, useState } from 'react';
import { updateEditorTaskStartDay } from 'src/store/slice/editorSlice';
import MonthSelector from '../../DateSelector/MonthSelector';
import DaySelector from '../../DateSelector/DaySelector';

const EditorDateSelect = () => {
  const editorState = useSelector((state: RootState) => state.editor);
  const dispatch = useDispatch();

  const { year, month, day } = convertNumberToDateData(editorState.startDay);
  const [date, setDate] = useState({ year, month, day });

  useEffect(() => {
    const { year, month, day } = convertNumberToDateData(editorState.startDay);
    setDate({ year, month, day });
  }, [editorState.startDay]);

  const setYear = (newYear: number) => {
    setDate({ ...date, year: newYear });
  };
  const setMonth = (newMonth: number) => {
    setDate({ ...date, month: newMonth });
  };
  const setDay = (newDay: number) => {
    setDate({ ...date, day: newDay });
  };

  useEffect(() => {
    const startDay = convertDateToNumber({ year: date.year, month: date.month, day: date.day });
    dispatch(updateEditorTaskStartDay(startDay));
    // eslint-disable-next-line
  }, [date]);

  return (
    <div className="editor-date-selector">
      <div className="white-highlight"></div>
      <YearSelector initialYear={year} onYearChange={setYear} />
      <MonthSelector initialMonth={month} onMonthChange={setMonth} />
      <DaySelector year={year} month={month} initialDay={day} onDayChange={setDay} />
    </div>
  );
};

export default EditorDateSelect;
