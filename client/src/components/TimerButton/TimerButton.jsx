import React, { useEffect, useRef, useState } from "react";
import styles from "./TimerButton.module.css";
import { Icon } from "../Icon/Icon";

export const TimerButton = ({ timerState, prevTimerState }) => {
  const [isButtonMoving, setIsButtonMoving] = useState(false);

  useEffect(() => {
    if (timerState === "running" && prevTimerState.current !== "paused") {
      setIsButtonMoving(true);

      setTimeout(() => {
        setIsButtonMoving(false);
      }, 300);
    }

    prevTimerState.current = timerState;
    console.log("prevTimerState", prevTimerState.current);
  }, [timerState]);

  return (
    <div
      className={`${styles.timerButtonContainer} ${
        isButtonMoving ? styles.running : ""
      }`}
    >
      <Icon name="lightBtn" className={styles.btn}></Icon>
    </div>
  );
};
