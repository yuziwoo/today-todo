import { useDispatch } from 'react-redux';
import { toggleEditor } from 'src/store/slice/editorSlice';

const AsideEditButton = ({ onClick }: { onClick: () => void }) => {
  const dispatch = useDispatch();

  const toggleEditing = () => {
    dispatch(toggleEditor());
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
