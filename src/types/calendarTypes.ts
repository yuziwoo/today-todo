import { Tasks } from './todo';

export type BasicMonthData = {
  year: number;
  month: number;
};

export type DetailedMonthData = BasicMonthData & {
  day: number;
  maximumDate: number;
  startDayOfWeek: number;
};

export type ChangeMonthProps = BasicMonthData & {
  todo: Tasks;
};

export type BasicTodoData = {
  id: number;
  works: string;
  complete: boolean;
  repeat: boolean;
};

type BasicOneDayData = {
  day: number;
};

export type BasicDateData = BasicMonthData & BasicOneDayData;

export type RestData = {
  restDay: null | boolean;
  dateName: null | string;
};

export type RestDayData = BasicOneDayData & RestData;

export type OneDayData = RestDayData & {
  todo: BasicTodoData[];
};

export type CalendarDataType = BasicMonthData & {
  datas: OneDayData[];
};

export type RestDayPayloadData = BasicMonthData & {
  restDayData: RestDayData[][];
  todo: Tasks;
};

export type RestDayOneMonthPayloadData = BasicMonthData & {
  restDayData: RestDayData[];
  todo: Tasks;
};

export type PublicRestDayData = {
  dateKind: string;
  dateName: string;
  isHoliday: 'Y' | 'N';
  locdate: number;
  seq: number;
};
