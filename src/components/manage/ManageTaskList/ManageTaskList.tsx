import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'src/store/store';
import ManageTasks from '../ManageTasks/ManageTasks';
import { Cycle, RandomTask } from 'src/types/todo';
import {
  toggleAllManageTasksInCycle,
  toggleOneManageTaskInCycle,
} from 'src/store/slice/manageSlice';
import { triggerEditorWithTask } from 'src/store/slice/editorSlice';
import {
  BasicManageTaskProps,
  RandomManageStateTask,
  RandomManageStateTaskList,
} from 'src/types/manageTypes';

const ManageTaskList = () => {
  const manageState = useSelector((state: RootState) => state.manage);
  const dispatch = useDispatch();

  const handleToggleAllTasksInCycle = (cycle: Cycle, checked: boolean) => {
    dispatch(toggleAllManageTasksInCycle({ checked, option: manageState.option, cycle }));
  };

  const handleToggleTask = (cycle: Cycle, id: number) => {
    dispatch(toggleOneManageTaskInCycle({ cycle, id }));
  };

  const handleEditTask = (cycle: Cycle, task: RandomTask) => {
    dispatch(triggerEditorWithTask({ task, cycle }));
  };

  const getFilteredList = <T extends BasicManageTaskProps>(list: T[]): T[] => {
    if (manageState.option === 'past') return list.filter((task) => task.isPast);
    return list;
  };

  const listArr: { list: RandomManageStateTaskList; title: string; cycle: Cycle }[] = [
    {
      list: getFilteredList(manageState.single),
      title: '하루 일정',
      cycle: 'single',
    },
    {
      list: getFilteredList(manageState.day),
      title: '매일 반복 일정',
      cycle: 'day',
    },
    {
      list: getFilteredList(manageState.week),
      title: '매주 반복 일정',
      cycle: 'week',
    },
    {
      list: getFilteredList(manageState.month),
      title: '매월 반복 일정',
      cycle: 'month',
    },
    {
      list: getFilteredList(manageState.year),
      title: '매년 반복 일정',
      cycle: 'year',
    },
  ];

  return (
    <div className="manage-task-list">
      {listArr.map((info, index) => {
        if (info.list.length > 0)
          return (
            <ManageTasks
              key={index}
              title={info.title}
              option={manageState.option}
              list={info.list}
              onClickHeading={(AllChecked: boolean) => {
                handleToggleAllTasksInCycle(info.cycle, AllChecked);
              }}
              onClickTaskCheckbox={(id: number) => {
                handleToggleTask(info.cycle, id);
              }}
              onClickTaskEdit={(task: RandomTask) => {
                handleEditTask(info.cycle, task);
              }}
            />
          );
        return <div key={index} className="empty-value"></div>;
      })}
    </div>
  );
};

export default ManageTaskList;
