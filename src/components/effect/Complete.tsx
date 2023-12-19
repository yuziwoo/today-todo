import { Player } from '@lottiefiles/react-lottie-player';

const Complete = () => {
  return (
    <div>
      <Player
        autoplay
        loop
        src="https://yuziwoo.github.io/today-todo/lottie/complete.json"
        style={{ height: '300px', width: '300px' }}
      >
      </Player>
    </div>
  )
}

export default Complete;