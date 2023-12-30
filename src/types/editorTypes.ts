import { DayRepeatTask, MonthRepeatTask, Task, WeekRepeatTask, YearRepeatTask } from './todo';

export type EditorStateProps = {
  editing: boolean;
  firstEdit: boolean;
  repeatCycle: 'single' | 'day' | 'week' | 'month' | 'year';
  startday: number;
  task: Task | DayRepeatTask | WeekRepeatTask | MonthRepeatTask | YearRepeatTask;
};
