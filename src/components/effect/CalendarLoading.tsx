import { Player } from '@lottiefiles/react-lottie-player';

type CalendarLoadingProps = {
  minHeight: number;
};

const calendarLoadingStyle = {
  width: '100%',
  height: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

const CalendarLoading = ({ minHeight }: CalendarLoadingProps) => {
  return (
    <div style={{ ...calendarLoadingStyle, minHeight: `${minHeight}px` }}>
      <Player
        autoplay
        loop
        src="https://yuziwoo.github.io/today-todo/public/lottie/calendarLoading.json"
        style={{ height: '250px', width: '250px' }}
      ></Player>
    </div>
  );
};

export default CalendarLoading;
