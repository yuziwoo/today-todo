import { CalendarDataType, OneDayData, BasicMonthData } from '../../types/calendarTypes';
import {
  Tasks,
  Task,
  CompiledTask,
  DayRepeatTask,
  WeekRepeatTask,
  MonthRepeatTask,
  YearRepeatTask,
} from '../../types/todo';
import { getDayOfWeek, getMaximumDate } from '../../utills/calendarUtils';
import { convertDateToNumber } from '../../utills/converter';

const restoreTodoData = (data: CalendarDataType): CalendarDataType => {
  const restoredData = data.datas.map((dataObj): OneDayData => ({ ...dataObj, todo: [] }));
  const newData = { ...data, datas: restoredData };

  return newData;
};

const getBasicTasks = ({
  year,
  month,
  tasks,
}: BasicMonthData & { tasks: Task[] }): CompiledTask[] => {
  const list = tasks
    .filter((task) => task.year === year && task.month === month)
    .map((todo) => ({ ...todo, repeat: false }));
  return list;
};

type GetRepeatTaskProps<T> = BasicMonthData & {
  firstDay: number;
  lastDay: number;
  tasks: T;
};

const getDayRepeatTasks = ({
  year,
  month,
  firstDay,
  lastDay,
  tasks,
}: GetRepeatTaskProps<DayRepeatTask[]>) => {
  const todoList: CompiledTask[] = [];
  tasks.forEach((task) => {
    if (task.start <= lastDay && (task.end === null || task.end > firstDay)) {
      let date = Math.max(task.start, firstDay) % 100;
      const dateMax = Math.min(task.end !== null ? task.end : lastDay, lastDay) % 100;
      const completeList = task.complete.filter(
        (date) => date.year === year && date.month === month
      );

      while (date <= dateMax) {
        const day = date;
        todoList.push({
          id: task.id,
          day,
          works: task.works,
          complete: completeList.findIndex((completeTask) => completeTask.day === day) >= 0,
          repeat: true,
        });
        date += 1;
      }
    }
  });
  return todoList;
};

const getWeekRepeatTasks = ({
  year,
  month,
  firstDay,
  lastDay,
  tasks,
}: GetRepeatTaskProps<WeekRepeatTask[]>) => {
  const todoList: CompiledTask[] = [];
  tasks.forEach((task) => {
    if (task.start <= lastDay && (task.end === null || task.end > firstDay)) {
      let date = Math.max(task.start, firstDay) % 100;
      const dateMax = Math.min(task.end !== null ? task.end : lastDay, lastDay) % 100;
      const completeList = task.complete.filter(
        (date) => date.year === year && date.month === month
      );

      while (date <= dateMax) {
        const day = date;
        const dayOfWeek = getDayOfWeek({ year, month, day });
        if (task.repeat.includes(dayOfWeek)) {
          todoList.push({
            id: task.id,
            day,
            works: task.works,
            complete: completeList.findIndex((completeTask) => completeTask.day === day) >= 0,
            repeat: true,
          });
        }
        date += 1;
      }
    }
  });
  return todoList;
};

const getMonthRepeatTasks = ({
  year,
  month,
  firstDay,
  lastDay,
  tasks,
}: GetRepeatTaskProps<MonthRepeatTask[]>) => {
  const todoList: CompiledTask[] = [];
  tasks.forEach((task) => {
    if (task.start <= lastDay && (task.end === null || task.end > firstDay)) {
      todoList.push({
        id: task.id,
        day: task.repeat.day,
        works: task.works,
        complete:
          task.complete.filter(
            (completeTask) => completeTask.year === year && completeTask.month === month
          ).length === 1,
        repeat: true,
      });
    }
  });
  return todoList;
};

const getYearRepeatTasks = ({
  year,
  month,
  firstDay,
  lastDay,
  tasks,
}: GetRepeatTaskProps<YearRepeatTask[]>) => {
  const todoList: CompiledTask[] = [];
  tasks.forEach((task) => {
    if (task.start <= lastDay && (task.end === null || task.end > firstDay)) {
      todoList.push({
        id: task.id,
        day: task.repeat.day,
        works: task.works,
        complete:
          task.complete.filter(
            (completeTask) => completeTask.year === year && completeTask.month === month
          ).length === 1,
        repeat: true,
      });
    }
  });
  return todoList;
};

const organizeTodoList = ({
  year,
  month,
  todo,
}: BasicMonthData & { todo: Tasks }): CompiledTask[] => {
  const maximumDate = getMaximumDate({ year, month });
  const monthInfo = {
    year,
    month,
    firstDay: convertDateToNumber({ year, month, day: 1 }),
    lastDay: convertDateToNumber({ year, month, day: maximumDate }),
  };

  const basicTasks = getBasicTasks({ year, month, tasks: todo.tasks });
  const dayRepeatTasks = getDayRepeatTasks({ ...monthInfo, tasks: todo.repeatTasks.day });
  const weekRepeatTasks = getWeekRepeatTasks({ ...monthInfo, tasks: todo.repeatTasks.week });
  const monthRepeatTasks = getMonthRepeatTasks({ ...monthInfo, tasks: todo.repeatTasks.month });
  const yearRepeatTasks = getYearRepeatTasks({ ...monthInfo, tasks: todo.repeatTasks.year });

  return [
    ...basicTasks,
    ...dayRepeatTasks,
    ...weekRepeatTasks,
    ...monthRepeatTasks,
    ...yearRepeatTasks,
  ];
};

const setTodoData = (data: CalendarDataType, todo: Tasks): CalendarDataType => {
  const { year, month } = data;
  const todoList = organizeTodoList({ year, month, todo });
  const newData = { ...data };

  todoList.forEach((task) => {
    newData.datas[task.day - 1].todo.push(task);
  });
  return newData;
};

export const addTodoData = (datas: CalendarDataType[], todo: Tasks): CalendarDataType[] => {
  const restoredDatas = datas.map((data) => restoreTodoData(data));
  const newDatas = restoredDatas.map((data) => setTodoData(data, todo));

  return newDatas;
};
