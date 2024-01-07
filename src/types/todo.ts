export type Task = {
  id: number;
  year: number;
  month: number;
  day: number;
  works: string;
  complete: boolean;
};

export type RepeatTaskCompleteElement = Pick<Task, 'year' | 'month' | 'day'>;

export type DayRepeatTask = Pick<Task, 'id' | 'works'> & {
  start: number;
  end: null | number;
  complete: RepeatTaskCompleteElement[];
};

type RepeatTask<T> = DayRepeatTask & {
  repeat: T;
};

export type WeekRepeatTask = RepeatTask<number[]>;
export type MonthRepeatTask = RepeatTask<{ day: number }>;
export type YearRepeatTask = RepeatTask<{ month: number; day: number }>;

export type RepeatTasksProps = {
  day: DayRepeatTask[];
  week: WeekRepeatTask[];
  month: MonthRepeatTask[];
  year: YearRepeatTask[];
};

export type Tasks = {
  initialId: number;
  tasks: Task[];
  repeatTasks: RepeatTasksProps;
};

export type CompiledTask = Pick<Task, 'id' | 'day' | 'works' | 'complete'> & {
  repeat: boolean;
};

export type RepeatCycle = 'day' | 'week' | 'month' | 'year' | null;

export type RandomTask = Task | DayRepeatTask | WeekRepeatTask | MonthRepeatTask | YearRepeatTask;

export type Cycle = 'single' | 'day' | 'week' | 'month' | 'year';
