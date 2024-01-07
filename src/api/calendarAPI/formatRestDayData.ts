import { PublicRestDayData, RestDayData } from '../../types/calendarTypes';

export const formatRestDayData = (datas: PublicRestDayData): RestDayData[] => {
  if (datas === undefined) return [];
  if (Array.isArray(datas)) {
    const restDay = datas.map((data) => ({
      day: data.locdate % 100,
      restDay: data.isHoliday === 'Y' ? true : false,
      dateName: data.dateName,
    }));
    return restDay;
  }

  return [
    {
      day: datas.locdate % 100,
      restDay: datas.isHoliday === 'Y' ? true : false,
      dateName: datas.dateName,
    },
  ];
};
