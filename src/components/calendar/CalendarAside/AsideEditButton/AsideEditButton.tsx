import { useDispatch, useSelector } from 'react-redux';
import { toggleEditor, triggerEditorWithDateNumber } from 'src/store/slice/editorSlice';
import { RootState } from 'src/store/store';
import { BasicDateData } from 'src/types/calendarTypes';
import { convertDateToNumber } from 'src/utills/converter';

interface AsideEditButtonProps {
  onClick: () => void;
  currentDate: BasicDateData;
}

const AsideEditButton = ({ onClick, currentDate }: AsideEditButtonProps) => {
  const editorState = useSelector((state: RootState) => state.editor);
  const dispatch = useDispatch();

  const toggleEditing = () => {
    if (editorState.editing) {
      dispatch(toggleEditor());
      onClick();
      return;
    }

    const { year, month, day } = currentDate;
    const startDay = convertDateToNumber({ year, month, day });
    dispatch(triggerEditorWithDateNumber(startDay));
    onClick();
  };

  return (
    <div className="button-wrap">
      <button onClick={toggleEditing}>
        <img src="./assets/icons/png/icon-edit.png" alt="edit icon" />
      </button>
      <p>할 일 추가</p>
    </div>
  );
};

export default AsideEditButton;
