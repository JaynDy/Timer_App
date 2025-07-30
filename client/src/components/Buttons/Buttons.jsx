import React from "react";
import styles from "./Buttons.module.css";
import { Icon } from "../Icon/Icon";

export const Buttons = ({ onClick, timerState }) => {
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

        <Icon
          name="add"
          className={styles.btn}
          onClick={() => onClick("add")}
        />
        <Icon
          name="edit"
          className={styles.btn}
          onClick={() => onClick("edit")}
        />
        <Icon
          name="settings"
          className={styles.btn}
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
