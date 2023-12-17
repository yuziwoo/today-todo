type Action =
  | {
      type: 'change';
      year: number;
      month: number;
      day: number;
    }
  | {
      type: 'changeToNextMonth';
    }
  | {
      type: 'changeToLastMonth';
    };

export type CalendarDateState = {
  year: number;
  month: number;
  day: number;
};

const calendarReducer = (targetDate: CalendarDateState, action: Action): CalendarDateState => {
  switch (action.type) {
    case 'change': {
      const { year, month, day } = action;
      return { year, month, day };
    }
    case 'changeToNextMonth': {
      const year = targetDate.month === 11 ? targetDate.year + 1 : targetDate.year;
      const month = targetDate.month === 11 ? 0 : targetDate.month + 1;
      const day = 1;

      return { year, month, day };
    }
    case 'changeToLastMonth': {
      const year = targetDate.month === 0 ? targetDate.year - 1 : targetDate.year;
      const month = targetDate.month === 0 ? 11 : targetDate.month - 1;
      const day = 1;

      return { year, month, day };
    }
  }
};

export default calendarReducer;
