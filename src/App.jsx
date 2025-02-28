import React from "react";
import "./App.css";
import { useRef, useState, useEffect } from "react";
import { convertToSeconds, formatTime } from "./utilities";
import { TimerForm } from "./components/TimerForm/TimerForm";
import { MainImg } from "./components/MainImg/MainImg";
import { Bee } from "./components/Bee";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentTimer } from "./reducer/timerSlice";
import { v4 as uuidv4 } from "uuid";

export default function App() {
  const [isStartingForm, setIsStartingForm] = useState(true);
  const [isFormVisible, setIsFormVisible] = useState(true);
  const [timerState, setTimerState] = useState("idle"); // idle (show btn START), running (show btn PAUSE), paused (show btn PLAY )
  const [isFinishedCountDown, setIsFinishedCountDown] = useState(false);
  const [isClickBtnAdd, setIsClickBtnAdd] = useState(true);
  const timeRef = useRef(null);

  const dispatch = useDispatch();
  const currentTimer = useSelector((state) => state.timer.currentTimer);
  console.log("currentTimer", currentTimer);

  console.log("window.electronAPI:", window.electronAPI);

  const handleAddTimer = (newTimer) => {
    window.electronAPI
      .saveTimers(newTimer)
      .then(() => console.log("IPC-a message sent!"));
    console.log("newTimer", newTimer);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submit time:", currentTimer.initialTime);
  };

  const startCountDown = () => {
    if (timeRef.current) return;

    let seconds = isFinishedCountDown
      ? Math.floor(convertToSeconds(currentTimer.initialTime))
      : Math.floor(convertToSeconds(currentTimer.remainingTime));

    timeRef.current = setInterval(() => {
      if (seconds <= 0) {
        clearInterval(timeRef.current);
        timeRef.current = null;
        dispatch(setCurrentTimer({ remainingTime: "00 : 00 : 00" }));
        return;
      }
      seconds -= 1;
      dispatch(
        setCurrentTimer({ ...currentTimer, remainingTime: formatTime(seconds) })
      );
    }, 1000);

    if (isFinishedCountDown) {
      setIsFinishedCountDown(false);
    }
  };

  useEffect(() => {
    if (currentTimer.remainingTime === "00 : 00 : 00") {
      setTimerState("idle");
    }
  }, [currentTimer.remainingTime]);

  const handlePauseTimer = () => {
    clearInterval(timeRef.current);
    timeRef.current = null;
  };

  const handleClickBtn = (iconName) => {
    console.log("click:", iconName);

    switch (iconName) {
      case "alarm":
        if (currentTimer.remainingTime === "00 : 00 : 00") {
          setIsFinishedCountDown(true);

          dispatch(
            setCurrentTimer({
              ...currentTimer,
              remainingTime: currentTimer.initialTime,
            })
          );
        }
        break;

      case "start":
      case "play":
        if (currentTimer.remainingTime !== "00 : 00 : 00") {
          startCountDown();
          setTimerState("running");
        }
        break;

      case "pause":
        handlePauseTimer();
        setTimerState("paused");
        break;

      case "edit":
        setIsFormVisible(true);
        setIsClickBtnAdd(false);
        handlePauseTimer();
        break;

      case "add":
        setIsFormVisible(true);
        setIsClickBtnAdd(true);
        break;
    }
  };

  const handleCloseForm = (e) => {
    e.preventDefault();
    console.log("click button cross");
    setIsFormVisible(false);
  };

  const handleTimeChange = (e) => {
    const updatedValue = e.target.value;

    const isValidFormat = /^\d{0,2} : \d{0,2} : \d{0,2}$/.test(updatedValue);
    if (!isValidFormat) return;

    dispatch(
      setCurrentTimer({
        remainingTime: updatedValue,
        initialTime: updatedValue,
        isChecked: false,
      })
    );
  };

  const handleClickSaveBtn = () => {
    const newTimer = {
      id: uuidv4(),
      remainingTime: currentTimer.initialTime,
      initialTime: currentTimer.initialTime,
      isChecked: true,
    };

    dispatch(setCurrentTimer(newTimer));

    setIsFormVisible(false);
    setIsStartingForm(false);

    console.log("Отправка в Electron:", newTimer);
    handleAddTimer(newTimer);
  };

  return (
    <>
      <div className="container">
        {!isFormVisible && (
          <MainImg
            time={
              isFinishedCountDown
                ? currentTimer.initialTime
                : currentTimer.remainingTime
            }
            onClick={handleClickBtn}
            isFormVisible={isFormVisible}
            timerState={timerState}
            isStartingForm={isStartingForm}
          />
        )}

        {isFormVisible && (
          <TimerForm
            title={isClickBtnAdd ? "Add new timer" : "Edit the time"}
            isFormVisible={isFormVisible}
            onClose={handleCloseForm}
            onChange={handleTimeChange}
            time={currentTimer.remainingTime}
            onClick={() => handleClickSaveBtn(currentTimer.initialTime)}
            isStartingForm={isStartingForm}
            onSubmit={handleSubmit}
          />
        )}

        <Bee
          time={currentTimer.remainingTime}
          onClick={handleClickBtn}
          isStartingForm={isStartingForm}
          isFinishedCountDown={isFinishedCountDown}
        />
      </div>
    </>
  );
}
