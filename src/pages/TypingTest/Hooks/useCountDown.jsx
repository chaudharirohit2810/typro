import { useState, useEffect } from "react";

const useCountDown = (countDownTime) => {
  const [remainingTime, setRemainingTime] = useState(countDownTime);
  const [countDownStarted, setCountDownStarted] = useState(false);

  const resetCountDown = () => {
    setRemainingTime(countDownTime);
    setCountDownStarted(false);
  };

  useEffect(() => {
    if (!countDownStarted) return;

    if (remainingTime === 0) setCountDownStarted(false);

    let timer = setTimeout(() => setRemainingTime(remainingTime - 1), 1000);
    return () => {
      clearInterval(timer);
    };
  }, [remainingTime, countDownStarted]);

  return [
    remainingTime,
    countDownStarted,
    setCountDownStarted,
    resetCountDown,
    setRemainingTime,
  ];
};

export default useCountDown;
