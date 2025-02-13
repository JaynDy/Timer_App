import React from "react";
import styles from "./Buttons.module.css";
import { Icon } from "../Icon/Icon";

export const Buttons = ({ onClick, isPressedTimerBtn }) => {
  return (
    <div className={styles.btnContainer}>
      {!isPressedTimerBtn ? (
        <Icon
          name="timer"
          className={styles.btn}
          onClick={() => onClick("start")}
        />
      ) : (
        <Icon
          name="pause1"
          className={styles.btn}
          onClick={() => onClick("pause")}
        />
      )}

      <Icon name="add" className={styles.btn} onClick={() => onClick("add")} />
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
  );
};
