import { useEffect, useReducer, useState } from 'react';

import './style/calendar.css';
import calendarReducer from './reducer/calendar-reducer';
import { CalendarDateProps, MonthArray } from '../../types/calendar';

import MonthSelector from '../../components/calendar/MonthSelector/MonthSelector';
import CalendarTable from '../../components/calendar/CalendarTable/CalendarTable';
import CalendarLoading from '../../components/effect/CalendarLoading';

import { compileDateToCalendarDateProps, getThreeMonth } from '../../utills/calendar';

const Calendar = () => {
  // state initalize
  const initialTargetDate: CalendarDateProps = compileDateToCalendarDateProps(new Date());
  const initialMonthArray: MonthArray = [{ day: 1, restDay: null }];

  // 타겟 날짜 기준으로 전달, 이번달, 다음달의 정보를 모아둔 배열
  const [threeMonth, setThreeMonth] = useState<MonthArray[]>([
    initialMonthArray,
    initialMonthArray,
    initialMonthArray,
  ]);
  const [targetDate, dispatchDate] = useReducer(calendarReducer, initialTargetDate);

  // 로딩 애니메이션을 보여주기 위한 상태 관리
  const [loading, setLoading] = useState(true);
  const [tableHeight, setTableHeight] = useState(0);

  // 타겟 날짜의 월이 바뀌면 threeMonth를 리셋한다.
  useEffect(() => {
    const resetThreeMonth = async () => {
      try {
        const newThreeMonth = await getThreeMonth(targetDate.year, targetDate.month);
        setThreeMonth(newThreeMonth);
      } finally {
        setLoading(false);
      }
    };
    resetThreeMonth();
  }, [targetDate.month, targetDate.year]);

  // 로딩 화면을 보여주기 위한 함수
  const reloadLoading = () => {
    const height = document.getElementsByClassName('table')[0]?.clientHeight;
    if (height !== undefined) {
      setTableHeight(height);
    }
    setLoading(true);
  };

  const handleChangeDate = ({ year, month, day }: CalendarDateProps) => {
    if (targetDate.year !== year || targetDate.month !== month) {
      reloadLoading();
    }
    dispatchDate({ type: 'change', year, month, day });
  };

  const handleNextMonth = () => {
    reloadLoading();
    dispatchDate({ type: 'changeToNextMonth' });
  };

  const handleLastMonth = () => {
    reloadLoading();
    dispatchDate({ type: 'changeToLastMonth' });
  };

  return (
    <div className="calendar">
      <MonthSelector
        date={targetDate}
        onLastMonth={handleLastMonth}
        onNextMonth={handleNextMonth}
      />

      {loading ? (
        <CalendarLoading minHeight={tableHeight} />
      ) : (
        <CalendarTable date={targetDate} threeMonth={threeMonth} onChangeDate={handleChangeDate} />
      )}
    </div>
  );
};

export default Calendar;
