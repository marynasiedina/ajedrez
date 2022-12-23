import { FC, useRef, useState, useEffect, SetStateAction, Dispatch } from 'react';
import { Colors } from '../models/Colors';
import { Player } from '../models/Player';

interface TimerProps {
  currentPlayer: Player | null;
  restart: () => void;
  loser: string | null;
  setLoser: Dispatch<SetStateAction<string | null>>;
}

const Timer: FC<TimerProps> = ({ restart, currentPlayer, setLoser, loser }) => {
  const [blackTime, setBlackTime] = useState<number>(300);
  const [whiteTime, setWhiteTime] = useState<number>(300);
  const timer = useRef<null | ReturnType<typeof setInterval>>(null)


  useEffect(() => {
    startTimer(loser)
  }, [currentPlayer, loser])

  useEffect(() => {
    if (blackTime === 0) {
      setLoser(Colors.BLACK)
    }
    if (whiteTime === 0) {
      setLoser(Colors.WHITE)
    }
  })

  const startTimer = (loser: string | null) => {
    if (timer.current) {
      clearInterval(timer.current)
    }

    const callback = currentPlayer?.color === Colors.WHITE
      ? decrementWhiteTimer
      : decrementBlackTimer


    !loser && (timer.current = setInterval(callback, 1000))
  }

  const decrementBlackTimer = () => {
    setBlackTime(prev => prev - 1)
  }

  const decrementWhiteTimer = () => {
    setWhiteTime(prev => prev - 1)
  }

  const handleRestart = () => {
    setBlackTime(300)
    setWhiteTime(300)
    restart()
  }
  return (
    <div>
      <div>
        <button onClick={handleRestart}>Reiniciar juego</button>
      </div>
      <h2>Negros - {blackTime}</h2>
      <h2>Blancos - {whiteTime}</h2>
    </div>
  );
}

export default Timer;
