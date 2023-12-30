import { IconCheck, IconExit } from 'src/components/icons/icons';
import './editorHeader.css';
import { useDispatch } from 'react-redux';
import { resetEditorTask, toggleEditor } from 'src/store/slice/editorSlice';

const EditorHeader = () => {
  const dispatch = useDispatch();

  const handleExitButton = () => {
    dispatch(toggleEditor());
    dispatch(resetEditorTask());
  };

  return (
    <div className="editor-header">
      <button className="canHover close" onClick={handleExitButton}>
        <IconExit color="black" />
      </button>
      <h1>할 일</h1>
      <button className="canHover check">
        <IconCheck color="#148140" />
      </button>
    </div>
  );
};

export default EditorHeader;
