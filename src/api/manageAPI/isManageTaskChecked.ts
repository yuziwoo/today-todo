import { BasicManageTaskProps, ManageShowOption, ManageStateProps } from 'src/types/manageTypes';

export const isManageTaskChecked = <T extends BasicManageTaskProps[]>(
  tasks: T,
  option: ManageShowOption
): boolean => {
  if (option === 'past') {
    return tasks.every((task) => task.checked || task.isPast === false);
  }
  return tasks.every((task) => task.checked);
};

export const isEveryManageTaskChecked = (manageState: ManageStateProps): boolean => {
  const { option, single, day, week, month, year } = manageState;
  return (
    isManageTaskChecked(single, option) &&
    isManageTaskChecked(day, option) &&
    isManageTaskChecked(week, option) &&
    isManageTaskChecked(month, option) &&
    isManageTaskChecked(year, option)
  );
};
