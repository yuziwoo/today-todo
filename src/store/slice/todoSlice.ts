import { createSlice } from '@reduxjs/toolkit';
import { tasks } from '../../mocks/data/tasks';
import { LOCAL_STORAGE_KEY, TODO_API } from '../../constants/API';
import { saveLocalStorage } from '../../api/todoAPI/saveLocalStorage';
import { Tasks } from '../../types/todo';
import { toggleSingleTask } from 'src/api/todoAPI/toggleSingleTask';
import { toggleRepeatTask } from 'src/api/todoAPI/toggleRepeatTask';
import { EditorStateProps } from '../../types/editorTypes';
import { getTaskRemovedState } from 'src/api/todoAPI/getTaskRemovedState';
import { getTaskAddedState } from 'src/api/todoAPI/getTaskAddedState';
import { getTodoCount } from 'src/api/todoAPI/getTodoCount';
import { MESSAGE } from 'src/constants/MESSAGE';
import { ManageStateProps } from 'src/types/manageTypes';
import { getFewTasksRemovedTodo } from 'src/api/todoAPI/getFewTasksRemovedTodo';

export const todoSlice = createSlice({
  name: 'todo',
  initialState: tasks,
  reducers: {
    setTodo(state: Tasks) {
      const todoInStorage = localStorage.getItem(LOCAL_STORAGE_KEY.todo);

      if (todoInStorage === null) {
        saveLocalStorage(state);
        return state;
      }
      const parsedTodo = JSON.parse(todoInStorage);
      return parsedTodo;
    },

    saveTodo(state: Tasks) {
      saveLocalStorage(state);
    },

    toggleTask(state: Tasks, action) {
      const { year, month, day, id, repeat, complete } = action.payload;

      if (repeat) {
        toggleRepeatTask({ state, id, year, month, day, complete });
        return;
      }

      toggleSingleTask({ state, id, complete });
    },

    addTask(state, { payload }: { payload: EditorStateProps }) {
      const id = state.initialId;

      if (getTodoCount(state) >= TODO_API.maxLength) {
        alert(MESSAGE.todo.todoIsFull);
        return;
      }

      const newState = getTaskAddedState({
        todoState: state,
        editorState: payload,
        id,
      });
      newState.initialId = id + 1;

      return newState;
    },

    updateTask(state, { payload }: { payload: EditorStateProps }) {
      const removedState = getTaskRemovedState({
        todoState: { ...state },
        editorState: { ...payload },
      });

      const newState = getTaskAddedState({
        todoState: { ...removedState },
        editorState: { ...payload },
        id: payload.task.id,
      });

      return newState;
    },

    removeTask(state, { payload }: { payload: EditorStateProps }) {
      const newState = getTaskRemovedState({
        todoState: { ...state },
        editorState: { ...payload },
      });
      return newState;
    },

    removeFewTasks(state, { payload }: { payload: ManageStateProps }) {
      const newState = getFewTasksRemovedTodo({
        todoState: { ...state },
        manageState: { ...payload },
      });
      return newState;
    },
  },
});

export const { setTodo, saveTodo, toggleTask, addTask, updateTask, removeTask, removeFewTasks } =
  todoSlice.actions;
export default todoSlice.reducer;
