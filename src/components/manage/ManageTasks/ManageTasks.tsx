import SquareCheckbox from '../../common/SquareCheckbox/SquareCheckbox';
import { IconArrowRight } from '../../icons/icons';
import { BasicManageTaskProps, ManageShowOption } from 'src/types/manageTypes';
import { RandomTask, RepeatTaskEndProps } from 'src/types/todo';
import { convertNumberToDateData } from 'src/utills/converter';
import './manageTask.css';

type ManageTasksProps = {
  title: string;
  option: ManageShowOption;
  list: (BasicManageTaskProps & { task: RandomTask })[];
  onClickHeading: (AllChecked: boolean) => void;
  onClickTaskCheckbox: (id: number) => void;
  onClickTaskEdit: (task: RandomTask) => void;
};

const ManageTasks = ({
  title,
  option,
  list,
  onClickHeading,
  onClickTaskCheckbox,
  onClickTaskEdit,
}: ManageTasksProps) => {
  const getEndDate = (endDate: RepeatTaskEndProps) => {
    if (endDate === null) return '종료일 없음';
    const { year, month, day } = convertNumberToDateData(endDate);
    return `${year}년 ${month + 1}월 ${day}일까지`;
  };

  const isActive = list.every((task) => {
    if (option === 'past') return !task.isPast || task.checked;
    return task.checked;
  });

  return (
    <div className="manage-tasks">
      <div className={`heading${isActive ? ' active' : ''}`}>
        <button
          className="event-hover hover-soft color-active"
          onClick={() => {
            onClickHeading(!isActive);
          }}
        >
          <SquareCheckbox checked={isActive} color="var(--color-active)" />
          <h3>{title}</h3>
        </button>
      </div>
      <ul className="box">
        {list.map((manageTask, index) => {
          if (option === 'past' && !manageTask.isPast) return <div key={index}></div>;
          return (
            <li key={index} className={`${manageTask.checked ? 'active' : ''}`}>
              <button
                className="button-checkbox"
                onClick={() => {
                  onClickTaskCheckbox(manageTask.task.id);
                }}
              >
                <div className="checkbox">
                  <SquareCheckbox checked={manageTask.checked} color="var(--color-active)" />
                </div>
                <div className="info">
                  <p className="end-date">
                    {'end' in manageTask.task
                      ? getEndDate(manageTask.task.end)
                      : `${manageTask.task.year}년 ${manageTask.task.month + 1}월 ${manageTask.task.day}일`}
                  </p>
                  <h4>{manageTask.task.works}</h4>
                </div>
              </button>
              <button
                className="button-edit event-hover hover-soft color-active flex-center"
                onClick={() => {
                  onClickTaskEdit(manageTask.task);
                }}
              >
                <IconArrowRight color="var(--color-icon-arrow-right)" />
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ManageTasks;
