import { Player } from '@lottiefiles/react-lottie-player';

const CalendarLoading = () => {
  return (
    <div style={{width: '100%', height: '100%'}}>
      <Player
        autoplay
        loop
        src="https://yuziwoo.github.io/today-todo/public/lottie/calendarLoading.json"
        style={{ height: '300px', width: '300px' }}
      >
      </Player>
    </div>
  )
}

export default CalendarLoading;