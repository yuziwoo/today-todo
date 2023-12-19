import './dayInfoHead.css';
import { CalendarDateProps, MonthArray } from '../../../types/calendar';
import { getDayOfWeek, getDayOfWeekString } from '../../../utills/calendar';
import { getDDayString } from '../../../api/calendar/getDDayString';

interface DayInfoHeadProps {
  date: CalendarDateProps;
  monthData: MonthArray;
}

const DayInfoHead = ({ date, monthData }: DayInfoHeadProps) => {
  const restDayInfo = monthData[date.day - 1]?.restDay;
  const dateName = monthData[date.day - 1]?.dateName;
  const dayOfWeekNum = getDayOfWeek(date);
  const dayOfWeek = getDayOfWeekString(date);

  return (
    <div className="dayInfoHead">
      <div className="dayInfoBox">
        <h1
          className={`${restDayInfo !== null ? 'restDay' : ''}${
            dayOfWeekNum === 6 ? ' saturday' : ''
          }${dayOfWeekNum === 0 ? ' sunday' : ''}`}
        >
          {date.day} {dayOfWeek}
        </h1>
        <p>{dateName !== undefined ? `${dateName}` : ''}</p>
      </div>

      <div className="ddayBox">
        <span>{getDDayString({ year: date.year, month: date.month, day: date.day })}</span>
      </div>
    </div>
  );
};

export default DayInfoHead;
