import { useDispatch, useSelector } from 'react-redux';
import { IconTrash1 } from '../../icons/icons';
import './editorTrashButton.css';
import { RootState } from 'src/store/store';
import { toggleEditor } from 'src/store/slice/editorSlice';
import { requestChangeCalendarTodo } from 'src/store/slice/requestSlice';
import { removeRepeatTask, removeSingleTask } from 'src/store/slice/todoSlice';

const EditorTrashButton = () => {
  const editorState = useSelector((state: RootState) => state.editor);
  const dispatch = useDispatch();

  const id = editorState.task.id;
  const cycle = editorState.repeatCycle;

  const onClickHandler = () => {
    if (cycle === 'single') {
      dispatch(removeSingleTask(id));
      dispatch(requestChangeCalendarTodo());
      dispatch(toggleEditor());
      return;
    }

    dispatch(removeRepeatTask({ id, cycle }));
    dispatch(requestChangeCalendarTodo());
    dispatch(toggleEditor());
  };

  return (
    <button className="editor-trash-button" onClick={onClickHandler}>
      <IconTrash1 color="black" />
    </button>
  );
};

export default EditorTrashButton;
