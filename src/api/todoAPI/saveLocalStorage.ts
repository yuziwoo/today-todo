import { LOCAL_STORAGE_KEY } from '../../constants/API';
import { Tasks } from '../../types/todo';

export const saveLocalStorage = (todo: Tasks) => {
  const todoJSON = JSON.stringify(todo);
  localStorage.setItem(LOCAL_STORAGE_KEY.todo, todoJSON);
};
