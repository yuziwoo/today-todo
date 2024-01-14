import { convertDateToNumber } from 'src/utills/converter';
import { compareIsPast } from './compareIsPast';
import { Task } from '../../types/todo';

export const makeSingleManageTask = (task: Task) => ({
  checked: false,
  isPast: compareIsPast(convertDateToNumber({ year: task.year, month: task.month, day: task.day })),
  task,
});
