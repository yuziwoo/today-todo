import { BasicTodoData } from '../../../../types/calendarTypes';
import './calendarTableCell.css';

interface CalendarTableCellProps {
  day: number;
  restDay: null | boolean;
  todo: BasicTodoData[];
  isCurrentMonth: boolean;
  isCurrentDay: boolean;
  isToday: boolean;
  onClickTable: (day: number) => void;
}

const CalendarTableCell = ({
  day,
  restDay,
  todo,
  isCurrentMonth,
  isCurrentDay,
  isToday,
  onClickTable,
}: CalendarTableCellProps) => {
  const completeTask = todo.filter((task) => task?.complete === true);
  const unCompleteTask = todo.filter((task) => task?.complete === false);
  const onClickHandler = () => {
    onClickTable(day);
  };
  const className = `calendar-table-cell${isCurrentMonth ? ' current-month' : ''}${
    restDay === true ? ' restday' : ''
  }${isCurrentDay ? ' current-day' : ''}${isToday ? ' today' : ''}`;

  return (
    <div className={className}>
      <button className="canHover" onClick={onClickHandler}>
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
