interface LOCAL_STORAGE_KEYProps {
  darkmode: 'darkmode';
  todo: 'todo';
}

export const LOCAL_STORAGE_KEY: LOCAL_STORAGE_KEYProps = {
  darkmode: 'darkmode',
  todo: 'todo',
} as const;

export const CALENDAR_API = {
  minYear: 1900,
  maxYear: 2100,
  dayOfWeek: ['일', '월', '화', '수', '목', '금', '토'],
  dayOfWeekEng: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
  month: [
    'JANUARY',
    'FEBRUARY',
    'MARCH',
    'APRIL',
    'MAY',
    'JUNE',
    'JULY',
    'AUGUST',
    'SEPTEMBER',
    'OCTOBER',
    'NOVEMBER',
    'DECEMBER',
  ],
} as const;

export const TODO_API = {
  maxLength: 300,
} as const;
