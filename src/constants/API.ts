interface LOCAL_STORAGE_KEYProps {
  darkmode: 'darkmode',
  todo: 'todo',
}

export const LOCAL_STORAGE_KEY: LOCAL_STORAGE_KEYProps = {
  darkmode: 'darkmode',
  todo: 'todo',
} as const;

export const CALENDAR_API = {
  minYear: 1900,
  maxYear: 2100,
  dayOfWeek: ['일', '월', '화', '수', '목', '금', '토'],
} as const;
