import BasicCheckbox from 'src/components/common/BasicCheckbox/BasicCheckbox';
import { CALENDAR_API } from 'src/constants/API';
import './editorWeekRepeatButton.css';

interface EditorWeekRepeatButtonProps {
  isActive: boolean;
  dayOfWeek: number[];
  handleUpdateCycle: (cycle: string) => void;
  handleUpdateDayOfWeek: (dayOfWeek: number) => void;
}

const EditorWeekRepeatButton = ({
  isActive,
  dayOfWeek,
  handleUpdateCycle,
  handleUpdateDayOfWeek,
}: EditorWeekRepeatButtonProps) => {
  const handleButtonClick = () => {
    handleUpdateCycle('week');
  };

  const dayOfWeeks = CALENDAR_API.dayOfWeek.map((day, index) => ({
    day,
    isActiveDay: dayOfWeek.includes(index),
  }));

  return (
    <button
      className={`editor-repeat-button-week${isActive ? ' active' : ''}`}
      onClick={handleButtonClick}
    >
      <div className="name">
        <h2>매주</h2>
        <h2>반복하기</h2>
      </div>
      <div className="day-of-week">
        {dayOfWeeks.map(({ day, isActiveDay }, index) => (
          <div
          className={`button${isActiveDay ? ' active' : ''}`}
          onClick={() => {
            if (isActive) {
              handleUpdateDayOfWeek(index);
            }
          }}
          key={index}
        >
          <span>{day}</span>
        </div>
        ))}
      </div>
      <BasicCheckbox checked={isActive} />
    </button>
  );
};

export default EditorWeekRepeatButton;
