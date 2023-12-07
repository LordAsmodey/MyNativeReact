import { useEffect, useState } from 'react';
import BackgroundTimer from 'react-native-background-timer';

export interface CountdownRendererProps {
  timer: string;
  isCompleted: boolean;
  expiresIn: number;
}

const calculateExpireTime = (expireTime: number) => Math.max(Math.floor((expireTime - Date.now()) / 1000), 0);

const SecondsCountdown = ({
  expireTime,
  renderer,
}: {
  expireTime: number;
  renderer: (renderArgs: CountdownRendererProps) => JSX.Element;
}): JSX.Element => {
  const [expiresIn, setExpiresIn] = useState<number>(calculateExpireTime(expireTime));

  useEffect(() => {
    if (expiresIn === 0) {
      setExpiresIn(calculateExpireTime(expireTime));
    }
    const intervalId = BackgroundTimer.setInterval(() => {
      setExpiresIn((prevVal) => {
        const newVal = prevVal - 1;
        if (newVal <= 0) {
          BackgroundTimer.clearInterval(intervalId);
          return 0;
        }
        return newVal;
      });
    }, 1000);

    return () => {
      BackgroundTimer.clearInterval(intervalId);
    };
  }, [expireTime, expiresIn]);

  const seconds = expiresIn < 10 ? `0${expiresIn}` : expiresIn;

  return renderer({ timer: `00:${seconds}`, isCompleted: expiresIn <= 0, expiresIn });
};

export default SecondsCountdown;
