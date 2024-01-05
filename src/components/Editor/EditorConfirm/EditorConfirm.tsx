import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'src/store/store';
import { requestChangeCalendarTodo } from 'src/store/slice/requestSlice';
import { addTask, updateTask } from 'src/store/slice/todoSlice';
import { MESSAGE } from 'src/constants/MESSAGE';
import './editorConfirm.css';

interface EditorConfirmProps {
  onCancelEditor: () => void;
  isUpdate: boolean;
}

const EditorConfirm = ({ onCancelEditor, isUpdate }: EditorConfirmProps) => {
  const editorState = useSelector((state: RootState) => state.editor);
  const dispatch = useDispatch();
  const works = editorState.task.works.trim();

  const closeEditor = () => {
    dispatch(requestChangeCalendarTodo());
    onCancelEditor();
  };

  const updateOrAddTask = () => {
    if (isUpdate) {
      dispatch(updateTask(editorState));
      return;
    }
    dispatch(addTask(editorState));
  };

  const handleSubmitTask = () => {
    if (works.length === 0) {
      window.alert(MESSAGE.editor.emptyWorks);
      return;
    }

    updateOrAddTask();
    closeEditor();
  };

  return (
    <div className="editor-confirm">
      <button className="cancel" onClick={onCancelEditor}>
        <p>취소</p>
      </button>
      <button className="confirm" onClick={handleSubmitTask}>
        <p>완료</p>
      </button>
    </div>
  );
};

export default EditorConfirm;
