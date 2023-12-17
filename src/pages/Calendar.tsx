import { IconArrowLeft, IconArrowRight } from '../components/icons';
import './calendar.css';

const Calendar = ({ darkmode }: { darkmode: boolean }) => {
  return (
    <div className="calendar">
      <section className="month-selecter">
        <button className="year-month-label">
          <h1>2023.12</h1>
        </button>
        <button className="last-month">
          <IconArrowLeft color={darkmode ? 'white' : 'black'} />
        </button>
        <button className="next-month">
          <IconArrowRight color={darkmode ? 'white' : 'black'} />
        </button>
      </section>

      <section className="table">
        <div className="tr">
          <span>일</span>
        </div>
        <div className="tr">
          <span>월</span>
        </div>
        <div className="tr">
          <span>화</span>
        </div>
        <div className="tr">
          <span>수</span>
        </div>
        <div className="tr">
          <span>목</span>
        </div>
        <div className="tr">
          <span>금</span>
        </div>
        <div className="tr">
          <span>토</span>
        </div>
      </section>
    </div>
  );
};

export default Calendar;
