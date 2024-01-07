import { Task, Tasks } from '../../types/todo';

export const toggleSingleTask = ({
  state,
  id,
  complete,
}: Pick<Task, 'id' | 'complete'> & { state: Tasks }) => {
  const index = state.tasks.findIndex((task) => task.id === id);
  const newTask = { ...state.tasks[index], complete: !complete };
  state.tasks[index] = newTask;
};
