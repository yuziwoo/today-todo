import './dayInfo.css';
import DayInfoHead from '../DayInfoHead/DayInfoHead';
import { CalendarDateProps, MonthArray } from '../../../types/calendar';

interface DayInfoProps {
  date: CalendarDateProps;
  monthData: MonthArray;
}

const DayInfo = ({ date, monthData }: DayInfoProps) => {
  return (
    <section className="dayInfo">
      <DayInfoHead date={date} monthData={monthData} />
    </section>
  );
};

export default DayInfo;
