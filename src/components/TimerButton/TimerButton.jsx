import React, { useEffect, useState } from "react";
import styles from "./TimerButton.module.css";
import { Icon } from "../Icon/Icon";
import { convertToSeconds } from "../../utilities";

export const TimerButton = ({ timers, timerState, currentTimer }) => {
  const [timerProgress, setTimerProgress] = useState(0);
  const [isButtonMoving, setIsButtonMoving] = useState(false);

  const selectedTimer = timers.find((timer) => timer.isSelected);
  // const isAdditionalTimerRunning =
  //   currentTimer.mainTimerId !== null && timerState === "running";

  useEffect(() => {
    if (!selectedTimer || selectedTimer.remainingTime === "00 : 00 : 00")
      return;

    if (timerState === "running") {
      // if (isAdditionalTimerRunning) {
      setIsButtonMoving(true);

      setTimeout(() => {
        setIsButtonMoving(false);
      }, 500);

      const totalSeconds = convertToSeconds(selectedTimer.initialTime);
      let remainingSeconds = convertToSeconds(selectedTimer.remainingTime);

      const interval = setInterval(() => {
        const progress = 1 - remainingSeconds / totalSeconds;
        setTimerProgress(progress);

        if (progress >= 1) {
          clearInterval(interval);
          // setIsButtonMoving(false);
        }
      }, 1000);

      return () => clearInterval(interval);
    } else {
      setIsButtonMoving(false);
    }
  }, [selectedTimer, timerState]);

  return (
    <div
      className={`${styles.timerButtonContainer} ${
        isButtonMoving ? styles.running : ""
      }`}
      style={{
        transform: `scale(${1 - timerProgress})`,
      }}
    >
      <Icon name="yellowBtn" className={styles.btn}></Icon>
    </div>
  );
};
