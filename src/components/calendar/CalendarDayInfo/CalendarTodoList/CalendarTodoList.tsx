import { useDispatch, useSelector } from 'react-redux';
import { BasicDateData, BasicMonthData, BasicTodoData } from '../../../../types/calendarTypes';
import './calendarTodoList.css';
import { toggleTask } from '../../../../store/slice/todoSlice';
import { toggleTaskInCalendar } from '../../../../store/slice/calendarSlice';
import BasicCheckbox from '../../../common/BasicCheckbox/BasicCheckbox';
import { RootState } from 'src/store/store';
import { findTaskWithID } from 'src/api/todoAPI/findTaskWithID';
import { triggerEditorWithTask } from 'src/store/slice/editorSlice';

interface CalendarTodoListProps extends BasicDateData {
  todoList: BasicTodoData[];
}

const CalendarTodoList = ({ year, month, day, todoList }: CalendarTodoListProps) => {
  // todoList가 undefined인 경우가 있어 오류 방지를 위해 list 변수 사용
  const list = Array.isArray(todoList) ? todoList : [];

  const dispatch = useDispatch();
  const todo = useSelector((state: RootState) => state.todo);

  const onCheckboxClick = ({ year, month, task }: BasicMonthData & { task: BasicTodoData }) => {
    dispatch(toggleTask({ year, month, ...task }));
    dispatch(toggleTaskInCalendar(task));
  };

  const onEditButtonClick = ({ id }: Pick<BasicTodoData, 'id'>) => {
    const { task, cycle } = findTaskWithID({ id, todo });
    dispatch(triggerEditorWithTask({ task, cycle }));
  };

  return (
    <ul className="todo-list">
      {list.map((task) => (
        <li key={task.id}>
          <button
            className={`canHover task${task.complete ? ' complete' : ''}`}
            onClick={() => {
              onCheckboxClick({ year, month, task });
            }}
          >
            <BasicCheckbox checked={task.complete} />
            <p>{task.works}</p>
          </button>
          <button
            className="canHover edit"
            onClick={() => {
              onEditButtonClick({ id: task.id });
            }}
          >
            <div className="circle">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </button>
        </li>
      ))}
    </ul>
  );
};

export default CalendarTodoList;
