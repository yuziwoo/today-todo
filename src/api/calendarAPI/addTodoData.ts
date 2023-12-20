import { CalendarDataType, OneDayData, BasicMonthData } from '../../types/calendarTypes';
import { Tasks, Task, CompiledTask } from '../../types/todo';

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

const organizeTodoList = ({
  year,
  month,
  todo,
}: BasicMonthData & { todo: Tasks }): CompiledTask[] => {
  const basicTasks = getBasicTasks({ year, month, tasks: todo.tasks });
  return [...basicTasks];
};

const setTodoData = (data: CalendarDataType, todo: Tasks): CalendarDataType => {
  const { year, month } = data;
  const todoList = organizeTodoList({ year, month, todo });
  const newData = { ...data };

  todoList.forEach((task) => {
    newData.datas[task.day - 1].todo.push(task);
  })
  console.log(newData)
  return newData;
};

export const addTodoData = (datas: CalendarDataType[], todo: Tasks): CalendarDataType[] => {
  const restoredDatas = datas.map((data) => restoreTodoData(data));
  const newDatas = datas.map((data) => setTodoData(data, todo));

  return [];
};
