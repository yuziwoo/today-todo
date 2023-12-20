import { CalendarDataType } from '../../types/calendarTypes';

const calendarData: CalendarDataType = {
  year: 0,
  month: 0,
  datas: [
    {
      day: 1,
      restDay: null,
      dateName: null,
      todo: [
        {
          id: 0,
          works: 'sample',
          complete: true,
          repeat: false,
        },
      ],
    },
  ],
};

export const initialCalendarData = [calendarData, calendarData, calendarData];
