import BasicCheckbox from 'src/components/common/BasicCheckbox/BasicCheckbox';
import { BasicDateData, BasicMonthData, BasicTodoData } from 'src/types/calendarTypes';
import { IconArrowRight } from '../../../icons/icons';
import './calendarTodoList.css';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTask } from 'src/store/slice/todoSlice';
import { toggleTaskInCalendar } from 'src/store/slice/calendarSlice';
import { findTaskWithID } from 'src/api/todoAPI/findTaskWithID';
import { triggerEditorWithTask } from 'src/store/slice/editorSlice';
import { RootState } from 'src/store/store';

interface CalendarTodoListProps {
  tasks: BasicTodoData[];
  date: BasicDateData;
}

const CalendarTodoList = ({ tasks, date }: CalendarTodoListProps) => {
  const dispatch = useDispatch();
  const todo = useSelector((state: RootState) => state.todo);
  const list = Array.isArray(tasks) ? tasks : [];

  const handleTaskComplete = ({ year, month, task }: BasicMonthData & { task: BasicTodoData }) => {
    dispatch(toggleTask({ year, month, ...task }));
    dispatch(toggleTaskInCalendar(task));
  };

  const handleEditTask = ({ id }: Pick<BasicTodoData, 'id'>) => {
    const { task, cycle } = findTaskWithID({ id, todo });
    dispatch(triggerEditorWithTask({ task, cycle }));
  };

  return (
    <div className="calendar-todo-list">
      <ul>
        {list.map((task) => (
          <li key={task.id} className={`task-${task.repeat ? 'repeat' : 'norepeat'}`}>
            <button
              className={`task${task.complete ? ' complete' : ''}`}
              onClick={() => {
                handleTaskComplete({ year: date.year, month: date.month, task });
              }}
            >
              <BasicCheckbox checked={task.complete} />
              <div className="info">
                <div className="repeat-info">
                  <div className="circle"></div>
                  <p>{task.repeat ? '반복 일정' : '오늘 할 일'}</p>
                </div>
                <h3 className="name">{task.works}</h3>
              </div>
            </button>
            <button
              className="edit"
              onClick={() => {
                handleEditTask({ id: task.id });
              }}
            >
              <IconArrowRight color="#E5E5E5" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CalendarTodoList;
