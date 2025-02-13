import React from "react";
import "./App.css";
import { Icon } from "./components/Icon/Icon";
import { useRef, useState } from "react";
import { convertToSeconds, formatTime } from "./utilities";
import { TimerForm } from "./components/TimerForm/TimerForm";
import { MainImg } from "./components/MainImg/MainImg";

export default function App() {
  const [time, setTime] = useState("00 : 30 : 00");
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isPressedTimerBtn, setIsPressedTimerBtn] = useState(false);
  const timeRef = useRef(null);

  const startCountDown = () => {
    if (timeRef.current) return;

    let seconds = Math.floor(convertToSeconds(time));

    timeRef.current = setInterval(() => {
      if (seconds <= 0) {
        clearInterval(timeRef.current);
        timeRef.current = null;
        setTime("00 : 00 : 00");
        setIsPressedTimerBtn(false);
        return;
      }
      seconds -= 1;
      setTime(formatTime(seconds));
    }, 1000);
  };

  const handlePauseTimer = () => {
    clearInterval(timeRef.current);
    timeRef.current = null;
  };

  const handleClickBtn = (iconName) => {
    console.log("click:", iconName);
    if (iconName === "start" && time !== "00 : 00 : 00") {
      startCountDown();
      setIsPressedTimerBtn(true);
    }
    if (iconName === "pause") {
      handlePauseTimer();
      setIsPressedTimerBtn(false);
    }
    if (iconName === "edit") {
      setIsFormVisible(true);
      handlePauseTimer();
    }
    if (iconName === "add") {
      setIsFormVisible(true); ///  FINISHED HERE!!!
      // handlePauseTimer();
    }
  };

  const handleCloseForm = (e) => {
    e.preventDefault();
    console.log("click button cross");
    setIsFormVisible(false);
  };

  const handleEditChange = (e) => {
    const updatedValue = e.target.value;

    const isValidFormat = /^\d{0,2} : \d{0,2} : \d{0,2}$/.test(updatedValue);
    if (!isValidFormat) return;

    setTime(updatedValue);
  };

  const handleClickSaveBtn = (time) => {
    setTime(time);
    setIsFormVisible(false);
  };

  return (
    <>
      <div className="container">
        {!isFormVisible && (
          <MainImg
            time={time}
            onClick={handleClickBtn}
            isFormVisible={isFormVisible}
            isPressedTimerBtn={isPressedTimerBtn}
          />
        )}

        {isFormVisible && (
          <TimerForm
            title="Edit the time"
            isFormVisible={isFormVisible}
            onClose={handleCloseForm}
            onChange={handleEditChange}
            time={time}
            onClick={() => handleClickSaveBtn(time)}
          />
        )}

        <div className="beeContainer">
          <Icon
            name="bee"
            className="beeImg"
            onClick={() => handleClickBtn("alarm")}
          ></Icon>
        </div>
      </div>
    </>
  );
}
