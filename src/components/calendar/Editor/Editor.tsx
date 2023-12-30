import { useSelector } from 'react-redux';
import './editor.css';
import { RootState } from 'src/store/store';
import EditorHeader from './EditorHeader/EditorHeader';
import EditorWorksInput from './EditorWorksInput/EditorWorksInput';
import EditorDateSelect from './EditorDateSelect/EditorDateSelect';
import EditorRepeatInfo from './EditorRepeatInfo/EditorRepeatInfo';

const Editor = () => {
  const editorState = useSelector((state: RootState) => state.editor);

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
      </div>
    </section>
  );
};

export default Editor;
