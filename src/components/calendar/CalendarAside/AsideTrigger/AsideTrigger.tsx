import { useSelector } from 'react-redux';
import { RootState } from 'src/store/store';
import './asideTrigger.css';

interface AsideTriggerProps {
  asideSwitch: string;
  onClickHandler: () => void;
}

const AsideTrigger = ({ asideSwitch, onClickHandler }: AsideTriggerProps) => {
  const editorState = useSelector((state: RootState) => state.editor);

  return (
    <button
      className={`calendar-aside-trigger calendar-aside-${asideSwitch}${editorState.editing ?' editing' : ''}`}
      onClick={onClickHandler}
    >
      <img src="./assets/icons/png/icon-plus.png" alt="plus icon" />
    </button>
  );
};

export default AsideTrigger;
