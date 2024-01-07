import { MESSAGE } from 'src/constants/MESSAGE';
import { Task, Tasks } from '../../types/todo';
import { findRepeatTask } from './findRepeatTask';

export const toggleRepeatTask = ({
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
