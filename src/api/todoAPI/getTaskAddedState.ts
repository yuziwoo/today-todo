import { Cycle, Tasks, Task, RepeatTaskCompleteElement } from '../../types/todo';
import { EditorStateProps } from '../../types/editorTypes';
import { convertNumberToDateData } from 'src/utills/converter';
import { makeRepeatTask } from './makeRepeatTask';
import { addRepeatTaskInRepeatTasks } from './addRepeatTaskInRepeatTasks';

interface GetTaskAddedStateProps {
  todoState: Tasks;
  editorState: EditorStateProps;
  id: number;
}

export const getTaskAddedState = ({
  todoState,
  editorState,
  id,
}: GetTaskAddedStateProps): Tasks => {
  const newState = { ...todoState };
  const works = editorState.task.works.trim();

  if (editorState.repeatCycle === 'single') {
    const newTask = makeSingleTask(editorState, id, works);
    const tasks = [...newState.tasks, newTask];
    return { ...newState, tasks };
  }

  if (editorState.originCycle === editorState.repeatCycle) {
    const taskWithCycle = makeRepeatTask(
      editorState,
      id,
      editorState.task.complete as RepeatTaskCompleteElement[]
    );
    const newRepeatTasks = addRepeatTaskInRepeatTasks({
      repeatTasks: { ...newState.repeatTasks },
      taskWithCycle,
    });

    return { ...newState, repeatTasks: newRepeatTasks };
  }

  const taskWithCycle = makeRepeatTask(editorState, id);
  const newRepeatTasks = addRepeatTaskInRepeatTasks({
    repeatTasks: { ...newState.repeatTasks },
    taskWithCycle,
  });

  return { ...newState, repeatTasks: newRepeatTasks };
};

const makeSingleTask = (
  state: EditorStateProps,
  id: number,
  works: string,
  complete: boolean = false
): Task => {
  const { year, month, day } = convertNumberToDateData(state.startDay);
  const newTask = {
    id,
    year,
    month,
    day,
    works,
    complete,
  };

  return newTask;
};
