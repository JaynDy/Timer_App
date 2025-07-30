import React from "react";
import styles from "./Buttons.module.css";
import { Icon } from "../Icon/Icon";

export const Buttons = ({ onClick, timerState, currentTimer }) => {
  return (
    <>
      <div className={styles.btnContainer}>
        {timerState === "idle" && (
          <Icon
            name="timer"
            className={styles.btn}
            onClick={() => onClick("start")}
          />
        )}
        {timerState === "running" && (
          <Icon
            name="pause"
            className={styles.btn}
            onClick={() => onClick("pause")}
          />
        )}
        {timerState === "paused" && (
          <Icon
            name="play"
            className={styles.btn}
            onClick={() => onClick("play")}
          />
        )}
        {timerState === "alarmIcon" && (
          <Icon
            name="alarm"
            className={styles.btn}
            onClick={() => onClick("alarm")}
          />
        )}

        <Icon
          name="add"
          className={
            timerState !== "running" && currentTimer.mainTimerId === null
              ? styles.btn
              : `${styles.btn} ${styles.disabled}`
          }
          onClick={() => onClick("add")}
        />
        <Icon
          name="edit"
          className={
            timerState !== "running" && currentTimer.mainTimerId === null
              ? styles.btn
              : `${styles.btn} ${styles.disabled}`
          }
          onClick={() => onClick("edit")}
        />

        <Icon
          name="settings"
          className={
            styles.btn
            // timerState !== "running" && currentTimer.mainTimerId === null
            //   ? styles.btn
            //   : `${styles.btn} ${styles.disabled}`
          }
          onClick={() => onClick("settings")}
        />
      </div>

      <Icon
        name="trash"
        className={styles.trashBtn}
        onClick={() => onClick("deleteAll")}
      />
    </>
  );
};
