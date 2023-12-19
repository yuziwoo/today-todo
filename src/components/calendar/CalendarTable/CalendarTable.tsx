import './calendarTable.css';
import { CALENDAR_API } from '../../../constants/API';
import {
  getLastMonth,
  getLastMonthDisplayDates,
  getNextMonth,
  getNextMonthDisplayDates,
  compareIsToday,
} from '../../../utills/calendar';
import CalendarTableTH from '../CalendarTableTH/CalendarTableTH';
import { CalendarDateProps, MonthArray } from '../../../types/calendar';
import CalendarTableTD from '../CalendarTableTD/CalendarTableTD';

interface CalendarTableProps {
  date: CalendarDateProps;
  threeMonth: MonthArray[];
  onChangeDate: (date: CalendarDateProps) => void;
}

const CalendarTable = ({ date, threeMonth, onChangeDate }: CalendarTableProps) => {
  const lastMonthDisplayDates = getLastMonthDisplayDates({
    year: date.year,
    month: date.month,
    lastMonthArray: threeMonth[0],
  });
  const nextMonthDisplayDates = getNextMonthDisplayDates({
    year: date.year,
    month: date.month,
    currentMonthArray: threeMonth[1],
    nextMonthArray: threeMonth[2],
  });

  const lastMonth = getLastMonth(date.year, date.month);
  const nextMonth = getNextMonth(date.year, date.month);

  return (
    <section className="table">
      {CALENDAR_API.dayOfWeek.map((day, index) => (
        <CalendarTableTH day={day} key={index} />
      ))}
      {lastMonthDisplayDates.map(({ day, restDay }) => (
        <CalendarTableTD
          day={day}
          restDay={restDay}
          isToday={compareIsToday({ ...lastMonth, day })}
          isTargetDay={false}
          isCurrentMonth={false}
          onClickHandler={() => {
            onChangeDate({ ...lastMonth, day: day });
          }}
          key={day}
        />
      ))}
      {threeMonth[1].map(({ day, restDay }) => (
        <CalendarTableTD
          day={day}
          restDay={restDay}
          isToday={compareIsToday({ year: date.year, month: date.month, day })}
          isTargetDay={day === date.day}
          isCurrentMonth={true}
          onClickHandler={() => {
            onChangeDate({ year: date.year, month: date.month, day: day });
          }}
          key={day}
        />
      ))}
      {nextMonthDisplayDates.map(({ day, restDay }) => (
        <CalendarTableTD
          day={day}
          restDay={restDay}
          isToday={compareIsToday({ ...nextMonth, day })}
          isTargetDay={false}
          isCurrentMonth={false}
          onClickHandler={() => {
            onChangeDate({ ...nextMonth, day: day });
          }}
          key={day}
        />
      ))}
    </section>
  );
};

export default CalendarTable;
