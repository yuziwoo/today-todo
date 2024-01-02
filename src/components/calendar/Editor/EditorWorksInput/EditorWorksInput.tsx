import { useDispatch, useSelector } from 'react-redux';
import './editorWorksInput.css';
import { updateEditorTaskWorks } from 'src/store/slice/editorSlice';
import { RootState } from 'src/store/store';
import { EDITOR } from 'src/constants/API';

const EditorWorksInput = () => {
  const dispatch = useDispatch();
  const state = useSelector((state: RootState) => state.editor);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(updateEditorTaskWorks({ text: e.target.value }));
  };

  return (
    <div className="editor-works-box">
      <input
        className="editor-works-input"
        type="text"
        placeholder={EDITOR.worksPlaceholder[0]}
        onChange={handleOnChange}
        value={state.task.works}
        maxLength={100}
      />
    </div>
  );
};

export default EditorWorksInput;
