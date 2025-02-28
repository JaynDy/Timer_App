import React, { useRef, useState } from "react";
import styles from "./TimerForm.module.css";
import { Icon } from "../Icon/Icon";
import { MainImg } from "../MainImg/MainImg";
import { TimeDropdown } from "../TimeDropdown";

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
  const [activDropdown, setActiveDropdown] = useState(null);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });
  const spanRefs = useRef({});

  const handleOpenDropdown = (type, event) => {
    setActiveDropdown((prev) => (prev === type ? null : type));

    if (event && event.target) {
      const rect = event.target.getBoundingClientRect();

      setDropdownPosition({
        top: rect.bottom - 25,
        left: rect.left + rect.width / 2 - 13,
      });
    }
  };

  const handleSelect = (type, value) => {
    const timeParts = time.split(" : ");
    if (type === "hours") timeParts[0] = value;
    if (type === "minutes") timeParts[1] = value;
    if (type === "secondes") timeParts[2] = value;

    onChange({ target: { value: timeParts.join(" : ") } });
    setActiveDropdown(null);
  };

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

        {/* {onChange && (
          <input id="choosedPeriod" value={time} onChange={onChange} />
        )} */}

        <div className={styles.timerInput}>
          {["hours", "minutes", "secondes"].map((type, index, arr) => (
            <div key={type} className={styles.timeSegment}>
              <span
                ref={(el) => (spanRefs.current[type] = el)}
                onClick={(e) => handleOpenDropdown(type, e)}
              >
                {time.split(" : ")[index]}
              </span>
              {activDropdown === type && (
                <TimeDropdown
                  type={type}
                  onSelect={handleSelect}
                  selectedValue={time.split(" : ")[index]}
                  top={dropdownPosition.top}
                  left={dropdownPosition.left}
                />
              )}
              {index < arr.length - 1 && (
                <span className={styles.separator}>&nbsp;:&nbsp;</span>
              )}
            </div>
          ))}
        </div>

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
