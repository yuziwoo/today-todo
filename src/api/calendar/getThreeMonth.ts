import axios from 'axios';
import {
  MonthArray,
  CalendarYearMonthProps,
  DateInfoProps,
  RestDayInfosTypes,
  RestDayInfoTypes,
} from '../../types/calendar';
import {
  calcYearMonth,
  convertDateToNumber,
  convertToTwoDigitString,
  getMaxDay,
} from '../../utills/calendar';
import {
  CompiledTaskProps,
  TasksProps,
  TaskProps,
  RepeatDayTaskProps,
  RepeatMonthTaskProps,
  RepeatWeekTaskProps,
  RepeatYearTaskProps,
} from '../../types/todo';

export const getThreeMonth = async (
  year: number,
  month: number,
  todo: TasksProps
): Promise<MonthArray[]> => {
  const newThreeMonth = [];

  for (let i = -1; i <= 1; i++) {
    const yearAndMonth = calcYearMonth(year, month, i);
    const monthArray = getMonthArray({ ...yearAndMonth });
    const monthArrayWithRestDayData = await addRestDayData(
      yearAndMonth.year,
      yearAndMonth.month,
      monthArray
    );
    const monthArrayWithTodoData = addTodoData(
      yearAndMonth.year,
      yearAndMonth.month,
      monthArrayWithRestDayData,
      todo
    );
    newThreeMonth.push(monthArrayWithTodoData);
  }
  return newThreeMonth;
};

const restoreTodo = (monthArray: MonthArray): MonthArray => {
  return monthArray.map((data) => ({ ...data, todo: undefined }));
};

export const resetOnlyTodo = (
  year: number,
  month: number,
  todo: TasksProps,
  threeMonth: MonthArray[]
) => {
  const newThreeMonth = threeMonth.map((monthArray, index) => {
    const newMonthArray = restoreTodo([...monthArray]);
    return addTodoData(year, month, newMonthArray, todo);
  });

  return newThreeMonth;
};

const getMonthArray = ({ year, month }: CalendarYearMonthProps): MonthArray => {
  const monthArray = Array.from({ length: getMaxDay({ year, month }) }, (_, index) => ({
    day: index + 1,
    restDay: null,
    todo: undefined,
  }));

  return monthArray;
};
const formatRestDayResponseToDayInfoObject = (restDayInfo: RestDayInfoTypes): DateInfoProps => ({
  day: restDayInfo.locdate % 100,
  restDay: restDayInfo.isHoliday === 'Y' ? true : false,
  dateName: restDayInfo.dateName,
});

const getRestDay = async ({ year, month }: CalendarYearMonthProps): Promise<DateInfoProps[]> => {
  // githubpages 이용을 위해 서비스키를 숨기지 않았습니다. 무단 사용을 금지합니다.
  const serviceKey = `vhiGSXX2IfjHqLKxhhwTnvEkr6r%2Blz7PiU%2BBnbHtTu5dQVP2q9e%2FKGzH67tsY0gZORKAYyQwmPd4T4AR5Yz0Aw%3D%3D`;

  // 테스트를 위해 API 통신 묵음처리
  // const restDaysArray = axios
  //   .get(
  //     `http://apis.data.go.kr/B090041/openapi/service/SpcdeInfoService/getRestDeInfo?solYear=${year}&solMonth=${convertToTwoDigitString(
  //       month
  //     )}&_type=json&ServiceKey=${serviceKey}`
  //   )
  //   .then((res) => {
  //     const restDayInfos: RestDayInfosTypes = res.data.response.body?.items.item;
  //     const restDays: DateInfoProps[] = [];

  //     if (Array.isArray(restDayInfos)) {
  //       restDayInfos.forEach((restDayInfo) => {
  //         restDays.push(formatRestDayResponseToDayInfoObject(restDayInfo));
  //       });
  //       return restDays;
  //     }

  //     if (typeof restDayInfos !== 'undefined') {
  //       restDays.push(formatRestDayResponseToDayInfoObject(restDayInfos));
  //     }

  //     return restDays;
  //   })
  //   .catch((e) => {
  //     throw e;
  //   });

  // 묵음 처리용 임시 선언
  const restDaysArray: DateInfoProps[] = [
    {
      day: 25,
      restDay: true,
      dateName: '크리스마스',
    },
  ];
  return restDaysArray;
};

