import { compareIsPast } from './compareIsPast';
import { DayRepeatTask } from '../../types/todo';

export const makeRepeatManageTask = <T extends Pick<DayRepeatTask, 'end'>>(task: T) => ({
  checked: false,
  isPast: compareIsPast(task.end),
  task,
});
