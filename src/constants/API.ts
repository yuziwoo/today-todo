export const LOCAL_STORAGE_KEY = {
  darkmode: 'darkmode',
} as const;

export const CALENDAR_API = {
  minYear: 1700,
  maxYear: 2200,
  getMaxDay(year: number, month: number): number {
    return new Date(year, month, 1).getDay();
  },
  dayOfWeek: ['일', '월', '화', '수', '목', '금', '토'],
} as const;
