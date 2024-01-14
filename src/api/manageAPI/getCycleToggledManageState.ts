import {
  ManageShowOption,
  ManageStateProps,
  ManageStateTasksProps,
  ManageTaskProps,
} from 'src/types/manageTypes';
import {
  Cycle,
  DayRepeatTask,
  MonthRepeatTask,
  Task,
  WeekRepeatTask,
  YearRepeatTask,
} from 'src/types/todo';

interface GetCycleToggledManageStateProps {
  checked: boolean;
  option: ManageShowOption;
  state: ManageStateProps;
  cycle: Cycle;
}

export const getCycleToggledManageState = ({
  checked,
  option,
  state,
  cycle,
}: GetCycleToggledManageStateProps): ManageStateProps => {
  const newState = { ...state };
  const newList = newState[cycle as keyof ManageStateTasksProps].map((task) => {
    const newTask = { ...task };
    if (option === 'all') return { ...task, checked };
    if (task.isPast) return { ...task, checked };
    return newTask;
  });

  switch (cycle) {
    case 'single':
      return { ...newState, single: newList as ManageTaskProps<Task>[] };
    case 'day':
      return { ...newState, day: newList as ManageTaskProps<DayRepeatTask>[] };
    case 'week':
      return { ...newState, week: newList as ManageTaskProps<WeekRepeatTask>[] };
    case 'month':
      return { ...newState, month: newList as ManageTaskProps<MonthRepeatTask>[] };
    case 'year':
      return { ...newState, year: newList as ManageTaskProps<YearRepeatTask>[] };
  }
};
