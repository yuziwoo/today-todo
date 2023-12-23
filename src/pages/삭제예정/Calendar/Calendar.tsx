import { useEffect, useReducer, useState } from 'react';

import './style/calendar.css';
import calendarReducer from './reducer/calendar-reducer';
import { CalendarDateProps, CalendarYearMonthProps, MonthArray } from '../../../types/삭제예정/calendar';

import MonthSelector from '../../../components/calendar/삭제예정/MonthSelector/MonthSelector';
import CalendarTable from '../../../components/calendar/삭제예정/CalendarTable/CalendarTable';
import CalendarLoading from '../../../components/effect/CalendarLoading';
import DayInfo from '../../../components/calendar/삭제예정/DayInfo/DayInfo';

import { compileDateToCalendarDateProps } from '../../../api/삭제예정/calendar/compileToCalendarDateProps';
import { getThreeMonth, resetOnlyTodo } from '../../../api/삭제예정/calendar/getThreeMonth';
import { TasksProps } from '../../../types/todo';

interface CalendarProps {
  todo: TasksProps;
}

const Calendar = ({ todo }: CalendarProps) => {
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
  const [targetMonthYear, setTargetMonthYear] = useState<CalendarYearMonthProps>({
    year: 0,
    month: 0,
  });

  // 로딩 애니메이션을 보여주기 위한 상태 관리
  const [loading, setLoading] = useState(true);
  const [tableHeight, setTableHeight] = useState(0);

  // 타겟 날짜의 월이 바뀌면 threeMonth를 리셋한다.
  useEffect(() => {
    const resetThreeMonth = async () => {
      try {
        if (
          targetMonthYear.year !== targetDate.year ||
          targetMonthYear.month !== targetDate.month
        ) {
          const newThreeMonth = await getThreeMonth(targetDate.year, targetDate.month, todo);
          setThreeMonth(newThreeMonth);
          setTargetMonthYear({
            year: targetDate.year,
            month: targetDate.month,
          });
          return;
        }
        const newThreeMonth = resetOnlyTodo(targetDate.year, targetDate.month, todo, threeMonth);
        setThreeMonth(newThreeMonth);
      } finally {
        setLoading(false);
      }
    };
    resetThreeMonth();
    // eslint-disable-next-line
  }, [targetDate.month, targetDate.year, todo]);

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

      <DayInfo date={targetDate} dateInfo={threeMonth[1][targetDate.day - 1]} />
    </div>
  );
};

export default Calendar;
