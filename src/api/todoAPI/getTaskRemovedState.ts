import { EditorStateProps } from 'src/types/editorTypes';
import { Tasks } from 'src/types/todo';
import { Task, RepeatTasksProps, Cycle } from '../../types/todo';

interface GetTaskRemovedStateProps {
  todoState: Tasks;
  editorState: EditorStateProps;
}

export const getTaskRemovedState = ({
  todoState,
  editorState,
}: GetTaskRemovedStateProps): Tasks => {
  const newState = { ...todoState };
  const id = editorState.task.id;
  const cycle = editorState.originCycle;

  if (cycle === 'single') {
    const newTasks = getRemovedSingleTasks({ id, tasks: [...newState.tasks] });
    return { ...newState, tasks: newTasks };
  }

  const newTasks = getRemovedRepeatTask({
    repeatTasks: { ...newState.repeatTasks },
    id,
    cycle,
  });
  return { ...newState, repeatTasks: newTasks };
};

const getRemovedSingleTasks = ({ id, tasks }: { id: number; tasks: Task[] }): Task[] => {
  const idx = tasks.findIndex((task) => task.id === id);
  if (idx === -1) return [...tasks];

  const newTasks = [...tasks];
  newTasks.splice(idx, 1);

  return newTasks;
};

interface GetRemovedRepeatTaskProps {
  repeatTasks: RepeatTasksProps;
  id: number;
  cycle: Cycle;
}

const getRemovedRepeatTask = ({
  repeatTasks,
  id,
  cycle,
}: GetRemovedRepeatTaskProps): RepeatTasksProps => {
  const newTasks = { ...repeatTasks };

  switch (cycle) {
    case 'day':
      const newDays = [...newTasks.day].filter((task) => task.id !== id);
      newTasks.day = [...newDays];
      break;
    case 'week':
      const newWeeks = [...newTasks.week].filter((task) => task.id !== id);
      newTasks.week = [...newWeeks];
      break;
    case 'month':
      const newMonth = [...newTasks.month].filter((task) => task.id !== id);
      newTasks.month = [...newMonth];
      break;
    case 'year':
      const newYears = [...newTasks.year].filter((task) => task.id !== id);
      newTasks.year = [...newYears];
      break;
  }

  return newTasks;
};
