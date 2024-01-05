import { EditorTaskPayload } from 'src/types/editorTypes';
import { RepeatTasksProps } from 'src/types/todo';

interface AddRepeatTaskInRepeatTasksProps {
  repeatTasks: RepeatTasksProps;
  taskWithCycle: EditorTaskPayload;
}

export const addRepeatTaskInRepeatTasks = ({
  repeatTasks,
  taskWithCycle,
}: AddRepeatTaskInRepeatTasksProps): RepeatTasksProps => {
  const { task, cycle } = taskWithCycle;

  switch (cycle) {
    case 'day':
      const dayArr = [...repeatTasks.day, task];
      repeatTasks.day = dayArr;
      break;
    case 'week':
      const weekArr = [...repeatTasks.week, task];
      repeatTasks.week = weekArr;
      break;
    case 'month':
      const monthArr = [...repeatTasks.month, task];
      repeatTasks.month = monthArr;
      break;
    case 'year':
      const yearArr = [...repeatTasks.year, task];
      repeatTasks.year = yearArr;
  }

  return { ...repeatTasks };
};
