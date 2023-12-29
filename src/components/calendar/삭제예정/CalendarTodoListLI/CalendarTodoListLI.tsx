import './CalendarTodoListLI.css';
import { IconCheck } from '../../../icons/icons';
import { CompiledTaskProps } from '../../../../types/todo';
import { useDispatch } from 'react-redux';
// import { toggleSingleTask } from '../../../../store/slice/todoSlice';

interface CalendarTodoListLIProps {
  task: CompiledTaskProps;
}

const CalendarTodoListLI = ({ task }: CalendarTodoListLIProps) => {
  const dispatch = useDispatch();
  const handleToggleTask = (task: CompiledTaskProps) => {
    const isRepeat = task.repeat;
    if (!isRepeat) {
      // dispatch(toggleSingleTask({ task }));
      return;
    }
  };
  return (
    <li className="todoListLI">
      <button
        className={`canHover label ${task.complete ? 'complete' : ''}`}
        onClick={() => {
          handleToggleTask(task);
        }}
      >
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
  );
};

export default CalendarTodoListLI;
