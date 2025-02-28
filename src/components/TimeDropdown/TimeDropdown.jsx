import React, { useEffect, useRef, useState } from "react";
import styles from "./TimeDropdown.module.css";

export const TimeDropdown = ({ type, onSelect, selectedValue, top, left }) => {
  const baseValues =
    type === "hours"
      ? Array.from({ length: 24 }, (_, i) => String(i).padStart(2, "0"))
      : Array.from({ length: 60 }, (_, i) => String(i).padStart(2, "0"));

  const values = [...baseValues, ...baseValues, ...baseValues];

  const scrollRef = useRef(null);
  const itemHeight = 32;
  const middleIndex = baseValues;

  useEffect(() => {
    if (scrollRef.current) {
      const index = values.indexOf(selectedValue, middleIndex);
      scrollRef.current.scrollTop = index * itemHeight;
    }
  }, [selectedValue]);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    const handleWheel = (e) => {
      e.preventDefault();

      let currentScroll = scrollContainer.scrollTop;
      const direction = e.deltaY > 0 ? 1 : -1;
      const newScrollTop = currentScroll + direction * itemHeight;

      scrollContainer.scrollTo({
        top: newScrollTop,
        behavior: "smooth",
      });
    };

    scrollContainer.addEventListener("wheel", handleWheel, { passive: false });
  }, []);

  return (
    <div className={styles.dropdown} style={{ top, left }}>
      <div className={styles.scrollContainer} ref={scrollRef}>
        {values.map((value, index) => (
          <div
            key={index}
            className={`${styles.option} ${
              value === selectedValue ? styles.active : ""
            }`}
            onClick={() => onSelect(type, value)}
          >
            {value}
          </div>
        ))}
      </div>
    </div>
  );
};
