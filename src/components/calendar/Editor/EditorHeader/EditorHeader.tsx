import { IconCheck, IconExit } from 'src/components/icons/icons';
import './editorHeader.css';
import { useDispatch, useSelector } from 'react-redux';
import { resetEditorTask, toggleEditor } from 'src/store/slice/editorSlice';
import { RootState } from 'src/store/store';
import { MESSAGE } from 'src/constants/MESSAGE';
import { addSingleTask } from 'src/store/slice/todoSlice';
import { convertNumberToDateData } from 'src/utills/converter';

const EditorHeader = () => {
  const editorState = useSelector((state: RootState) => state.editor);
  const dispatch = useDispatch();

  const exitEditor = () => {
    dispatch(toggleEditor());
    dispatch(resetEditorTask());
  };

  const handleSubmitButton = () => {
    const works = editorState.task.works.trim();
    if (works.length === 0) {
      alert(MESSAGE.editor.emptyWorks);
      return;
    }

    if (editorState.repeatCycle === 'single') {
      const { year, month, day } = convertNumberToDateData(editorState.startDay);
      dispatch(addSingleTask({ year, month, day, works }));
      exitEditor();
      return;
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
