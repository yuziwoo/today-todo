import './calendarTable.css';
import { CALENDAR_API } from '../../../constants/API';
import { getLastMonth, getNextMonth, isSameDate } from '../../../utills/calendar';
import CalendarTableTH from '../CalendarTableTH/CalendarTableTH';
import { CalendarDateProps, MonthArray } from '../../../types/calendar';

interface CalendarTableProps {
  date: CalendarDateProps;
  threeMonth: MonthArray[];
  onChangeDate: (date: CalendarDateProps) => void;
}

const CalendarTable = ({ date, threeMonth, onChangeDate }: CalendarTableProps) => {
  const startDayOfWeek = new Date(date.year, date.month, 1).getDay();
  const displayDateLastMonth = startDayOfWeek !== 0 ? threeMonth[0].slice(-startDayOfWeek) : [];
  const displayDateNextMonthLength = 7 - ((displayDateLastMonth.length + threeMonth[1].length) % 7);
  const displayDateNextMonth = threeMonth[2].slice(
    0,
    displayDateNextMonthLength === 7 ? 0 : displayDateNextMonthLength
  );

  const beforeCurrentMonth = getLastMonth(date.year, date.month);
  const afterCurrentMonth = getNextMonth(date.year, date.month);

  const isRestDay = (restDayData: boolean | null) => restDayData !== null;

  const today = new Date();

  return (
    <section className="table">
      {CALENDAR_API.dayOfWeek.map((day, index) => (
        <CalendarTableTH day={day} key={index} />
      ))}
      {displayDateLastMonth.map(({ day, restDay }, index) => (
        <button
          className={`td canHover lastMonth ${isRestDay(restDay) && 'restday'} ${
            isSameDate({ ...beforeCurrentMonth, day }, today) && 'today'
          }`}
          key={index}
          onClick={() => {
            onChangeDate({ ...beforeCurrentMonth, day: day });
          }}
        >
          <div className="numberBox">
            <span>{day}</span>
          </div>
          <div className="schedule"></div>
        </button>
      ))}
      {threeMonth[1].map(({ day, restDay }, index) => (
        <button
          className={`td canHover currentMonth ${restDay !== null ? 'restday' : ''} ${
            isSameDate({ year: date.year, month: date.month, day }, today) && 'today'
          } ${day === date.day && 'active'}`}
          key={index}
          onClick={() => {
            onChangeDate({ year: date.year, month: date.month, day: day });
          }}
        >
          <div className="numberBox">
            <span>{day}</span>
          </div>
          <div className="schedule"></div>
        </button>
      ))}
      {displayDateNextMonth.map(({ day, restDay }, index) => (
        <button
          className={`td canHover nextMonth ${restDay !== null ? 'restday' : ''} ${
            isSameDate({ ...afterCurrentMonth, day }, today) && 'today'
          }`}
          onClick={() => {
            onChangeDate({ ...afterCurrentMonth, day: day });
          }}
          key={index}
        >
          <div className="numberBox">
            <span>{day}</span>
          </div>
          <div className="schedule"></div>
        </button>
      ))}
    </section>
  );
};

export default CalendarTable;
