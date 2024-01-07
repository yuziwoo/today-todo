import { MESSAGE } from 'src/constants/MESSAGE';
import { EditorTaskPayload } from 'src/types/editorTypes';
import { Task, Tasks } from 'src/types/todo';

export const findTaskWithID = ({
  id,
  todo,
}: Pick<Task, 'id'> & { todo: Tasks }): EditorTaskPayload => {
  const { tasks, repeatTasks } = { ...todo };
  const singleTaskIndex = tasks.findIndex((task) => task.id === id);
  if (singleTaskIndex >= 0) {
    return { task: { ...tasks[singleTaskIndex] }, cycle: 'single' };
  }

  const repeatTasksKeys = Object.keys(repeatTasks) as (keyof typeof repeatTasks)[];

  for (const repeatTasksKey of repeatTasksKeys) {
    const idx = repeatTasks[repeatTasksKey].findIndex((task) => task.id === id);

    if (idx >= 0) {
      return {
        task: { ...repeatTasks[repeatTasksKey][idx] },
        cycle: repeatTasksKey,
      } as EditorTaskPayload;
    }
  }

  throw new Error(MESSAGE.todo.cantFindTask);
};
