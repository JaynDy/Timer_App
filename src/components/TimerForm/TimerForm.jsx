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
  isStartingForm,
  onSubmit,
}) => {
  return (
    <div className={styles.formContainer}>
      <MainImg isFormVisible={isFormVisible} isStartingForm={isStartingForm} />

      <form onSubmit={onSubmit}>
        <div className={styles.formFrame}>
          {!isStartingForm && (
            <Icon name="cross" className={styles.crossImg} onClick={onClose} />
          )}
          {isStartingForm && <div className={styles.emptyContainer}></div>}
          <label htmlFor="choosedPeriod">{title}</label>
        </div>
        <input
          id="choosedPeriod"
          value={time}
          onChange={onChange}
          // placeholder="00 : 00 : 00"
        />
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
