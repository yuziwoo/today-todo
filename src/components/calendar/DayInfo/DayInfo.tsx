import './dayInfo.css';
import DayInfoHead from '../DayInfoHead/DayInfoHead';
import { CalendarDateProps, DateInfoProps } from '../../../types/calendar';
import CalendarTodoList from '../CalendarTodoList/CalendarTodoList';

interface DayInfoProps {
  date: CalendarDateProps;
  dateInfo: DateInfoProps;
}

const DayInfo = ({ date, dateInfo }: DayInfoProps) => {
  return (
    <section className="dayInfo">
      <DayInfoHead date={date} dateInfo={dateInfo} />
      <CalendarTodoList date={date} todo={dateInfo?.todo} />
    </section>
  );
};

export default DayInfo;
