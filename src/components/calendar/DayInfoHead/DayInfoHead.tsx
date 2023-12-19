import './dayInfoHead.css';
import { CalendarDateProps, MonthArray } from '../../../types/calendar';
import { getDayOfWeek, getDayOfWeekString } from '../../../utills/calendar';

interface DayInfoHeadProps {
  date: CalendarDateProps;
  threeMonth: MonthArray[];
}

const DayInfoHead = ({ date, threeMonth }: DayInfoHeadProps) => {
  const restDayInfo = threeMonth[1][date.day - 1]?.restDay;
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
      </div>

      <div className="ddayBox">
        <span>D + 1</span>
      </div>
    </div>
  );
};

export default DayInfoHead;
