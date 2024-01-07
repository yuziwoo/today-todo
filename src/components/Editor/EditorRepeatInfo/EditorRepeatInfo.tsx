import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'src/store/store';
import { convertNumberToDateData } from 'src/utills/converter';
import {
  toggleEditorRepeatDayOfWeek,
  toggleEditorUseEndDay,
  updateEditorEndDay,
  updateEditorTaskCycle,
} from 'src/store/slice/editorSlice';
import EditorBasicRepeatButton from '../EditorBasicRepeatButton/EditorBasicRepeatButton';
import EditorWeekRepeatButton from '../EditorWeekRepeatButton/EditorWeekRepeatButton';
import EditorRepeatEndDate from '../EditorRepeatEndDate/EditorRepeatEndDate';
import './editorRepeatInfo.css';

const EditorRepeatInfo = () => {
  const editorState = useSelector((state: RootState) => state.editor);
  const dispatch = useDispatch();

  const cycle = editorState.repeatCycle;
  const { month, day } = convertNumberToDateData(editorState.startDay);

  const updateTaskCycle = (cycle: string) => {
    dispatch(updateEditorTaskCycle(cycle));
  };

  const updateRepeatDayOfWeek = (dayOfWeek: number) => {
    dispatch(toggleEditorRepeatDayOfWeek(dayOfWeek));
  };

  const updateEndDay = (endDay: number) => {
    dispatch(updateEditorEndDay(endDay));
  };

  const toggleUseEndDay = () => {
    dispatch(toggleEditorUseEndDay());
  };

  return (
    <div className={`editor-repeat ${cycle}`}>
      <h1 className="heading">반복</h1>

      <div className="box">
        <EditorBasicRepeatButton
          name="반복 없음"
          cycle="single"
          isActive={cycle === 'single'}
          handleUpdateCycle={updateTaskCycle}
        />
        <EditorBasicRepeatButton
          name="매일"
          cycleString="반복하기"
          cycle="day"
          isActive={cycle === 'day'}
          handleUpdateCycle={updateTaskCycle}
        />
      </div>

      <EditorRepeatEndDate
        startDay={editorState.startDay}
        endDay={editorState.endDay}
        isActive={editorState.useEndDay}
        isVisible={cycle === 'day'}
        handleToggleUseEndDay={toggleUseEndDay}
        handleUpdateEndDay={updateEndDay}
      />

      <div className="box">
        <EditorWeekRepeatButton
          isActive={cycle === 'week'}
          dayOfWeek={editorState.repeatDayOfWeek}
          handleUpdateCycle={updateTaskCycle}
          handleUpdateDayOfWeek={updateRepeatDayOfWeek}
        />
      </div>

      <EditorRepeatEndDate
        startDay={editorState.startDay}
        endDay={editorState.endDay}
        isActive={editorState.useEndDay}
        isVisible={cycle === 'week'}
        handleToggleUseEndDay={toggleUseEndDay}
        handleUpdateEndDay={updateEndDay}
      />

      <div className="box">
        <EditorBasicRepeatButton
          name="매월"
          cycleString={`${day}일 반복하기`}
          cycle="month"
          isActive={cycle === 'month'}
          handleUpdateCycle={updateTaskCycle}
        />
        <EditorBasicRepeatButton
          name="매년"
          cycleString={`${month + 1}월 ${day}일 반복하기`}
          cycle="year"
          isActive={cycle === 'year'}
          handleUpdateCycle={updateTaskCycle}
        />
      </div>

      <EditorRepeatEndDate
        startDay={editorState.startDay}
        endDay={editorState.endDay}
        isActive={editorState.useEndDay}
        isVisible={cycle === 'month' || cycle === 'year'}
        handleToggleUseEndDay={toggleUseEndDay}
        handleUpdateEndDay={updateEndDay}
      />
    </div>
  );
};

export default EditorRepeatInfo;
