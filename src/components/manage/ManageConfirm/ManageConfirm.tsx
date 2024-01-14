import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'src/store/store';
import './manageConfirm.css';
import { BasicManageTaskProps, ManageStateProps } from 'src/types/manageTypes';
import { toggleManageTasks } from 'src/store/slice/manageSlice';
import { removeFewTasks } from 'src/store/slice/todoSlice';

const getIsManageTaskChecked = (state: ManageStateProps) => {
  const { single, day, week, month, year } = state;
  const isChecked = <T extends BasicManageTaskProps>(task: T) => task.checked;
  return (
    single.some(isChecked) ||
    day.some(isChecked) ||
    week.some(isChecked) ||
    month.some(isChecked) ||
    year.some(isChecked)
  );
};

const ManageConfirm = () => {
  const manageState = useSelector((state: RootState) => state.manage);
  const dispatch = useDispatch();
  const isActive = getIsManageTaskChecked(manageState);

  const handleCancelSelect = () => {
    dispatch(toggleManageTasks({ checked: false, option: manageState.option }));
  };

  const handleDeleteTasks = () => {
    dispatch(removeFewTasks(manageState));
  };

  return (
    <div className={`manage-confirm${isActive ? ' active' : ''}`}>
      <button className="cancel" onClick={handleCancelSelect}>
        <p>선택 취소</p>
      </button>
      <button className="delete" onClick={handleDeleteTasks}>
        <p>일정 삭제</p>
      </button>
    </div>
  );
};

export default ManageConfirm;
