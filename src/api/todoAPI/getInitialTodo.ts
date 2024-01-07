import { LOCAL_STORAGE_KEY } from 'src/constants/API';
import { Tasks } from 'src/types/todo';

export const getInitialTodo = (todo: Tasks): Tasks => {
  const storageTodo = localStorage.getItem(LOCAL_STORAGE_KEY.todo);
  const initialTodo = storageTodo === null ? todo : JSON.parse(storageTodo);

  return initialTodo;
};
