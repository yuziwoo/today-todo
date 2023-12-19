interface CalendarTableTDProps {
  day: number;
  restDay: null | boolean;
  isToday: boolean;
  isTargetDay: boolean;
  isCurrentMonth: boolean;
  onClickHandler: () => void;
}

const CalendarTableTD = ({
  day,
  restDay,
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
      <div className="schedule"></div>
    </button>
  );
};

export default CalendarTableTD;
