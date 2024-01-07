export const vibrater = (vibrate: number) => {
  if ('vibrate' in navigator) {
    window.navigator.vibrate(vibrate);
  }
};
