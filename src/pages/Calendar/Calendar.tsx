import { useEffect, useReducer, useState } from 'react';
import './style/calendar.css';
import calendarReducer, { CalendarDateState } from './reducer/calendar-reducer';
import MonthSelector from '../../components/calendar/MonthSelector/MonthSelector';
import CalendarTable from '../../components/calendar/CalendarTable/CalendarTable';
import { CALENDAR_API } from '../../constants/API';
import axios from 'axios';

const today = new Date();

const initialTargetDate = {
  year: today.getFullYear(),
  month: today.getMonth(),
  day: today.getDate(),
};

type DayInfo = {
  day: number;
  restDay: null | string;
};

export type MonthArray = DayInfo[];

const getMonthArray = (year: number, month: number): MonthArray => {
  const monthArray = Array.from({ length: CALENDAR_API.getMaxDay(year, month) }, (_, index) => ({
    day: index + 1,
    restDay: null,
  }));

  return monthArray;
};

const Calendar = ({ darkmode }: { darkmode: boolean }) => {
  const [targetDate, dispatchDate] = useReducer(calendarReducer, initialTargetDate);
  const [threeMonth, setThreeMonth] = useState<MonthArray[]>([
    [{ day: 1, restDay: null }],
    [{ day: 1, restDay: null }],
    [{ day: 1, restDay: null }],
  ]);

  useEffect(() => {
    const getRestDay = async (year: number, month: number) => {
      const serviceKey = `vhiGSXX2IfjHqLKxhhwTnvEkr6r%2Blz7PiU%2BBnbHtTu5dQVP2q9e%2FKGzH67tsY0gZORKAYyQwmPd4T4AR5Yz0Aw%3D%3D`;
      // axios
      //   .get(
      //     `http://apis.data.go.kr/B090041/openapi/service/SpcdeInfoService/getRestDeInfo?solYear=${year}&solMonth=01&_type=json&ServiceKey=${serviceKey}`
      //   )
      //   .then((res) => {
      //     res.data.response.body.items.item.forEach(({locdate , dateName}: {locdate: number , dateName: string}) => {
      //       console.log(locdate % 100, dateName);
      //     })
      //   })
      //   .catch((e) => {
      //     console.log(e);
      //   });
      // return dayList;
    };
    getRestDay(targetDate.year, 12);
    const newThreeMonth = [];

    for (let i = -1; i <= 1; i++) {
      newThreeMonth.push(getMonthArray(targetDate.year, targetDate.month + i));
    }
    setThreeMonth(newThreeMonth);
  }, [targetDate.month, targetDate.year]);

  const handleChangeDate = ({ year, month, day }: CalendarDateState) => {
    dispatchDate({ type: 'change', year, month, day });
  };

  const handleNextMonth = () => {
    dispatchDate({ type: 'changeToNextMonth' });
  };

  const handleLastMonth = () => {
    dispatchDate({ type: 'changeToLastMonth' });
  };

  return (
    <div className="calendar">
      <MonthSelector
        darkmode={darkmode}
        date={targetDate}
        onLastMonth={handleLastMonth}
        onNextMonth={handleNextMonth}
      />

      <CalendarTable date={targetDate} threeMonth={threeMonth} onChangeDate={handleChangeDate} />
    </div>
  );
};

export default Calendar;
