import axios from 'axios';
import {
  MonthArray,
  CalendarYearMonthProps,
  DayInfoProps,
  RestDayInfosTypes,
  RestDayInfoTypes,
} from '../../types/calendar';
import { convertToTwoDigitString, getMaxDay } from '../../utills/calendar';

export const getThreeMonth = async (year: number, month: number): Promise<MonthArray[]> => {
  const newThreeMonth = [];

  for (let i = -1; i <= 1; i++) {
    const monthArray = getMonthArray({ year, month: month + i });
    const monthArrayWithRestDayData = await addRestDayData(year, month + i, monthArray);
    newThreeMonth.push(monthArrayWithRestDayData);
  }

  return newThreeMonth;
};

const getMonthArray = ({ year, month }: CalendarYearMonthProps): MonthArray => {
  const monthArray = Array.from({ length: getMaxDay({year, month}) }, (_, index) => ({
    day: index + 1,
    restDay: null,
  }));

  return monthArray;
};
const formatRestDayResponseToDayInfoObject = (restDayInfo: RestDayInfoTypes): DayInfoProps => ({
  day: restDayInfo.locdate % 100,
  restDay: restDayInfo.isHoliday === 'Y' ? true : false,
  dateName: restDayInfo.dateName,
});

const getRestDay = async ({ year, month }: CalendarYearMonthProps): Promise<DayInfoProps[]> => {
  // githubpages 이용을 위해 서비스키를 숨기지 않았습니다. 무단 사용을 금지합니다.
  const serviceKey = `vhiGSXX2IfjHqLKxhhwTnvEkr6r%2Blz7PiU%2BBnbHtTu5dQVP2q9e%2FKGzH67tsY0gZORKAYyQwmPd4T4AR5Yz0Aw%3D%3D`;
  const restDaysArray = axios
    .get(
      `http://apis.data.go.kr/B090041/openapi/service/SpcdeInfoService/getRestDeInfo?solYear=${year}&solMonth=${convertToTwoDigitString(
        month
      )}&_type=json&ServiceKey=${serviceKey}`
    )
    .then((res) => {
      const restDayInfos: RestDayInfosTypes = res.data.response.body?.items.item;
      const restDays: DayInfoProps[] = [];

      if (Array.isArray(restDayInfos)) {
        restDayInfos.forEach((restDayInfo) => {
          restDays.push(formatRestDayResponseToDayInfoObject(restDayInfo));
        });
        return restDays;
      }

      if (typeof restDayInfos !== 'undefined') {
        restDays.push(formatRestDayResponseToDayInfoObject(restDayInfos));
      }

      return restDays;
    })
    .catch((e) => {
      throw e;
    });
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

