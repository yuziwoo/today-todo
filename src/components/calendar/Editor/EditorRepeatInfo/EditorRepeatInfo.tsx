import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'src/store/store';
import './editorRepeatInfo.css';
import { convertNumberToDateData } from 'src/utills/converter';
import EditorRepeatHeader from '../EditorRepeatHeader/EditorRepeatHeader';
import EditorCycleButton from '../EditorCycleButton/EditorCycleButton';
import { updateEditorTaskCycle } from 'src/store/slice/editorSlice';

const EditorRepeatInfo = () => {
  const editorState = useSelector((state: RootState) => state.editor);
  const dispatch = useDispatch();

  const { year, month, day } = convertNumberToDateData(editorState.startDay);

  const updateTaskCycle = (cycle: string) => {
    dispatch(updateEditorTaskCycle(cycle));
  };

  const cycleArr = [
    { cycle: 'single', text: '반복 없음' },
    { cycle: 'day', text: '매일 반복하기' },
    { cycle: 'week', text: '매주 반복하기' },
    { cycle: 'month', text: `매월 ${day}일 반복하기` },
    { cycle: 'year', text: `매년 ${month + 1}월 ${day}일 반복하기` },
  ];

  return (
    <div className={`editor-repeat ${editorState.repeatCycle}`}>
      <EditorRepeatHeader />

      {cycleArr.map(({ cycle, text }, index) => (
        <div className={`cycle-wrap cycle-${cycle}`} key={index}>
          <EditorCycleButton text={text} onClickHandler={updateTaskCycle} cycle={cycle} />
          { cycle !== 'single' && <div>working</div>}
        </div>
      ))}
    </div>
  );
};

export default EditorRepeatInfo;
