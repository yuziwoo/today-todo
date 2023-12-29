export type TaskProps = {
  id: number;
  year: number;
  month: number;
  day: number;
  workToDo: string;
  complete: boolean;
};

type TaskDateProps = Pick<TaskProps, 'year' | 'month' | 'day'>;

export type RepeatDayTaskProps = Pick<TaskProps, 'id' | 'workToDo'> & {
  start: number;
  end: null | number;
  complete: TaskDateProps[];
};
export type RepeatWeekTaskProps = RepeatDayTaskProps & { repeat: number[] };
export type RepeatMonthTaskProps = RepeatDayTaskProps & { repeat: { day: number } };
export type RepeatYearTaskProps = RepeatDayTaskProps & { repeat: { month: number; day: number } };

export type CompiledTaskProps = Pick<TaskProps, 'id' | 'day' | 'workToDo' | 'complete'> & {
  repeat: boolean;
};

export type TasksProps = {
  initialId: number;
  tasks: TaskProps[];
  repeatTasks: {
    day: RepeatDayTaskProps[];
    week: RepeatWeekTaskProps[];
    month: RepeatMonthTaskProps[];
    year: RepeatYearTaskProps[];
  };
};

export type monthInfoProps = {
  year: number;
  month: number;
  firstDay: number;
  lastDay: number;
};

export type monthInfoPropsWithTask<T> = monthInfoProps & { tasks: T };

// 여기부터 리뉴얼된 값 위에는 다 지우기
export type Task = {
  id: number;
  year: number;
  month: number;
  day: number;
  works: string;
  complete: boolean;
};

export type DayRepeatTask = Pick<Task, 'id' | 'works'> & {
  start: number;
  end: null | number;
  complete: Pick<Task, 'year' | 'month' | 'day'>[];
};

type RepeatTask<T> = DayRepeatTask & {
  repeat: T;
};

export type WeekRepeatTask = RepeatTask<number[]>;
export type MonthRepeatTask = RepeatTask<{ day: number }>;
export type YearRepeatTask = RepeatTask<{ month: number; day: number }>;
type RepeatTasksProps = {
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
