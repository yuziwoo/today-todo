import './dayInfo.css';
import DayInfoHead from '../DayInfoHead/DayInfoHead';
import { CalendarDateProps, DateInfoProps } from '../../../types/calendar';

interface DayInfoProps {
  date: CalendarDateProps;
  dateInfo: DateInfoProps;
}

const DayInfo = ({ date, dateInfo }: DayInfoProps) => {
  return (
    <section className="dayInfo">
      <DayInfoHead date={date} dateInfo={dateInfo} />
    </section>
  );
};

export default DayInfo;
