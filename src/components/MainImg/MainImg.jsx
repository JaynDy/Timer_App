import React from "react";
import styles from "./MainImg.module.css";
import { Icon } from "../Icon/Icon";
import { Buttons } from "../Buttons/Buttons";

export const MainImg = ({
  currentTimer,
  onClick,
  isFormVisible,
  timerState,
  isSoundEnabled,
  onToggleSound,
}) => {
  return (
    <div className={styles.mainImgContainer}>
      <Icon name="strawberry" />
      <Icon name="screen" className={styles.screenImg} />

      {!isFormVisible && (
        <>
          <Icon
            name="restart"
            className={styles.restartImg}
            onClick={() => onClick("restart")}
          />
          <div className={styles.volumeContainer}>
            <Icon
              name="volume"
              className={styles.volumeImg}
              onClick={onToggleSound}
            />
            {!isSoundEnabled && <div className={styles.mutedLine}></div>}
          </div>
          <div>
            <h3 className={styles.labelTime}>{currentTimer.remainingTime}</h3>
            <Buttons
              onClick={onClick}
              timerState={timerState}
              currentTimer={currentTimer}
            />
          </div>
        </>
      )}
    </div>
  );
};
