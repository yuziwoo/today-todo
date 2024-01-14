import { Tasks } from 'src/types/todo';

export const getTodoCount = (todo: Tasks): number => {
  const { day, week, month, year } = todo.repeatTasks;
  const singleLength = todo.tasks.length;
  const repeatLength = day.length + week.length + month.length + year.length;

  return singleLength + repeatLength;
};
