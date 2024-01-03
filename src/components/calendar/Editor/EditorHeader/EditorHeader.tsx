import { IconCheck, IconExit } from 'src/components/icons/icons';
import './editorHeader.css';
import { useDispatch, useSelector } from 'react-redux';
import { resetEditorTask, toggleEditor } from 'src/store/slice/editorSlice';
import { RootState } from 'src/store/store';
import { MESSAGE } from 'src/constants/MESSAGE';
import {
  addDayRepeatTask,
  addMonthRepeatTask,
  addSingleTask,
  addWeekRepeatTask,
  addYearRepeatTask,
  updateRepeatTask,
  updateSingleTask,
} from 'src/store/slice/todoSlice';
import { convertNumberToDateData } from 'src/utills/converter';
import { requestChangeCalendarTodo } from 'src/store/slice/requestSlice';
import { initialEditorState } from 'src/mocks/data/editorState';
import { EditorStateProps } from 'src/types/editorTypes';

const EditorHeader = () => {
  const editorState = useSelector((state: RootState) => state.editor);
  const dispatch = useDispatch();

  const exitEditor = () => {
    dispatch(toggleEditor());
    dispatch(resetEditorTask());
  };

  const exitEditorAndUpdate = () => {
    dispatch(requestChangeCalendarTodo());
    exitEditor();
  };

  const getTaskData = (state: EditorStateProps) => {
    const works = state.task.works.trim();
    const { startDay, endDay, useEndDay, repeatDayOfWeek } = state;
    const repeatDay = startDay % 100;
    const repeatMonth = Math.floor((startDay % 10000) / 100);
    return { works, startDay, endDay, useEndDay, repeatDayOfWeek, repeatDay, repeatMonth };
  };

  const addTask = () => {
    const { works, startDay, endDay, useEndDay, repeatDayOfWeek, repeatDay, repeatMonth } =
      getTaskData(editorState);

    switch (editorState.repeatCycle) {
      case 'single':
        const { year, month, day } = convertNumberToDateData(editorState.startDay);
        dispatch(addSingleTask({ year, month, day, works }));
        break;
      case 'day':
        dispatch(addDayRepeatTask({ startDay, works, endDay, useEndDay }));
        break;
      case 'week':
        dispatch(addWeekRepeatTask({ startDay, works, endDay, useEndDay, repeatDayOfWeek }));
        break;
      case 'month':
        dispatch(addMonthRepeatTask({ startDay, works, endDay, useEndDay, repeatDay }));
        break;
      case 'year':
        dispatch(addYearRepeatTask({ startDay, works, endDay, useEndDay, repeatDay, repeatMonth }));
    }

    exitEditorAndUpdate();
  };

  const updateTask = () => {
    const { works, startDay, endDay, useEndDay, repeatDayOfWeek, repeatDay, repeatMonth } =
      getTaskData(editorState);

    const id = editorState.task.id;
    const cycle = editorState.repeatCycle;

    if (editorState.repeatCycle === 'single') {
      const { year, month, day } = convertNumberToDateData(editorState.startDay);
      dispatch(updateSingleTask({ id, year, month, day, works }));
      exitEditorAndUpdate();
      return;
    }

    dispatch(
      updateRepeatTask({
        id,
        startDay,
        works,
        endDay,
        useEndDay,
        cycle,
        repeatDayOfWeek,
        repeatDay,
        repeatMonth,
      })
    );
    exitEditorAndUpdate();
  };

  const handleSubmitButton = () => {
    const works = editorState.task.works.trim();
    if (works.length === 0) {
      alert(MESSAGE.editor.emptyWorks);
      return;
    }

    const isUpdate = editorState.task.id !== initialEditorState.task.id;
    if (isUpdate) {
      updateTask();
      return;
    }

    addTask();
  };

  return (
    <div className="editor-header">
      <button className="canHover close" onClick={exitEditor}>
        <IconExit color="black" />
      </button>
      <h1>할 일</h1>
      <button className="canHover check" onClick={handleSubmitButton}>
        <IconCheck color="#148140" />
      </button>
    </div>
  );
};

export default EditorHeader;
