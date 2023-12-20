import './calendarTodoList.css';
import { CalendarDateProps } from '../../../types/calendar';
import { CompiledTaskProps } from '../../../types/todo';
import { IconCheck } from '../../icons/icons';

interface CalendarTodoListProps {
  date: CalendarDateProps;
  todo: CompiledTaskProps[] | undefined;
}

const CalendarTodoList = ({ date, todo }: CalendarTodoListProps) => {
  if (todo !== undefined) {
    return (
      <div className="todoList">
        <ul>
          {todo.map((task, index) => (
            <li key={index}>
              <button className={`canHover label ${task.complete ? 'complete' : ''}`}>
                <div className="checkbox">
                  <IconCheck color="white" />
                </div>
                <p className="workToDo">{task.workToDo}</p>
              </button>
              <button className="canHover edit">
                <div className="circleGroup">
                  <span className="circle"></span>
                  <span className="circle"></span>
                  <span className="circle"></span>
                </div>
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
  }
  return <div></div>;
};

export default CalendarTodoList;
