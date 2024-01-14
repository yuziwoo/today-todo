import { convertDateToNumber } from 'src/utills/converter';

const todayDate = new Date();
const today = convertDateToNumber({
  year: todayDate.getFullYear(),
  month: todayDate.getMonth(),
  day: todayDate.getDate(),
});

export const compareIsPast = (date: number | null) => {
  if (date === null) return false;
  return date < today;
};
