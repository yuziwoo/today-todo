export const tasks = {
  initialId: 1006,
  tasks: [
    {
      id: 1000,
      year: 2023,
      month: 11,
      day: 30,
      workToDo: '공부하기',
      complete: false,
    },
    {
      id: 1005,
      year: 2023,
      month: 11,
      day: 30,
      workToDo: '공부하기2',
      complete: true,
    },
  ],
  repeatTasks: {
    day: [
      {
        id: 1001,
        start: {
          year: 2023,
          month: 11,
          day: 19,
        },
        end: null,
        workToDo: '책 읽기',
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
        start: {
          year: 2023,
          month: 11,
          day: 19,
        },
        repeat: [2, 4],
        end: {
          year: 2023,
          month: 11,
          day: 30,
        },
        workToDo: '도서관 가기',
        complete: [
          {
            year: 2023,
            month: 11,
            day: 19,
          },
          {
            year: 2023,
            month: 11,
            day: 21,
          },
        ],
      },
    ],
    month: [
      {
        id: 1003,
        start: {
          year: 2023,
          month: 11,
          day: 1,
        },
        repeat: {
          day: 1,
        },
        end: null,
        workToDo: '이번 달 계획 세우기',
        complete: [],
      },
    ],
    year: [
      {
        id: 1004,
        start: {
          year: 2023,
          month: 11,
          day: 24,
        },
        repeat: {
          month: 11,
          day: 24,
        },
        end: null,
        workToDo: '크리스마스 케익 준비하기',
        complete: [],
      },
    ],
  },
};
