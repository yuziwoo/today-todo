import { useDispatch, useSelector } from 'react-redux';
import './editorWorksInput.css';
import { updateEditorTaskWorks } from 'src/store/slice/editorSlice';
import { RootState } from 'src/store/store';

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
        placeholder="할 일을 입력해주세요."
        onChange={handleOnChange}
        value={state.task.works}
      />
    </div>
  );
};

export default EditorWorksInput;
