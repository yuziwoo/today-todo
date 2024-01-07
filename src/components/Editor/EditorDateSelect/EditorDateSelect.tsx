import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'src/store/store';

import YearSelector from '../../calendar/DateSelector/YearSelector';
import MonthSelector from '../../calendar/DateSelector/MonthSelector';
import DaySelector from '../../calendar/DateSelector/DaySelector';

import { convertDateToNumber, convertNumberToDateData } from 'src/utills/converter';
import { updateEditorTaskStartDay } from 'src/store/slice/editorSlice';
import { vibrater } from 'src/utills/vibrater';
import './editorDateSelect.css';

interface EditorDateSelectProps {
  editing: boolean;
}

const EditorDateSelect = ({ editing }: EditorDateSelectProps) => {
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
    if (editing) vibrater(50);
  };
  const setMonth = (newMonth: number) => {
    setDate({ ...date, month: newMonth });
    if (editing) vibrater(50);
  };
  const setDay = (newDay: number) => {
    setDate({ ...date, day: newDay });
    if (editing) vibrater(50);
  };

  useEffect(() => {
    const startDay = convertDateToNumber({ year: date.year, month: date.month, day: date.day });
    dispatch(updateEditorTaskStartDay(startDay));
    // eslint-disable-next-line
  }, [date]);

  return (
    <div className="editor-date-selector">
      <div className="highlight"></div>
      <YearSelector initialYear={year} onYearChange={setYear} resetTrigger={editorState.editing} />
      <MonthSelector
        initialMonth={month}
        onMonthChange={setMonth}
        resetTrigger={editorState.editing}
      />
      <DaySelector
        year={year}
        month={month}
        initialDay={day}
        onDayChange={setDay}
        resetTrigger={editorState.editing}
      />
    </div>
  );
};

export default EditorDateSelect;
