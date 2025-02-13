import React from "react";
import styles from "./MainImg.module.css";
import { Icon } from "../Icon/Icon";
import { Buttons } from "../Buttons/Buttons";

export const MainImg = ({
  time,
  onClick,
  isFormVisible,
  isPressedTimerBtn,
}) => {
  return (
    <div className={styles.mainImgContainer}>
      <Icon name="strawberry" />
      <Icon name="screen" className={styles.screenImg} />
      {!isFormVisible && (
        <div>
          <h3>{time}</h3>
          <Buttons
            onClick={onClick}
            isFormVisible={isFormVisible}
            isPressedTimerBtn={isPressedTimerBtn}
          />
        </div>
      )}
    </div>
  );
};
