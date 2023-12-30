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

export const EDITOR = {
  worksPlaceholder: ['하루에 한 번씩 웃기', '오늘 하루 좋았던 일 기록하기', '아침 스트레칭', '이번 주 계획 세우기', '필요한 물건 구매하기', '오늘 일기 쓰기'],
} as const;