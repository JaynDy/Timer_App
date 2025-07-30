import React, { useEffect, useRef, useState } from "react";
import styles from "./AdditionTimers.module.css";
import { Icon } from "../Icon/Icon";

export const AdditionTimers = ({ timers, selectedTimerId }) => {
  return (
    <div className={styles.additionTimersContainer}>
      <Icon
        name="lightBtn"
        className={styles.btn}
        onClick={() => onClick("addTimerB9lock")}
      ></Icon>
    </div>
  );
};
