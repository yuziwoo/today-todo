type TaskProps = {
  id: number;
  year: number;
  month: number;
  day: number;
  workToDo: string;
  complete: boolean;
};

type TaskDateProps = Pick<TaskProps, 'year' | 'month' | 'day'>;

type RepeatDayTaskProps = Pick<TaskProps, 'id' | 'workToDo'> & {
  start: TaskDateProps;
  end: null | TaskDateProps;
  complete: TaskDateProps[];
};

type RepeatWeekTaskProps = RepeatDayTaskProps & { repeat: number[] };
type RepeatMonthTaskProps = RepeatDayTaskProps & { repeat: { day: number } };
type RepeatYearTaskProps = RepeatDayTaskProps & { repeat: { month: number; day: number } };

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
