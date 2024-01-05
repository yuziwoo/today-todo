import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'src/store/store';
import { IconArrowRight } from '../../icons/icons';
import { requestChangeCalendarTodo } from 'src/store/slice/requestSlice';
import { removeTask } from 'src/store/slice/todoSlice';
import './editorManageTask.css';

interface EditorManageTaskProps {
  isUpdating: boolean;
  onCancelEditor: () => void;
}

const EditorManageTask = ({ isUpdating, onCancelEditor }: EditorManageTaskProps) => {
  const editorState = useSelector((state: RootState) => state.editor);
  const dispatch = useDispatch();

  const handleRemoveTask = () => {
    dispatch(removeTask(editorState));
    dispatch(requestChangeCalendarTodo());
    onCancelEditor();
  };

  return (
    <div className={`editor-manage-task${isUpdating ? ' updating' : ''}`}>
      <h1 className="heading">일정 관리</h1>
      <button className="event-hover hover-soft" onClick={handleRemoveTask}>
        <h2>일정 삭제하기</h2>
        <IconArrowRight color="#CD4B38" />
      </button>
    </div>
  );
};

export default EditorManageTask;
