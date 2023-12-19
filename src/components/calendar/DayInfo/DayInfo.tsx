import './dayInfo.css';
import DayInfoHead from '../DayInfoHead/DayInfoHead';
import { CalendarDateProps, MonthArray } from '../../../types/calendar';

interface DayInfoProps {
  date: CalendarDateProps;
  threeMonth: MonthArray[];
}

const DayInfo = ({ date, threeMonth }: DayInfoProps) => {
  return (
    <section className="dayInfo">
      <DayInfoHead date={date} threeMonth={threeMonth} />
    </section>
  );
};

export default DayInfo;
