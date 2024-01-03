const error = {
  toggleRepeatTask: '반복 할 일을 체크하는 중 오류가 발생하였습니다.',
} as const;

const editor = {
  emptyWorks: '할 일을 입력해주세요.',
  endDayIsSmall: '반복 종료일이 너무 빠릅니다.',
  invalidCycleFormat: '잘못된 형식의 반복 일정 입니다.',
} as const;

const todo = {
  cantFindTask: '데이터를 찾을 수 없습니다.',
};

export const MESSAGE = {
  error,
  editor,
  todo,
} as const;
