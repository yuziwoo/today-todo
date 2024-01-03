import { Player } from '@lottiefiles/react-lottie-player';
import { useEffect, useRef, useState } from 'react';
interface CompleteEffectProps {
  trigger: boolean;
  setTriggerOff: () => void;
}

const CompleteEffect = ({ trigger, setTriggerOff }: CompleteEffectProps) => {
  const [playState, setPlayState] = useState(false);
  const player = useRef<Player>(null);

  useEffect(() => {
    if (trigger === true) {
      setPlayState(true);

      setTimeout(() => {
        setTriggerOff();
        setPlayState(false);
      }, 1800);
    }

    // eslint-disable-next-line
  }, [trigger]);

  useEffect(() => {
    if (playState && player.current) {
      player.current.play();
      return;
    }

    if (player.current) {
      player.current.stop();
    }
  }, [playState]);

  return (
    <div>
      <Player
        ref={player}
        loop
        src="https://yuziwoo.github.io/today-todo/public/lottie/calendarComplete.json"
        style={{ height: '300px', width: '300px' }}
      ></Player>
    </div>
  );
};

export default CompleteEffect;
