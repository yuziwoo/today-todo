import { useDispatch, useSelector } from 'react-redux';
import './editor.css';
import { RootState } from 'src/store/store';
import EditorHeader from './EditorHeader/EditorHeader';
import EditorWorksInput from './EditorWorksInput/EditorWorksInput';
import EditorDateSelect from './EditorDateSelect/EditorDateSelect';
import EditorRepeatInfo from './EditorRepeatInfo/EditorRepeatInfo';
import { initialEditorState } from 'src/mocks/data/editorState';
import { useEffect } from 'react';
import { resetEditorTask } from 'src/store/slice/editorSlice';

const Editor = () => {
  const dispatch = useDispatch();
  const editorState = useSelector((state: RootState) => state.editor);
  const isUpdating = editorState.task.id > initialEditorState.task.id;

  useEffect(() => {
    if (!editorState.editing) {
      dispatch(resetEditorTask());
    }
    // eslint-disable-next-line
  }, [editorState.editing]);

  return (
    <section
      className={`task-editor${editorState.editing ? ' editing' : ''}${
        editorState.firstEdit ? '' : ' editor-closed'
      }`}
    >
      <div className="editor-content">
        <EditorHeader />
        <EditorWorksInput />
        <EditorDateSelect />
        <EditorRepeatInfo />
        {isUpdating && <div>VVV</div>}
      </div>
    </section>
  );
};

export default Editor;
