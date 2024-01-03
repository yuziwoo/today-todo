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

    addDayRepeatTask(state: Tasks, action) {
      const initialId = state.initialId;
      state.initialId = initialId + 1;

      const { startDay, works, endDay, useEndDay } = action.payload;
      const newTask = {
        id: initialId,
        start: startDay,
        end: useEndDay ? endDay : null,
        works,
        complete: [],
      };

      const newTasks = { ...state.repeatTasks };
      newTasks.day.push(newTask);
      state.repeatTasks = { ...newTasks };
    },

    addWeekRepeatTask(state: Tasks, action) {
      const initialId = state.initialId;
      state.initialId = initialId + 1;

      const { startDay, works, endDay, useEndDay, repeatDayOfWeek } = action.payload;
      const newTask = {
        id: initialId,
        start: startDay,
        repeat: repeatDayOfWeek,
        end: useEndDay ? endDay : null,
        works,
        complete: [],
      };

      const newTasks = { ...state.repeatTasks };
      newTasks.week.push(newTask);
      state.repeatTasks = { ...newTasks };
    },

    addMonthRepeatTask(state: Tasks, action) {
      const initialId = state.initialId;
      state.initialId = initialId + 1;

      const { startDay, works, endDay, useEndDay, repeatDay } = action.payload;
      const newTask = {
        id: initialId,
        start: startDay,
        repeat: {
          day: repeatDay,
        },
        end: useEndDay ? endDay : null,
        works,
        complete: [],
      };

      const newTasks = { ...state.repeatTasks };
      newTasks.month.push(newTask);
      state.repeatTasks = { ...newTasks };
    },

    addYearRepeatTask(state: Tasks, action) {
      const initialId = state.initialId;
      state.initialId = initialId + 1;

      const { startDay, works, endDay, useEndDay, repeatDay, repeatMonth } = action.payload;
      const newTask = {
        id: initialId,
        start: startDay,
        repeat: {
          month: repeatMonth,
          day: repeatDay,
        },
        end: useEndDay ? endDay : null,
        works,
        complete: [],
      };

      const newTasks = { ...state.repeatTasks };
      newTasks.year.push(newTask);
      state.repeatTasks = { ...newTasks };
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
  },
});

export const {
  setTodo,
  saveTodo,
  toggleTask,
  addSingleTask,
  addDayRepeatTask,
  addWeekRepeatTask,
  addMonthRepeatTask,
  addYearRepeatTask,
  updateSingleTask,
  updateRepeatTask,
} = todoSlice.actions;
export default todoSlice.reducer;
