const error = {
  toggleRepeatTask: '반복 할 일을 체크하는 중 오류가 발생하였습니다.',
} as const;

const calendar = {
  restDayAPIError: '공휴일 API 수신 중 오류가 발생하였습니다. 공휴일이 표시되지 않습니다.',
};

const editor = {
  emptyWorks: '할 일을 입력해주세요.',
  endDayIsSmall: '반복 종료일이 너무 빠릅니다.',
  invalidCycleFormat: '잘못된 형식의 반복 일정 입니다.',
  invalidDateNumber: '잘못된 날짜 형식입니다.',
} as const;

const todo = {
  cantFindTask: '데이터를 찾을 수 없습니다.',
  todoIsFull: '일정이 너무 많습니다.',
};

const manage = {
  invalidOption: '잘못된 옵션입니다.',
};

export const MESSAGE = {
  calendar,
  error,
  editor,
  todo,
  manage,
} as const;
