import { convertDateToNumber } from 'src/utills/converter';
import { EditorStateProps } from '../../types/editorTypes';
import { getToday, getTommorow } from 'src/utills/calendarUtils';

const { year, month, day } = getToday();
const startDay = convertDateToNumber({ year, month, day });

const tommorow = getTommorow();
const endDay = convertDateToNumber({
  year: tommorow.year,
  month: tommorow.month,
  day: tommorow.day,
});

export const initialEditorState: EditorStateProps = {
  editing: false,
  firstEdit: true,
  originCycle: 'single',
  repeatCycle: 'single',
  startDay,
  endDay,
  useEndDay: false,
  repeatDayOfWeek: [],
  task: {
    id: 0,
    year,
    month,
    day,
    works: '',
    complete: false,
  },
};
