import './calendarTable.css';
import { CALENDAR_API } from '../../../constants/API';
import { CalendarDateState } from '../../../pages/Calendar/reducer/calendar-reducer';
import { MonthArray } from '../../../pages/Calendar/Calendar';

const CalendarTable = ({
  date,
  threeMonth,
  onChangeDate,
}: {
  date: CalendarDateState;
  threeMonth: MonthArray[];
  onChangeDate: ({ year, month, day }: CalendarDateState) => void;
}) => {
  const startDayOfWeek = new Date(date.year, date.month, 1).getDay();
  const displayDateLastMonth = startDayOfWeek !== 0 ? threeMonth[0].slice(-startDayOfWeek) : [];
  const displayDateNextMonthLength = 7 - ((displayDateLastMonth.length + threeMonth[1].length) % 7);
  const displayDateNextMonth = threeMonth[2].slice(
    0,
    displayDateNextMonthLength === 7 ? 0 : displayDateNextMonthLength
  );

  const today = new Date();

  return (
    <section className="table">
      {CALENDAR_API.dayOfWeek.map((day, index) => (
        <div className="tr" key={index}>
          <span>{day}</span>
        </div>
      ))}
      {displayDateLastMonth.map(({ day, restDay }, index) => (
        <button
          className={`td canHover lastMonth ${restDay !== null ? 'restday' : ''} ${
            date.year === today.getFullYear() &&
            date.month - 1 === today.getMonth() &&
            day === today.getDate()
              ? 'today'
              : ''
          }`}
          key={index}
          onClick={() => {
            const year = date.month === 0 ? date.year - 1 : date.year;
            const month = date.month === 0 ? 11 : date.month - 1;

            onChangeDate({ year, month, day: day });
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
            date.year === today.getFullYear() &&
            date.month === today.getMonth() &&
            day === today.getDate()
              ? 'today'
              : ''
          } ${day === date.day ? 'active' : ''}`}
          key={index}
          onClick={() => {
            const year = date.year;
            const month = date.month;

            onChangeDate({ year, month, day: day });
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
            date.year === today.getFullYear() &&
            date.month + 1 === today.getMonth() &&
            day === today.getDate()
              ? 'today'
              : ''
          }`}
          onClick={() => {
            const year = date.month === 11 ? date.year + 1 : date.year;
            const month = date.month === 11 ? 0 : date.month + 1;

            onChangeDate({ year, month, day: day });
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
