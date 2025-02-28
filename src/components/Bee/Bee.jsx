import React, { useEffect } from "react";
import styles from "./Bee.module.css";
import { Icon } from "../Icon/Icon";

export const Bee = ({ time, isFinishedCountDown, onClick, isStartingForm }) => {
  useEffect(() => {
    const alarmElement = document.querySelector(`.${styles.alarmContainer}`);

    if (!isStartingForm && time === "00 : 00 : 00" && !isFinishedCountDown) {
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
