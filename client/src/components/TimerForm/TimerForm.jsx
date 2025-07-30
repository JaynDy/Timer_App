import React, { useEffect, useRef, useState } from "react";
import styles from "./TimerForm.module.css";
import { Icon } from "../Icon/Icon";
import { MainImg } from "../MainImg/MainImg";
import { TimeDropdown } from "../TimeDropdown";

export const TimerForm = ({
  title,
  onClose,
  onChange,
  time,
  isFormVisible,
  isStartingForm,
  onSubmit,
  timers,
  isClickAdditionalTimerBtn,
  currentTimer,
}) => {
  const [activDropdown, setActiveDropdown] = useState(null);
  const [activManualInput, setActiveManualInput] = useState(null);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });
  const spanRefs = useRef({});
  const inputRef = useRef(null);

  useEffect(() => {
    if (activManualInput && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.setSelectionRange(
        inputRef.current.value.length,
        inputRef.current.value.length
      );
    }
  }, [activManualInput]);

  const handleOpenDropdown = (type, event) => {
    setActiveDropdown((prev) => (prev === type ? null : type));

    if (event && event.target) {
      const rect = event.target.getBoundingClientRect();

      setDropdownPosition({
        top: rect.bottom - 24,
        left: rect.left + rect.width / 2 - 11,
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

  const handleManualInput = (type, e) => {
    let value = e.target.value.replace(/\D/g, "");

    if (value.length > 2) value = value.slice(0, 2);

    if (type === "hours" && Number(value) > 23) value = "23";
    if ((type === "minutes" || type === "secondes") && Number(value) > 59)
      value = "59";

    setActiveManualInput({ type, value });
  };

  const handleBlure = (type) => {
    if (!activManualInput) return;

    let value = activManualInput.value || "00";
    if (value.length === 1) value = "0" + value;

    handleSelect(type, value);
    setActiveManualInput(null);
  };

  const handleKeyDown = (type, e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleBlure(type);
    }
  };

  return (
    <div className={styles.formContainer}>
      <MainImg isFormVisible={isFormVisible} isStartingForm={isStartingForm} />

      <form onSubmit={onSubmit}>
        <div className={styles.formFrame}>
          {isFormVisible && timers.length !== 0 && (
            <Icon name="cross" className={styles.crossImg} onClick={onClose} />
          )}
          {isFormVisible && timers.length === 0 && (
            <div className={styles.emptyContainer}></div>
          )}
          <label htmlFor="choosedPeriod">{title}</label>
        </div>

        <div
          className={styles.timerInput}
          onMouseDown={(e) => {
            if (!e.target.closest("input")) {
              handleBlure(activManualInput?.type);
            }
          }}
        >
          {["hours", "minutes", "secondes"].map((type, index, arr) => (
            <div
              key={type}
              className={styles.timeSegment}
              onDoubleClick={() => {
                if (activManualInput?.type) {
                  handleBlure(activManualInput.type);
                }
                setActiveManualInput({
                  type,
                  value: time.split(" : ")[index],
                });
              }}
              onKeyDown={(e) => handleKeyDown(type, e)}
              tabIndex={0}
            >
              {activManualInput?.type === type ? (
                <>
                  <input
                    ref={inputRef}
                    type="text"
                    value={activManualInput.value}
                    onChange={(e) => handleManualInput(type, e)}
                    onBlur={() => handleBlure(type)}
                    onKeyDown={(e) => handleKeyDown(type, e)}
                    className={styles.manualInput}
                  />
                  {index < arr.length - 1 && (
                    <span className={styles.separator}>&nbsp;:&nbsp;</span>
                  )}
                </>
              ) : (
                <>
                  <span
                    ref={(el) => (spanRefs.current[type] = el)}
                    onClick={(e) => handleOpenDropdown(type, e)}
                    onChange={onChange}
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
                      time={time}
                    />
                  )}
                  {index < arr.length - 1 && (
                    <span className={styles.separator}>&nbsp;:&nbsp;</span>
                  )}
                </>
              )}
            </div>
          ))}
        </div>

        <div className={styles.btnContainer}>
          <button
            name="save"
            type="submit"
            className={styles.saveBtn}
            onClick={(e) => onSubmit(e, "save")}
          >
            Save
          </button>
          {!isClickAdditionalTimerBtn && currentTimer.mainTimerId === null && (
            <button
              name="additionalTimer"
              type="button"
              className={`${styles.addTimerBtn} ${
                time !== "00 : 00 : 00" ? styles.available : ""
              }`}
              disabled={time === "00 : 00 : 00"}
              onClick={(e) => onSubmit(e, "additionalTimer")}
            >
              Add timer
            </button>
          )}
        </div>
      </form>
    </div>
  );
};
