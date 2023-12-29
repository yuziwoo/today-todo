export const emptyThrottle = (func: () => void, delay: number) => {
  let timeoutId: number;

  return () => {
    window.clearTimeout(timeoutId);

    timeoutId = window.setTimeout(() => {
      func();
    }, delay);
  };
};
