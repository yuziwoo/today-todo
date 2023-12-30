import { useDispatch, useSelector } from 'react-redux';
import './editor.css';
import { RootState } from 'src/store/store';
import EditorHeader from './EditorHeader/EditorHeader';
import { resetEditorTask, toggleEditor } from 'src/store/slice/editorSlice';
import EditorWorksInput from './EditorWorksInput/EditorWorksInput';

const Editor = () => {
  const dispatch = useDispatch();
  const editorState = useSelector((state: RootState) => state.editor);

  const handleExitButton = () => {
    dispatch(toggleEditor());
    dispatch(resetEditorTask());
  };

  return (
    <section
      className={`task-editor${editorState.editing ? ' editing' : ''}${
        editorState.firstEdit ? '' : ' editor-closed'
      }`}
    >
      <div className="editor-content">
        <EditorHeader onExitButton={handleExitButton} />
        <EditorWorksInput />
      </div>
    </section>
  );
};

export default Editor;
