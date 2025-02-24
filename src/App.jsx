import React from "react";
import "./App.css";
import { useRef, useState, useEffect } from "react";
import { convertToSeconds, formatTime } from "./utilities";
import { TimerForm } from "./components/TimerForm/TimerForm";
import { MainImg } from "./components/MainImg/MainImg";
import { Bee } from "./components/Bee";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentTimer } from "./reducer/timerSlice";
// import { saveTimers, getTimers } from "../electron/store";

export default function App() {
  const [isStartingForm, setIsStartingForm] = useState(true);
  const [isFormVisible, setIsFormVisible] = useState(true);
  const [isPressedTimerBtn, setIsPressedTimerBtn] = useState(false);
  const [isTimerUp, setIsTimerUp] = useState(false);
  const [isClickBtnAdd, setIsClickBtnAdd] = useState(true);
  const timeRef = useRef(null);
  // const [timers, setTimers] = useState(getTimers());

  const dispatch = useDispatch();
  const currentTimer = useSelector((state) => state.timer.currentTimer);
  console.log("currentTimer", currentTimer);

  useEffect(() => {
    if (window.electronAPI) {
      window.electronAPI.getTimers().then((timers) => {
        console.log("Таймеры получены:", timers);
      });
    } else {
      console.error("❌ window.electronAPI не найден!");
    }
  }, []);

  const handleAddNewTimer = (newTimer) => {
    if (window.electronAPI) {
      window.electronAPI.getTimers().then((timers) => {
        console.log("Таймеры получены:", timers);

        const updatedTimers = [...timers, newTimer];

        window.electronAPI.saveTimers(updatedTimers).then(() => {
          window.electron.getTimers().then((newTimers) => {
            dispatch(setCurrentTimer(newTimers[newTimers.length - 1]));
          });
        });
      });
    } else {
      console.error("❌ window.electronAPI не найден!");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTimer = {
      initialTime: currentTimer.initialTime,
      remainingTime: currentTimer.remainingTime,
    };
    handleAddNewTimer(newTimer);
    console.log("✅ Submit с time:", currentTimer.initialTime);
  };

  const startCountDown = () => {
    if (timeRef.current) return;

    let seconds = Math.floor(convertToSeconds(currentTimer.remainingTime));

    timeRef.current = setInterval(() => {
      if (seconds <= 0) {
        clearInterval(timeRef.current);
        timeRef.current = null;
        dispatch(setCurrentTimer({ remainingTime: "00 : 00 : 00" }));
        setIsPressedTimerBtn(false);
        return;
      }
      seconds -= 1;
      dispatch(
        setCurrentTimer({ ...currentTimer, remainingTime: formatTime(seconds) })
      );
    }, 1000);
  };

  const handlePauseTimer = () => {
    clearInterval(timeRef.current);
    timeRef.current = null;
  };

  const handleClickBtn = (iconName) => {
    console.log("click:", iconName);
    if (iconName === "start") {
      startCountDown();
      setIsPressedTimerBtn(true);
    }
    if (iconName === "pause") {
      handlePauseTimer();
      setIsPressedTimerBtn(false);
    }
    if (iconName === "edit") {
      setIsFormVisible(true);
      setIsClickBtnAdd(false);
      handlePauseTimer();
    }
    if (iconName === "add") {
      setIsFormVisible(true);
      setIsClickBtnAdd(true);
    }
    if (iconName === "alarm" && currentTimer.remainingTime === "00 : 00 : 00") {
      setIsTimerUp(true);
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
      })
    );
  };

  const handleClickSaveBtn = (time) => {
    dispatch(setCurrentTimer({ remainingTime: time, initialTime: time }));
    setIsFormVisible(false);
    setIsStartingForm(false);
    handleAddNewTimer();
  };

  return (
    <>
      <div className="container">
        {!isFormVisible && (
          <MainImg
            time={currentTimer.remainingTime}
            onClick={handleClickBtn}
            isFormVisible={isFormVisible}
            isPressedTimerBtn={isPressedTimerBtn}
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
          isTimerUp={isTimerUp}
          isStartingForm={isStartingForm}
        />
      </div>
    </>
  );
}
