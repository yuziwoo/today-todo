import { createSlice } from '@reduxjs/toolkit';
import { tasks } from '../../mocks/data/tasks';
import { LOCAL_STORAGE_KEY } from '../../constants/API';
import { saveLocalStorage } from '../../api/todo/saveLocalStorage';
import { Task, Tasks } from '../../types/todo';
import { findRepeatTask } from '../../api/todo/findRepeatTask';
import { MESSAGE } from '../../constants/MESSAGE';

const toggleNoRepeatTask = ({
  state,
  id,
  complete,
}: Pick<Task, 'id' | 'complete'> & { state: Tasks }) => {
  const index = state.tasks.findIndex((task) => task.id === id);
  const newTask = { ...state.tasks[index], complete: !complete };
  state.tasks[index] = newTask;
};

const toggleRepeatTask = ({
  state,
  id,
  year,
  month,
  day,
  complete,
}: Pick<Task, 'id' | 'year' | 'month' | 'day' | 'complete'> & { state: Tasks }) => {
  // 완료한 task를 삭제하기
  const { cycle, index } = findRepeatTask({ task: state, id });
  if (cycle === null) throw Error(MESSAGE.error.toggleRepeatTask);

  if (complete) {
    const newCompleteList = [...state.repeatTasks[`${cycle}`][index].complete];
    const completeListIndex = newCompleteList.findIndex(
      (data) => data.year === year && data.month === month && data.day === day
    );
    newCompleteList.splice(completeListIndex, 1);
    state.repeatTasks[`${cycle}`][index].complete = [...newCompleteList];
    return;
  }

  const newCompleteList = [{ year, month, day }, ...state.repeatTasks[`${cycle}`][index].complete];
  state.repeatTasks[`${cycle}`][index].complete = [...newCompleteList];
};

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

      toggleNoRepeatTask({ state, id, complete });
    },
  },
});

export const { setTodo, saveTodo, toggleTask } = todoSlice.actions;
export default todoSlice.reducer;
