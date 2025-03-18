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
  isAdditionListVisible,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(true);
  }, []);

  const animationStyles = useSpring({
    opacity: isOpen ? 1 : 0,
    // visibility: isOpen ? "visible" : "hidden",
    // transform: isOpen ? "scaleY(1)" : "scaleY(0)",
    transformOrigin: "top",
    pointerEvents: isOpen ? "auto" : "none",
    config: { mass: 1, tension: 150, friction: 20 },
    boxShadow: isOpen
      ? "0px 10px 20px rgba(0, 0, 0, 0.3)"
      : "0px -10px 20px rgba(0, 0, 0, 0.5) inset",
    onRest: () => {
      if (!isOpen) onClose();
    },
  });

  const handleClose = () => {
    setIsOpen(false);
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

                    {(timer.id !== selectedTimerId || timers.length === 1) && (
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
                timer.mainTimerId === selectedTimerId && (
                  <div className={styles.itemContainer}>
                    <span className={styles.timerValue}>
                      {timer.remainingTime}
                    </span>
                    <div className={styles.btnContainer}>
                      {(timer.id !== selectedTimerId ||
                        timers.length === 1) && (
                        <>
                          <Icon
                            name="editPencil"
                            className={styles.btn}
                            onClick={() => onClick("edit")}
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
