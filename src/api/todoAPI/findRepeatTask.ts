import { RepeatCycle, Task, Tasks } from '../../types/todo';

export const findRepeatTask = ({
  task,
  id,
}: Pick<Task, 'id'> & { task: Tasks }): { cycle: RepeatCycle; index: number } => {
  let cycle: RepeatCycle = null;
  const { repeatTasks } = task;

  let index = 0;
  
  switch (true) {
    case repeatTasks.day.some((repeatTask) => repeatTask.id === id): {
      cycle = 'day';
      index = repeatTasks.day.findIndex((repeatTask) => repeatTask.id === id);
      break;
    }
    case repeatTasks.week.some((repeatTask) => repeatTask.id === id): {
      cycle = 'week';
      index = repeatTasks.week.findIndex((repeatTask) => repeatTask.id === id);
      break;
    }
    case repeatTasks.month.some((repeatTask) => repeatTask.id === id): {
      cycle = 'month';
      index = repeatTasks.month.findIndex((repeatTask) => repeatTask.id === id);
      break;
    }
    case repeatTasks.year.some((repeatTask) => repeatTask.id === id): {
      cycle = 'year';
      index = repeatTasks.year.findIndex((repeatTask) => repeatTask.id === id);
      break;
    }
  }

  return { cycle, index };
};
