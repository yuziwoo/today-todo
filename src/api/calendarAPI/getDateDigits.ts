export const getYearDigits = (year: number): number[] => {
  const digitThousand = Math.floor(year / 1000);
  const digitHundred = Math.floor((year % 1000) / 100);
  const digitTen = Math.floor((year % 100) / 10);
  const digitOne = year % 10;
  return [digitThousand, digitHundred, digitTen, digitOne];
};

export const getMonthDigits = (monthIndex: number): number[] => {
  const month = monthIndex + 1;
  const digitTen = Math.floor(month / 10);
  const digitOne = month % 10;
  return [digitTen, digitOne];
};
