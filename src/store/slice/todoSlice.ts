import { createSlice } from '@reduxjs/toolkit';
import { tasks } from '../../mocks/data/tasks';

export const todoSlice = createSlice({
  name: 'todo',
  initialState: tasks,
  reducers: {
    importExistingValues(state, action) {
      state = action.payload;
    },
    toggleSingleTask(state, action) {
      const toggle = !action.payload.task.complete;
      const index = state.tasks.findIndex((task) => task.id === action.payload.task.id);
      const newTask = { ...state.tasks[index], complete: toggle };
      state.tasks[index] = newTask;
    },
  },
});

export const { importExistingValues, toggleSingleTask } = todoSlice.actions;
export default todoSlice.reducer;
