import { EditorStateProps } from 'src/types/editorTypes';
import { Task } from 'src/types/todo';
import { convertNumberToDateData } from 'src/utills/converter';

export const makeSingleTask = (state: EditorStateProps, id: number): Task => {
  const works = state.task.works.trim();
  const { year, month, day } = convertNumberToDateData(state.startDay);
  const newTask = {
    id,
    year,
    month,
    day,
    works,
    complete: false,
  };

  return newTask;
};