const addRestDayData = async (targetYear: number, targetMonth: number, monthArray: MonthArray) => {
  const newMonthArray = [...monthArray];
  const restDays = await getRestDay({ year: targetYear, month: targetMonth + 1 });

  restDays.forEach(({ day, restDay, dateName }) => {
    newMonthArray[day - 1] = { ...newMonthArray[day - 1], day, restDay, dateName };
  });

  return newMonthArray;
};

const getBasicTaskList = (year: number, month: number, tasks: TaskProps[]) => {
  const todoList: CompiledTaskProps[] = [];
  tasks.forEach((task) => {
    if (task.year === year && task.month === month) {
      todoList.push({
        id: task.id,
        day: task.day,
        workToDo: task.workToDo,
        complete: task.complete,
        repeat: false,
      });
    }
  });
  return todoList;
};

const getDayRepeatTaskList = (
  year: number,
  month: number,
  tasks: RepeatDayTaskProps[]
): CompiledTaskProps[] => {
  const lastDay = convertDateToNumber({ year, month, day: getMaxDay({ year, month }) });
  const firstDay = convertDateToNumber({ year, month, day: 1 });

  let todoList: CompiledTaskProps[] = [];

  tasks.forEach((task) => {
    // 시작일은 마지막날보다 작고, 종료일은 첫날보다 크거나 null이어야한다.
    if (task.start <= lastDay && (task.end === null || task.end > firstDay)) {
      // 데이터를 추가할 첫 날짜는 시작일과 첫날 중 큰 날짜로한다.
      let date = Math.max(task.start, firstDay) % 100;
      const maxDate = Math.min(task.end !== null ? task.end : lastDay, lastDay) % 100;

      const currentTodoList: CompiledTaskProps[] = [];
      const completeList = task.complete.filter(
        (date) => date.year === year && date.month === month
      );

      while (date <= maxDate) {
        const day = date % 100;
        currentTodoList.push({
          id: task.id,
          day,
          workToDo: task.workToDo,
          complete: completeList.findIndex((dateInfo) => dateInfo.day === day) >= 0,
          repeat: true,
        });
        date += 1;
      }
      todoList = todoList.concat(currentTodoList);
    }
  });
  return todoList;
};

const getWeekRepeatTaskList = (
  year: number,
  month: number,
  tasks: RepeatWeekTaskProps[]
): CompiledTaskProps[] => {
  const todoList: CompiledTaskProps[] = [];

  return todoList;
};

const getMonthRepeatTaskList = (
  year: number,
  month: number,
  tasks: RepeatMonthTaskProps[]
): CompiledTaskProps[] => {
  const todoList: CompiledTaskProps[] = [];

  return todoList;
};

const getYearRepeatTaskList = (
  year: number,
  month: number,
  tasks: RepeatYearTaskProps[]
): CompiledTaskProps[] => {
  const todoList: CompiledTaskProps[] = [];

  return todoList;
};

const getTodoThisMonth = (
  targetYear: number,
  targetMonth: number,
  todo: TasksProps
): CompiledTaskProps[] => {
  const basicTaskList = getBasicTaskList(targetYear, targetMonth, todo.tasks);
  const dayRepeatTaskList = getDayRepeatTaskList(targetYear, targetMonth, todo.repeatTasks.day);
  // console.log(dayRepeatTaskList, todo.repeatTasks.day);
  const weekRepeatTaskList = getWeekRepeatTaskList(targetYear, targetMonth, todo.repeatTasks.week);
  const monthRepeatTaskList = getMonthRepeatTaskList(
    targetYear,
    targetMonth,
    todo.repeatTasks.month
  );
  const yearRepeatTaskList = getYearRepeatTaskList(targetYear, targetMonth, todo.repeatTasks.year);
  const todoList = [
    ...basicTaskList,
    ...dayRepeatTaskList,
    ...weekRepeatTaskList,
    ...monthRepeatTaskList,
    ...yearRepeatTaskList,
  ];
  return todoList;
};

const addTodoData = (
  targetYear: number,
  targetMonth: number,
  monthArray: MonthArray,
  todo: TasksProps
) => {
  const newMonthArray = [...monthArray];
  const todoThisMonth = getTodoThisMonth(targetYear, targetMonth, todo);

  todoThisMonth.forEach((task) => {
    if (Array.isArray(newMonthArray[task.day - 1].todo)) {
      newMonthArray[task.day - 1].todo?.push(task);
    }
    if (newMonthArray[task.day - 1].todo === undefined) {
      newMonthArray[task.day - 1].todo = [task];
    }
  });

  return newMonthArray;
};
