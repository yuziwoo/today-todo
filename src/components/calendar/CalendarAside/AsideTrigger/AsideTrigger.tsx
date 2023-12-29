import './asideTrigger.css';

interface AsideTriggerProps {
  asideSwitch: string;
  onClickHandler: () => void;
}

const AsideTrigger = ({ asideSwitch, onClickHandler }: AsideTriggerProps) => {
  return (
    <button
      className={`calendar-aside-trigger calendar-aside-${asideSwitch}`}
      onClick={onClickHandler}
    >
      <img src="./assets/icons/png/icon-plus.png" alt="plus icon" />
    </button>
  );
};

export default AsideTrigger;
