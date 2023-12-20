import { LOCAL_STORAGE_KEY } from '../../constants/API';
import { TasksProps } from '../../types/todo';

export const saveLocalStorage = (todo: TasksProps) => {
  const todoJSON = JSON.stringify(todo);
  localStorage.setItem(LOCAL_STORAGE_KEY.todo, todoJSON);
};
