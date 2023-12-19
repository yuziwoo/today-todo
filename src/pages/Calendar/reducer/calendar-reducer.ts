import { CalendarDateProps } from './../../../types/calendar';
import { CALENDAR_API } from '../../../constants/API';

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

const isValuableDate = ({ year, month, day }: CalendarDateProps): CalendarDateProps => {
  const valuableState = { year, month, day };
  if (year < CALENDAR_API.minYear) {
    valuableState.year = CALENDAR_API.minYear;
  }
  if (year > CALENDAR_API.maxYear) {
    valuableState.year = CALENDAR_API.maxYear;
  }
  if (day > CALENDAR_API.getMaxDay(valuableState.year, valuableState.month)) {
    valuableState.day = CALENDAR_API.getMaxDay(valuableState.year, valuableState.month);
  }
  return valuableState;
};

const calendarReducer = (targetDate: CalendarDateProps, action: Action): CalendarDateProps => {
  switch (action.type) {
    case 'change': {
      const { year, month, day } = action;

      const date = isValuableDate({ year, month, day });
      return date;
    }
    case 'changeToNextMonth': {
      const year = targetDate.month === 11 ? targetDate.year + 1 : targetDate.year;
      const month = targetDate.month === 11 ? 0 : targetDate.month + 1;
      const day = 1;

      const date = isValuableDate({ year, month, day });
      return date;
    }
    case 'changeToLastMonth': {
      const year = targetDate.month === 0 ? targetDate.year - 1 : targetDate.year;
      const month = targetDate.month === 0 ? 11 : targetDate.month - 1;
      const day = 1;

      const date = isValuableDate({ year, month, day });
      return date;
    }
  }
};

export default calendarReducer;
