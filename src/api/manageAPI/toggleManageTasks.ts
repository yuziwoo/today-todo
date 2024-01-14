import { ManageStateProps, ManageTaskProps } from 'src/types/manageTypes';

interface ToggleAllManageTasksProps {
  checked: boolean;
  state: ManageStateProps;
}

interface TogglePastManageTasksProps {
  checked: boolean;
  state: ManageStateProps;
}

export const togglePastManageTasks = ({
  checked,
  state,
}: TogglePastManageTasksProps): ManageStateProps => {
  const newState = { ...state };
  const getToggledTask = <T>(manageTask: ManageTaskProps<T>) => {
    if (manageTask.isPast) return { ...manageTask, checked };
    return { ...manageTask };
  };

  newState.single = state.single.map(getToggledTask);
  newState.day = state.day.map(getToggledTask);
  newState.week = state.week.map(getToggledTask);
  newState.month = state.month.map(getToggledTask);
  newState.year = state.year.map(getToggledTask);
  return newState;
};

export const toggleAllManageTasks = ({
  checked,
  state,
}: ToggleAllManageTasksProps): ManageStateProps => {
  const newState = { ...state };

  newState.single = state.single.map((info) => ({ ...info, checked }));
  newState.day = state.day.map((info) => ({ ...info, checked }));
  newState.week = state.week.map((info) => ({ ...info, checked }));
  newState.month = state.month.map((info) => ({ ...info, checked }));
  newState.year = state.year.map((info) => ({ ...info, checked }));

  return newState;
};
