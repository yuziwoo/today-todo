export type CalendarDateProps = {
  year: number;
  month: number;
  day: number;
};

export type CalendarYearMonthProps = Pick<CalendarDateProps, 'year' | 'month'>;

export type DayInfoProps = {
  day: number;
  restDay: null | boolean;
  dateName?: string;
}

export type MonthArray = DayInfoProps[];

export type RestDayInfoTypes = {
  dateKind: string;
  dateName: string;
  isHoliday: "Y" | "N";
  locdate: number;
  seq: number;
}

export type RestDayInfosTypes = undefined | RestDayInfoTypes | RestDayInfoTypes[];