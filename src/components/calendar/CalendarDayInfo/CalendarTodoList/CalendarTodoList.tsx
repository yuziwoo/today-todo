import { BasicDateData, BasicTodoData } from '../../../../types/calendarTypes';
import { IconCheck } from '../../../icons/icons';
import './calendarTodoList.css';

interface CalendarTodoListProps extends BasicDateData {
  todoList: BasicTodoData[];
}

const CalendarTodoList = ({ year, month, day, todoList }: CalendarTodoListProps) => {
  // todoList가 undefined인 경우가 있어 오류 방지를 위해 list 변수 사용
  const list = Array.isArray(todoList) ? todoList : [];

  return (
    <ul className="todo-list">
      {list.map((task) => (
        <li key={task.id}>
          <button className={`canHover task${task.complete ? ' complete' : ''}`}>
            <div className="checkbox">
              <IconCheck color="white" />
            </div>
            <p>{task.works}</p>
          </button>
          <button className="canHover edit">
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
