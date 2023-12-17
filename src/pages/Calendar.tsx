import { IconArrowLeft } from '../components/icons';
const Calendar = () => {
  return (
    <div className="calendar">
      <section className="month-selecter">
        <button className="year-month-label">
          <h1>2023.12</h1>
        </button>
        <button className='last-month'>
          <IconArrowLeft color="black"/>
        </button>
      </section>
    </div>
  );
};

export default Calendar;
