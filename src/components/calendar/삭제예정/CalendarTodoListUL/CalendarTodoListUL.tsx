import './calendarTodoListUL.css';
import { CalendarDateProps } from '../../../../types/삭제예정/calendar';
import { CompiledTaskProps } from '../../../../types/todo';
import CalendarTodoListLI from '../CalendarTodoListLI/CalendarTodoListLI';

interface CalendarTodoListProps {
  date: CalendarDateProps;
  todo: CompiledTaskProps[] | undefined;
}

const CalendarTodoListUL = ({ date, todo }: CalendarTodoListProps) => {
  if (todo !== undefined) {
    return (
      <div className="todoList">
        <ul>
          {todo.map((task, index) => (
            <CalendarTodoListLI key={index} task={task} />
          ))}
        </ul>
      </div>
    );
  }
  return <div></div>;
};

export default CalendarTodoListUL;
