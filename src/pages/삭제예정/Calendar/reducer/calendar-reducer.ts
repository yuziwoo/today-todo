import { CalendarDateProps } from '../../../../types/삭제예정/calendar';
import { CALENDAR_API } from '../../../../constants/API';
import { getMaxDay } from '../../../../utills/삭제예정/calendar';

type calendarReducerAction =
  | {
      type: 'change';
      year: number;
      month: number;
      day: number;
    }
  | {
      type: 'changeToNextMonth' | 'changeToLastMonth';
    };

const isValuableDate = ({ year, month, day }: CalendarDateProps): CalendarDateProps => {
  const valuableState = { year, month, day };
  if (year < CALENDAR_API.minYear) {
    valuableState.year = CALENDAR_API.minYear;
  }
  if (year > CALENDAR_API.maxYear) {
    valuableState.year = CALENDAR_API.maxYear;
  }
  if (day > getMaxDay({year: valuableState.year, month: valuableState.month})) {
    valuableState.day = getMaxDay({year: valuableState.year, month: valuableState.month});
  }
  return valuableState;
};

const calendarReducer = (
  targetDate: CalendarDateProps,
  action: calendarReducerAction
): CalendarDateProps => {
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
