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
