import React, { useEffect, useState } from "react";
import styles from "./TimerList.module.css";
import { Icon } from "../Icon/Icon";
import { useSpring, animated } from "@react-spring/web";

export const TimerList = ({
  timers,
  onClose,
  onClick,
  onChange,
  selectedTimerId,
  clickedTimerId,
  isAdditionListVisible,
  setIsAdditionListVisible,
  setIsListVisible,
}) => {
  const [isOpenSettings, setIsOpenSettings] = useState(false);

  useEffect(() => {
    setIsOpenSettings(true);
  }, []);

  const animationStyles = useSpring({
    opacity: isOpenSettings ? 1 : 0,
    // visibility: isOpenSettings ? "visible" : "hidden",
    // transform: isOpenSettings ? "scaleY(1)" : "scaleY(0)",
    transformOrigin: "top",
    pointerEvents: isOpenSettings ? "auto" : "none",
    config: { mass: 1, tension: 150, friction: 20 },
    boxShadow: isOpenSettings
      ? "0px 10px 20px rgba(0, 0, 0, 0.3)"
      : "0px -10px 20px rgba(0, 0, 0, 0.5) inset",
    onRest: () => {
      if (!isOpenSettings) onClose();
    },
  });

  const handleClose = () => {
    if (isAdditionListVisible) {
      setIsAdditionListVisible(false);
      setIsListVisible(true);
    } else {
      setIsOpenSettings(false);
    }
  };

  return (
    <animated.div className={styles.timerList} style={animationStyles}>
      <div className={styles.listTitle}>
        <Icon name="cross" className={styles.crossImg} onClick={handleClose} />
        <h3 className={styles.labelList}>
          {isAdditionListVisible ? "Addition Timer list" : "Timer list"}
        </h3>
      </div>

      <ul>
        {timers
          .filter(
            (timer) =>
              (!isAdditionListVisible && timer.mainTimerId === null) ||
              (isAdditionListVisible &&
                !timer.isMain &&
                timer.mainTimerId !== null)
          )
          .map((timer) => (
            <li key={timer.id} className={styles.timerItem}>
              {!isAdditionListVisible && timer.mainTimerId === null && (
                <div className={styles.itemContainer}>
                  {timer.isMain ? (
                    <Icon
                      name="clip"
                      className={styles.btn}
                      onClick={() => onClick("additionList", timer.id)}
                    />
                  ) : (
                    <div className={styles.emptyContainer}></div>
                  )}

                  <span className={styles.timerValue}>
                    {timer.remainingTime}
                  </span>
                  <div className={styles.btnContainer}>
                    {timers.length > 1 && selectedTimerId !== null && (
                      <input
                        type="checkbox"
                        className={styles.checkbox}
                        checked={timer.id === selectedTimerId}
                        onChange={() => onChange(timer.id)}
                      />
                    )}

                    {(timer.id !== selectedTimerId ||
                      (timer.id === selectedTimerId &&
                        timers.filter((t) => !t.mainTimerId).length === 1)) && (
                      <Icon
                        name="trash"
                        className={styles.trashBtn}
                        onClick={() => onClick("delete", timer.id)}
                      />
                    )}
                  </div>
                </div>
              )}
              {isAdditionListVisible &&
                !timer.isMain &&
                timer.mainTimerId === clickedTimerId && (
                  <div className={styles.itemContainer}>
                    <span className={styles.timerValue}>
                      {timer.remainingTime}
                    </span>
                    <div className={styles.btnContainer}>
                      {timer.id !== selectedTimerId && (
                        <>
                          <Icon
                            name="editPencil"
                            className={styles.btn}
                            onClick={() => {
                              onClick("edit", timer.id),
                                console.log("timerID", timer.id);
                            }}
                          />
                          <Icon
                            name="trash"
                            className={styles.trashBtn}
                            onClick={() => onClick("delete", timer.id)}
                          />
                        </>
                      )}
                    </div>
                  </div>
                )}
            </li>
          ))}
      </ul>
    </animated.div>
  );
};
