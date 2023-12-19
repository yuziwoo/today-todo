import './calendarTableTD.css';
import { CompiledTaskProps } from '../../../types/todo';

interface CalendarTableTDProps {
  day: number;
  restDay: null | boolean;
  todo: undefined | CompiledTaskProps[];
  isToday: boolean;
  isTargetDay: boolean;
  isCurrentMonth: boolean;
  onClickHandler: () => void;
}

const CalendarTableTD = ({
  day,
  restDay,
  todo,
  isToday,
  isTargetDay,
  isCurrentMonth,
  onClickHandler,
}: CalendarTableTDProps) => {
  return (
    <button
      className={`td canHover${isCurrentMonth ? ' currentMonth' : ' notCurrentMonth'}${
        restDay ? ' restday' : ''
      }${isToday ? ' today' : ''}${isTargetDay ? ' active' : ''}`}
      onClick={onClickHandler}
    >
      <div className="numberBox">
        <span>{day}</span>
      </div>
      <div className="schedule">
        {Array.isArray(todo)
          ? todo.map((task) => (
              <span className={`circle${task.complete ? ' complete' : ''}`}></span>
            ))
          : ''}
      </div>
    </button>
  );
};

export default CalendarTableTD;
