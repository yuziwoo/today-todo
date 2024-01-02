import { Tasks } from 'src/types/todo';

export const tasks: Tasks = {
  initialId: 1006,
  tasks: [
    {
      id: 1000,
      year: 2024,
      month: 0,
      day: 30,
      works: '공부하기',
      complete: false,
    },
    {
      id: 1005,
      year: 2024,
      month: 0,
      day: 30,
      works: '공부하기2',
      complete: true,
    },
  ],
  repeatTasks: {
    day: [
      {
        id: 1001,
        start: 20240019,
        end: 20240026,
        works: '매일 책 읽기',
        complete: [
          {
            year: 2023,
            month: 11,
            day: 19,
          },
          {
            year: 2023,
            month: 11,
            day: 20,
          },
        ],
      },
    ],
    week: [
      {
        id: 1002,
        start: 20240019,
        repeat: [2, 4],
        end: 20240030,
        works: '도서관 가기',
        complete: [
          {
            year: 2024,
            month: 0,
            day: 19,
          },
          {
            year: 2024,
            month: 0,
            day: 21,
          },
        ],
      },
    ],
    month: [
      {
        id: 1003,
        start: 20240001,
        repeat: {
          day: 1,
        },
        end: 20241101,
        works: '이번 달 계획 세우기',
        complete: [],
      },
    ],
    year: [
      {
        id: 1004,
        start: 20240024,
        repeat: {
          month: 11,
          day: 24,
        },
        end: 20261124,
        works: '크리스마스 케익 준비하기',
        complete: [],
      },
    ],
  },
};
