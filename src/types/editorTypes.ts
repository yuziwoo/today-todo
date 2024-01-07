import {
  Cycle,
  DayRepeatTask,
  MonthRepeatTask,
  Task,
  WeekRepeatTask,
  YearRepeatTask,
} from './todo';

export type EditorStateProps = {
  editing: boolean;
  firstEdit: boolean;
  originCycle: Cycle;
  repeatCycle: Cycle;
  startDay: number;
  endDay: number;
  useEndDay: boolean;
  repeatDayOfWeek: number[];
  task: Task | DayRepeatTask | WeekRepeatTask | MonthRepeatTask | YearRepeatTask;
};

export type EditorTaskData = Pick<
  EditorStateProps,
  'repeatCycle' | 'startDay' | 'endDay' | 'useEndDay' | 'repeatDayOfWeek' | 'task'
>;

export type EditorTaskPayload =
  | {
      task: Task;
      cycle: 'single';
    }
  | {
      task: DayRepeatTask;
      cycle: 'day';
    }
  | {
      task: WeekRepeatTask;
      cycle: 'week';
    }
  | {
      task: MonthRepeatTask;
      cycle: 'month';
    }
  | {
      task: YearRepeatTask;
      cycle: 'year';
    };
