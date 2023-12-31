import { CalendarDataType, RestDayData } from '../../types/calendarTypes';

export const addOneRestDayData = (
  defaultData: CalendarDataType,
  restDayData: RestDayData[]
): CalendarDataType => {
  const newData = {...defaultData};

  restDayData.forEach((data) => {
    const newObject = {...newData.datas[data.day - 1], ...data};
    newData.datas[data.day - 1] = newObject;
  })

  return newData;
};

export const addRestDayData = (
  defaultData: CalendarDataType[],
  restDayData: RestDayData[][]
): CalendarDataType[] => {
  const newData = [...defaultData];

  for (let i = 0; i < restDayData.length; i++) {
    restDayData[i].forEach((data) => {
      const newObject = { ...newData[i].datas[data.day - 1], ...data };
      newData[i].datas[data.day - 1] = newObject;
    });
  }

  return newData;
};
