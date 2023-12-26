import { BasicTodoData } from '../../../../types/calendarTypes';
import './calendarTableCell.css';

interface CalendarTableCellProps {
  day: number;
  restDay: null | boolean;
  todo: BasicTodoData[];
  isCurrentMonth: boolean;
}

const CalendarTableCell = ({ day, restDay, todo, isCurrentMonth }: CalendarTableCellProps) => {
  const completeTask = todo.filter((task) => task?.complete === true);
  const unCompleteTask = todo.filter((task) => task?.complete === false);

  return (
    <div
      className={`calendar-table-cell${isCurrentMonth ? ' current-month' : ''}${
        restDay === true ? ' restday' : ''
      }`}
    >
      <button className="canHover">
        <div className="date">
          <span>{day}</span>
        </div>
        <div className="todo">
          {completeTask.map((task) => (
            <span className="task complete" key={task.id}></span>
          ))}
          {unCompleteTask.map((task) => (
            <span className="task" key={task.id}></span>
          ))}
        </div>
      </button>
    </div>
  );
};

export default CalendarTableCell;
