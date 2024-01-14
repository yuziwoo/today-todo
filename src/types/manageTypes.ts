import { DayRepeatTask, MonthRepeatTask, Task, WeekRepeatTask, YearRepeatTask } from './todo';

export type BasicManageTaskProps = {
  checked: boolean;
  isPast: boolean;
};

export type ManageTaskProps<T> = BasicManageTaskProps & {
  task: T;
};

export type ManageShowOption = 'all' | 'past';

export type ManageStateTasksProps = {
  single: ManageTaskProps<Task>[];
  day: ManageTaskProps<DayRepeatTask>[];
  week: ManageTaskProps<WeekRepeatTask>[];
  month: ManageTaskProps<MonthRepeatTask>[];
  year: ManageTaskProps<YearRepeatTask>[];
};

export type ManageStateProps = ManageStateTasksProps & { option: ManageShowOption };

export type RandomManageStateTaskList =
  | ManageTaskProps<Task>[]
  | ManageTaskProps<DayRepeatTask>[]
  | ManageTaskProps<WeekRepeatTask>[]
  | ManageTaskProps<MonthRepeatTask>[]
  | ManageTaskProps<YearRepeatTask>[];

export type RandomManageStateTask =
  | ManageTaskProps<Task>
  | ManageTaskProps<DayRepeatTask>
  | ManageTaskProps<WeekRepeatTask>
  | ManageTaskProps<MonthRepeatTask>
  | ManageTaskProps<YearRepeatTask>;
