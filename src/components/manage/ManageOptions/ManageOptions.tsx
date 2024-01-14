import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'src/store/store';
import { setManagerShowOption, toggleManageTasks } from 'src/store/slice/manageSlice';
import { IconCheck } from '../../icons/icons';
import { ManageShowOption } from 'src/types/manageTypes';
import { isEveryManageTaskChecked } from 'src/api/manageAPI/isManageTaskChecked';
import './manageOptions.css';

const ManageOptions = () => {
  const manageState = useSelector((state: RootState) => state.manage);
  const dispatch = useDispatch();

  const showOption = manageState.option;

  const handleShowOption = (option: ManageShowOption) => {
    dispatch(setManagerShowOption(option));
  };

  const [everyTaskChecked, setEvenryTaskChecked] = useState(false);

  useEffect(() => {
    setEvenryTaskChecked(isEveryManageTaskChecked(manageState));
  }, [manageState]);

  const handleSelectAll = () => {
    dispatch(toggleManageTasks({ checked: !everyTaskChecked, option: manageState.option }));
  };

  return (
    <div className="manage-options">
      <div className="wrap">
        <button
          className={`flex-center${showOption === 'past' ? ' active' : ''}`}
          onClick={() => {
            handleShowOption('past');
          }}
        >
          <p>지난 일정</p>
        </button>
        <button
          className={`flex-center${showOption === 'all' ? ' active' : ''}`}
          onClick={() => {
            handleShowOption('all');
          }}
        >
          <p>전체 일정</p>
        </button>
      </div>

      <div className="select">
        <button
          className={`select-all flex-center${everyTaskChecked ? ' active' : ''}`}
          onClick={handleSelectAll}
        >
          <IconCheck color="var(--color-active)" />
          <p>전체 선택</p>
        </button>
      </div>
    </div>
  );
};

export default ManageOptions;
