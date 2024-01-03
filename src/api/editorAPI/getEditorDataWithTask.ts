import { EditorTaskData, EditorTaskPayload } from 'src/types/editorTypes';
import { getNextDayNumber } from 'src/utills/calendarUtils';
import { convertDateToNumber } from 'src/utills/converter';

export const getEditorDataWithTask = ({ task, cycle }: EditorTaskPayload): EditorTaskData => {
  const repeatCycle = cycle;

  if (cycle === 'single') {
    const startDay = convertDateToNumber({ year: task.year, month: task.month, day: task.day });
    const endDay = getNextDayNumber(startDay);
    const useEndDay = false;
    return { startDay, endDay, useEndDay, repeatCycle, repeatDayOfWeek: [], task };
  }

  const startDay = task.start;
  const endDay = task.end !== null ? task.end : getNextDayNumber(startDay);
  const useEndDay = task.end !== null;

  const editorData = { startDay, endDay, useEndDay, repeatCycle, repeatDayOfWeek: [], task };

  if (cycle === 'week') return { ...editorData, repeatDayOfWeek: task.repeat };
  return { ...editorData };
};
