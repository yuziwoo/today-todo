import { createSlice } from '@reduxjs/toolkit';
import { tasks } from '../../mocks/data/tasks';
import { LOCAL_STORAGE_KEY } from '../../constants/API';
import { saveLocalStorage } from '../../api/todoAPI/saveLocalStorage';
import { Task, Tasks } from '../../types/todo';
import { findRepeatTask } from '../../api/todoAPI/findRepeatTask';
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

    addSingleTask(state: Tasks, action) {
      const initialId = state.initialId;
      state.initialId = initialId + 1;

      const { year, month, day, works } = action.payload;
      const newTask = {
        id: initialId,
        year,
        month,
        day,
        works,
        complete: false,
      };

      const newTasks = [...state.tasks, newTask];
      state.tasks = [...newTasks];
    },

    addRepeatTask(state: Tasks, action) {
      const initialId = state.initialId;
      state.initialId = initialId + 1;

      const { startDay, works, endDay, useEndDay, repeatDayOfWeek, repeatDay, repeatMonth, cycle } =
        action.payload;

      let newTask = {
        id: initialId,
        start: startDay,
        end: useEndDay ? endDay : null,
        works,
        complete: [],
      };

      switch (cycle) {
        case 'day':
          state.repeatTasks.day.push(newTask);
          break;
        case 'week':
          state.repeatTasks.week.push({ ...newTask, repeat: [...repeatDayOfWeek] });
          break;
        case 'month':
          state.repeatTasks.month.push({
            ...newTask,
            repeat: {
              day: repeatDay,
            },
          });
          break;
        case 'year':
          state.repeatTasks.year.push({
            ...newTask,
            repeat: {
              month: repeatMonth,
              day: repeatDay,
            },
          });
      }
    },

    updateSingleTask(state: Tasks, action) {
      const { id, year, month, day, works } = action.payload;
      const currentTaskIndex = state.tasks.findIndex((task) => task.id === id);
      const currentTask = state.tasks[currentTaskIndex];
      const newTask = {
        id,
        year,
        month,
        day,
        works,
        complete: currentTask.complete,
      };

      state.tasks[currentTaskIndex] = { ...newTask };
    },

    updateRepeatTask(state: Tasks, action) {
      const {
        id,
        startDay,
        works,
        endDay,
        useEndDay,
        cycle,
        repeatDayOfWeek,
        repeatDay,
        repeatMonth,
      } = action.payload;
      const repeatTasksKey = cycle as keyof typeof state.repeatTasks;
      const currentTaskIndex = state.repeatTasks[repeatTasksKey].findIndex(
        (task) => task.id === id
      );
      const currentTask = state.repeatTasks[repeatTasksKey][currentTaskIndex];

      let newTask = {
        id,
        start: startDay,
        end: useEndDay ? endDay : null,
        works,
        complete: currentTask.complete,
      };

      switch (cycle) {
        case 'day':
          state.repeatTasks.day[currentTaskIndex] = { ...newTask };
          break;
        case 'week':
          state.repeatTasks.week[currentTaskIndex] = {
            ...newTask,
            repeat: [...repeatDayOfWeek],
          };
          break;
        case 'month':
          state.repeatTasks.month[currentTaskIndex] = {
            ...newTask,
            repeat: {
              day: repeatDay,
            },
          };
          break;
        case 'year':
          state.repeatTasks.year[currentTaskIndex] = {
            ...newTask,
            repeat: {
              month: repeatMonth,
              day: repeatDay,
            },
          };
      }
    },

    removeSingleTask(state, action) {
      const id = action.payload;
      const idx = state.tasks.findIndex((task) => task.id === id);

      const newTasks = [...state.tasks];
      newTasks.splice(idx, 1);

      state.tasks = [...newTasks];
    },

    removeRepeatTask(state, action) {
      const { id, cycle } = action.payload;

      switch (cycle) {
        case 'day': {
          const newTasks = [...state.repeatTasks.day].filter((task) => task.id !== id);
          state.repeatTasks.day = newTasks;
          break;
        }

        case 'week': {
          const newTasks = [...state.repeatTasks.week].filter((task) => task.id !== id);
          state.repeatTasks.week = newTasks;
          break;
        }

        case 'month': {
          const newTasks = [...state.repeatTasks.month].filter((task) => task.id !== id);
          state.repeatTasks.month = newTasks;
          break;
        }

        case 'year': {
          const newTasks = [...state.repeatTasks.year].filter((task) => task.id !== id);
          state.repeatTasks.year = newTasks;
          break;
        }
      }
    },
  },
});

export const {
  setTodo,
  saveTodo,
  toggleTask,
  addSingleTask,
  addRepeatTask,
  updateSingleTask,
  updateRepeatTask,
  removeSingleTask,
  removeRepeatTask,
} = todoSlice.actions;
export default todoSlice.reducer;
