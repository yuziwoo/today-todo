const error = {
  toggleRepeatTask: '반복 할 일을 체크하는 중 오류가 발생하였습니다.',
} as const;

const editor = {
  emptyWorks: '할 일을 입력해주세요.',
} as const;

export const MESSAGE = {
  error,
  editor,
} as const;
