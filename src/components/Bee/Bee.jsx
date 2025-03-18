import React, { useEffect } from "react";
import styles from "./Bee.module.css";
import { Icon } from "../Icon/Icon";

export const Bee = ({
  time,
  timers,
  isFinishedCountDown,
  onClick,
  isFormVisible,
}) => {
  useEffect(() => {
    const alarmElement = document.querySelector(`.${styles.alarmContainer}`);

    if (
      !isFormVisible &&
      time === "00 : 00 : 00" &&
      !isFinishedCountDown &&
      timers.length !== 0
    ) {
      alarmElement.classList.add(styles.alarmAnimation);
    } else {
      alarmElement.classList.remove(styles.alarmAnimation);
    }
  }, [time, isFinishedCountDown]);

  return (
    <div className={styles.alarmContainer}>
      <Icon
        name="bee"
        className={styles.beeImg}
        onClick={() => onClick("alarm")}
      ></Icon>
    </div>
  );
};
