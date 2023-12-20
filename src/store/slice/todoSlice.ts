import { createSlice } from '@reduxjs/toolkit';
import { tasks } from '../../mocks/data/tasks';
import { LOCAL_STORAGE_KEY } from '../../constants/API';
import { saveLocalStorage } from '../../api/todo/saveLocalStorage';
import { Tasks } from '../../types/todo';

export const todoSlice = createSlice({
  name: 'todo',
  initialState: tasks,
  reducers: {
    setTodo(state) {
      const todoInStorage = localStorage.getItem(LOCAL_STORAGE_KEY.todo);

      if (todoInStorage === null) {
        saveLocalStorage(state);
        return;
      }

      const parsedTodo = JSON.parse(todoInStorage);
      state = parsedTodo;
    },

    toggleSingleTask(state, action) {
      const toggle = !action.payload.task.complete;
      const index = state.tasks.findIndex((task) => task.id === action.payload.task.id);
      const newTask = { ...state.tasks[index], complete: toggle };
      state.tasks[index] = newTask;
    },
  },
});

export const { setTodo, toggleSingleTask } = todoSlice.actions;
export default todoSlice.reducer;
