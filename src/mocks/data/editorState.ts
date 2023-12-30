import { convertDateToNumber } from 'src/utills/converter';
import { EditorStateProps } from '../../types/editorTypes';

const today = new Date();
const year = today.getFullYear();
const month = today.getMonth();
const day = today.getDate();
const startday = convertDateToNumber({ year, month, day });

export const editorState: EditorStateProps = {
  editing: false,
  firstEdit: true,
  repeatCycle: 'single',
  startday,
  task: {
    id: 0,
    year,
    month,
    day,
    works: '',
    complete: false,
  },
};
