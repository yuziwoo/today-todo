import axios from 'axios';
import { BasicMonthData, PublicRestDayData } from '../../types/calendarTypes';
import { convertToTwoDigitString } from '../../utills/converter';
import { formatRestDayData } from './formatRestDayData';

export const getRestDayData = async ({ year, month }: BasicMonthData) => {
  // githubpages 이용을 위해 서비스키를 숨기지 않았습니다. 무단 사용을 금지합니다.
  const serviceKey = `vhiGSXX2IfjHqLKxhhwTnvEkr6r%2Blz7PiU%2BBnbHtTu5dQVP2q9e%2FKGzH67tsY0gZORKAYyQwmPd4T4AR5Yz0Aw%3D%3D`;

  const restDayDatas = axios
    .get(
      `http://apis.data.go.kr/B090041/openapi/service/SpcdeInfoService/getRestDeInfo?solYear=${year}&solMonth=${convertToTwoDigitString(
        month + 1
      )}&_type=json&ServiceKey=${serviceKey}`
    )
    .then((res) => {
      const publicRestDays: PublicRestDayData = res.data.response.body?.items.item;
      const restDays = formatRestDayData(publicRestDays);
      return restDays;
    })
    .catch((e) => {
      throw e;
    });

  return restDayDatas;
};
