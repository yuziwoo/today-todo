import { createSlice } from '@reduxjs/toolkit';
import { tasks } from '../../mocks/data/tasks';

export const todoSlice = createSlice({
  name: 'todo',
  initialState: tasks,
  reducers: {
    importExistingValues: (state, action) => {
      state = action.payload;
    },
    completeSingleTask: (state, action) => {
      const actionTask = action.payload;
      const index = state.tasks.findIndex((task) => task.id === actionTask.id);
      state.tasks[index].complete = true;
    },
  },
});

export const { importExistingValues, completeSingleTask } = todoSlice.actions;
export default todoSlice.reducer;