import { ManageStateProps, ManageTaskProps } from 'src/types/manageTypes';
import {
  DayRepeatTask,
  MonthRepeatTask,
  Task,
  Tasks,
  WeekRepeatTask,
  YearRepeatTask,
} from 'src/types/todo';

interface GetFewTasksRemovedTodoProps {
  todoState: Tasks;
  manageState: ManageStateProps;
}

export const getFewTasksRemovedTodo = ({
  todoState,
  manageState,
}: GetFewTasksRemovedTodoProps): Tasks => {
  const tasks = convertManageTaskToTask<ManageTaskProps<Task>[], Task>(manageState.single);

  const day = convertManageTaskToTask<ManageTaskProps<DayRepeatTask>[], DayRepeatTask>(
    manageState.day
  );
  const week = convertManageTaskToTask<ManageTaskProps<WeekRepeatTask>[], WeekRepeatTask>(
    manageState.week
  );
  const month = convertManageTaskToTask<ManageTaskProps<MonthRepeatTask>[], MonthRepeatTask>(
    manageState.month
  );
  const year = convertManageTaskToTask<ManageTaskProps<YearRepeatTask>[], YearRepeatTask>(
    manageState.year
  );
  return { ...todoState, tasks, repeatTasks: { day, week, month, year } };
};

const convertManageTaskToTask = <T extends ManageTaskProps<S>[], S>(manageTasks: T): S[] => {
  const filteredManageTasks = manageTasks.filter((manageTask) => !manageTask.checked);
  const filteredTodo = filteredManageTasks.map((manageTask) => manageTask.task);
  return [...filteredTodo];
};
