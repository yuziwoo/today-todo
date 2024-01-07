import { EditorStateProps, EditorTaskPayload } from '../../types/editorTypes';
import { Cycle, DayRepeatTask, RandomTask, RepeatTaskCompleteElement } from '../../types/todo';

const addExtraTaskData = (
  state: EditorStateProps,
  task: DayRepeatTask,
  cycle: Cycle
): RandomTask => {
  const day = state.startDay % 100;
  const month = Math.floor((state.startDay % 10000) / 100);

  switch (cycle) {
    case 'day':
      return { ...task };
    case 'week':
      return { ...task, repeat: [...state.repeatDayOfWeek] };
    case 'month':
      return { ...task, repeat: { day } };
    case 'year':
      return { ...task, repeat: { month, day } };
    default:
      return task;
  }
};

export const makeRepeatTask = (
  state: EditorStateProps,
  id: number,
  complete: RepeatTaskCompleteElement[] = []
): EditorTaskPayload => {
  const works = state.task.works.trim();
  const cycle = state.repeatCycle;

  const defaultTask = {
    id,
    start: state.startDay,
    end: state.useEndDay ? state.endDay : null,
    works,
    complete: [...complete],
  };

  const task = addExtraTaskData(state, defaultTask, cycle);

  return { task, cycle } as EditorTaskPayload;
};
