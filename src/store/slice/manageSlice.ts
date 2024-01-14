import { createSlice } from '@reduxjs/toolkit';
import { getCycleToggledManageState } from 'src/api/manageAPI/getCycleToggledManageState';
import { makeRepeatManageTask } from 'src/api/manageAPI/makeRepeatManageTask';
import { makeSingleManageTask } from 'src/api/manageAPI/makeSingleManageTask';
import { toggleAllManageTasks, togglePastManageTasks } from 'src/api/manageAPI/toggleManageTasks';
import { MESSAGE } from 'src/constants/MESSAGE';
import { initialManageState } from 'src/mocks/data/manage';
import { ManageStateProps, ManageTaskProps } from 'src/types/manageTypes';
import {
  DayRepeatTask,
  MonthRepeatTask,
  Task,
  Tasks,
  WeekRepeatTask,
  YearRepeatTask,
} from 'src/types/todo';

export const manageSlice = createSlice({
  name: 'manage',
  initialState: initialManageState,
  reducers: {
    setManagerState(state, { payload }: { payload: Tasks }): ManageStateProps {
      const { tasks, repeatTasks } = payload;
      
      const single = [...tasks].map(makeSingleManageTask);
      const day = [...repeatTasks.day].map(makeRepeatManageTask<DayRepeatTask>);
      const week = [...repeatTasks.week].map(makeRepeatManageTask<WeekRepeatTask>);
      const month = [...repeatTasks.month].map(makeRepeatManageTask<MonthRepeatTask>);
      const year = [...repeatTasks.year].map(makeRepeatManageTask<YearRepeatTask>);

      return {
        option: state.option,
        single,
        day,
        week,
        month,
        year,
      };
    },

    setManagerShowOption(state, action) {
      if (action.payload === 'past' || action.payload === 'all') {
        const newState = toggleAllManageTasks({ checked: false, state: { ...state } });
        return { ...newState, option: action.payload };
      }

      throw new Error(MESSAGE.manage.invalidOption);
    },

    toggleManageTasks(state, action) {
      const checked = action.payload.checked;
      const option = action.payload.option;

      if (option === 'past') return togglePastManageTasks({ checked, state: { ...state } });
      return toggleAllManageTasks({ checked, state: { ...state } });
    },

    toggleAllManageTasksInCycle(state, action) {
      const { checked, option, cycle } = action.payload;
      return getCycleToggledManageState({ checked, option, state, cycle });
    },

    toggleOneManageTaskInCycle(state, action) {
      const { cycle, id } = action.payload;
      const getToggleCycle = <T>(
        manageTask: T extends { checked: boolean; task: { id: number } } ? T : never
      ) =>
        manageTask.task.id === id ? { ...manageTask, checked: !manageTask.checked } : manageTask;

      switch (cycle) {
        case 'single':
          state.single = state.single.map(getToggleCycle<ManageTaskProps<Task>>);
          break;
        case 'day':
          state.day = state.day.map(getToggleCycle<ManageTaskProps<DayRepeatTask>>);
          break;
        case 'week':
          state.week = state.week.map(getToggleCycle<ManageTaskProps<WeekRepeatTask>>);
          break;
        case 'month':
          state.month = state.month.map(getToggleCycle<ManageTaskProps<MonthRepeatTask>>);
          break;
        case 'year':
          state.year = state.year.map(getToggleCycle<ManageTaskProps<YearRepeatTask>>);
          break;
      }
    },
  },
});

export const {
  setManagerState,
  setManagerShowOption,
  toggleManageTasks,
  toggleAllManageTasksInCycle,
  toggleOneManageTaskInCycle,
} = manageSlice.actions;
export default manageSlice.reducer;
