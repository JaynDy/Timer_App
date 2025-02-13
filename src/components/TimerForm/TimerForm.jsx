import React from "react";
import styles from "./TimerForm.module.css";
import { Icon } from "../Icon/Icon";
import { MainImg } from "../MainImg/MainImg";

export const TimerForm = ({
  title,
  onClose,
  onChange,
  onClick,
  time,
  isFormVisible,
}) => {
  return (
    <div className={styles.formContainer}>
      <MainImg isFormVisible={isFormVisible} />

      <form action="">
        <div className={styles.formFrame}>
          <Icon name="cross" className={styles.crossImg} onClick={onClose} />
          <label htmlFor="choosedPeriod">{title}</label>
        </div>
        <input id="choosedPeriod" value={time} onChange={onChange} />
        <button
          name="save"
          type="button"
          className={styles.saveBtn}
          onClick={onClick}
        >
          Save
        </button>
      </form>
    </div>
  );
};
