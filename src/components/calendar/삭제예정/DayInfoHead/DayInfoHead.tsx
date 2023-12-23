import './dayInfoHead.css';
import { CalendarDateProps, DateInfoProps } from '../../../../types/삭제예정/calendar';
import { getDayOfWeek, getDayOfWeekString } from '../../../../utills/삭제예정/calendar';
import { getDDayString } from '../../../../api/삭제예정/calendar/getDDayString';

interface DayInfoHeadProps {
  date: CalendarDateProps;
  dateInfo: DateInfoProps;
}

const DayInfoHead = ({ date, dateInfo }: DayInfoHeadProps) => {
  const restDayInfo = dateInfo?.restDay;
  const dateName = dateInfo?.dateName;
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
