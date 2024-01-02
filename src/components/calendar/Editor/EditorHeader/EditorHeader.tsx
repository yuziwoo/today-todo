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
} from 'src/store/slice/todoSlice';
import { convertNumberToDateData } from 'src/utills/converter';
import { requestChangeCalendarTodo } from 'src/store/slice/requestSlice';

const EditorHeader = () => {
  const editorState = useSelector((state: RootState) => state.editor);
  const dispatch = useDispatch();

  const exitEditor = () => {
    dispatch(toggleEditor());
    dispatch(resetEditorTask());
  };

  const updateSingleTask = (works: string) => {
    const { year, month, day } = convertNumberToDateData(editorState.startDay);
    dispatch(addSingleTask({ year, month, day, works }));
    dispatch(requestChangeCalendarTodo());
    exitEditor();
  };

  const updateDayRepeatTask = (works: string) => {
    const { startDay, endDay, useEndDay } = editorState;
    dispatch(addDayRepeatTask({ startDay, works, endDay, useEndDay }));
    dispatch(requestChangeCalendarTodo());
    exitEditor();
  };

  const updateWeekRepeatTask = (works: string) => {
    const { startDay, endDay, useEndDay, repeatDayOfWeek } = editorState;
    dispatch(addWeekRepeatTask({ startDay, works, endDay, useEndDay, repeatDayOfWeek }));
    dispatch(requestChangeCalendarTodo());
    exitEditor();
  };

  const updateMonthRepeatTask = (works: string) => {
    const { startDay, endDay, useEndDay } = editorState;
    const repeatDay = startDay % 100;
    dispatch(addMonthRepeatTask({ startDay, works, endDay, useEndDay, repeatDay }));
    dispatch(requestChangeCalendarTodo());
    exitEditor();
  };

  const handleSubmitButton = () => {
    const works = editorState.task.works.trim();
    if (works.length === 0) {
      alert(MESSAGE.editor.emptyWorks);
      return;
    }

    if (editorState.startDay >= editorState.endDay && editorState.useEndDay) {
      alert(MESSAGE.editor.endDayIsSmall);
      return;
    }

    switch (editorState.repeatCycle) {
      case 'single': {
        updateSingleTask(works);
        break;
      }
      case 'day': {
        updateDayRepeatTask(works);
        break;
      }
      case 'week': {
        updateWeekRepeatTask(works);
        break;
      }
      case 'month': {
        updateMonthRepeatTask(works);
        break;
      }
    }
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
