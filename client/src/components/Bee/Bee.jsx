import React, { useEffect } from "react";
import styles from "./Bee.module.css";
import { Icon } from "../Icon/Icon";

export const Bee = ({
  time,
  timers,
  onClick,
  isFormVisible,
  alarmSound,
  isSoundEnabled,
}) => {
  useEffect(() => {
    const alarmElement = document.querySelector(`.${styles.alarmContainer}`);

    if (!isFormVisible && time === "00 : 00 : 00" && timers.length !== 0) {
      alarmElement.classList.add(styles.alarmAnimation);

      if (isSoundEnabled) {
        alarmSound.play();
      }
    } else {
      alarmElement.classList.remove(styles.alarmAnimation);
      alarmSound.pause();
      alarmSound.currentTime = 0;
    }
  }, [time, isFormVisible, timers, isSoundEnabled]);

  const handleClick = () => {
    onClick("alarm");
    alarmSound.currentTime = 0;
  };

  return (
    <div className={styles.alarmContainer}>
      <Icon name="bee" className={styles.beeImg} onClick={handleClick}></Icon>
    </div>
  );
};
