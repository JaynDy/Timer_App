import React from "react";
import "./App.css";
import { useRef, useState, useEffect } from "react";
import { convertToSeconds, formatTime } from "./utilities";
import { TimerForm } from "./components/TimerForm/TimerForm";
import { MainImg } from "./components/MainImg/MainImg";
import { Bee } from "./components/Bee";
import { useDispatch, useSelector } from "react-redux";
import { clearCurrentTimer, setCurrentTimer } from "./reducer/timerSlice";
import { v4 as uuidv4 } from "uuid";
import {
  addTimer,
  clearTimers,
  deleteTimer,
  loadTimers,
  updateTimer,
} from "./reducer/timersSlice";
import { TimerList } from "./components/TimerList";

export default function App() {
  const [isFormVisible, setIsFormVisible] = useState(true);
  const [isListVisible, setIsListVisible] = useState(false);
  const [timerState, setTimerState] = useState("idle"); // idle (show btn START), running (show btn PAUSE), paused (show btn PLAY )
  const [isFinishedCountDown, setIsFinishedCountDown] = useState(false);
  const [isClickBtnAdd, setIsClickBtnAdd] = useState(true);
  const [selectedTimerId, setSelectedTimerId] = useState(null);

  const timeRef = useRef(null);

  const dispatch = useDispatch();
  const currentTimer = useSelector((state) => state.timer.currentTimer);
  console.log("currentTimer", currentTimer);

  const timers = useSelector((state) => state.timers);
  console.log("timers redux", timers);

  useEffect(() => {
    const preselectedTimer = timers.find((timer) => timer.isSelected);
    if (preselectedTimer) {
      setSelectedTimerId(preselectedTimer.id);
    }
    if (timers.length === 0) {
      setIsFormVisible(true);
      setIsListVisible(false);
    }
  }, [timers]);

  const handleCheckbox = (timerId) => {
    const newSelectedTimer = timerId === selectedTimerId ? null : timerId;
    setSelectedTimerId(newSelectedTimer);
    handleClickBtn("toggle", timerId, newSelectedTimer !== null);

    const selectedTimer = timers.find((timer) => timer.id === timerId);
    if (selectedTimer) {
      dispatch(setCurrentTimer({ ...selectedTimer, isSelected: true }));
      dispatch(updateTimer({ ...selectedTimer, isSelected: true }));
    }
  };

  const handleCloseList = () => {
    setIsListVisible(false);
  };

  const handleDeleteTimer = (id) => {
    dispatch(deleteTimer(id));
  };

  useEffect(() => {
    dispatch(loadTimers());
    console.log("Load");
  }, [dispatch]);

  useEffect(() => {
    window.electronAPI.getTimers().then((timers) => {
      console.log("Timers from Electron:", timers);
      if (Array.isArray(timers)) {
        const selectedTimer = timers.find((timer) => timer.isSelected === true);

        if (selectedTimer) {
          dispatch(setCurrentTimer(selectedTimer));
          setIsFormVisible(false);
        }
      }
    });
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (currentTimer.remainingTime === "00 : 00 : 00") {
      return;
    }

    const updatedTimer = {
      id: currentTimer.id || uuidv4(),
      remainingTime: currentTimer.initialTime,
      initialTime: currentTimer.initialTime,
      isSelected: true,
    };

    console.log(`App handleSubmit updatedTimer:`, updatedTimer);

    const existingIndex = timers.findIndex((t) => t.id === updatedTimer.id);

    if (existingIndex !== -1) {
      dispatch(updateTimer(updatedTimer));
    } else {
      dispatch(addTimer(updatedTimer));
    }

    dispatch(clearCurrentTimer());
    dispatch(setCurrentTimer(updatedTimer));
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
        isSelected: false,
      })
    );
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

  const handleClickBtn = (iconName, id) => {
    console.log("click:", iconName, id);

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
        setTimerState("paused");
        break;

      case "add":
        dispatch(clearCurrentTimer());
        setIsFormVisible(true);
        setIsClickBtnAdd(true);
        break;

      case "delete":
        if (id) {
          handleDeleteTimer(id);
          if (id === selectedTimerId || timers.length === 1) {
            dispatch(clearCurrentTimer());
            setSelectedTimerId(null);
            setIsFormVisible(true);
          }
        } else {
          console.log("Error: timer have not ID");
        }
        break;

      case "deleteAll":
        dispatch(clearCurrentTimer());
        handleDeleteAllTimers();
        break;

      case "settings":
        window.electronAPI.getTimers().then((timers) => {
          console.log("Timers from Electron:", timers);
          setIsListVisible(true);
        });
        break;

      case "selectedTimer":
        window.electronAPI.getTimers().then((timers) => {
          console.log("Selected Timers:", timers);
          dispatch(
            setCurrentTimer({
              ...currentTimer,
              isSelected: currentTimer.isSelected,
            })
          );
        });
        break;
    }
  };

  const handleCloseForm = (e) => {
    e.preventDefault();
    setIsFormVisible(false);
  };

  const handleDeleteAllTimers = () => {
    window.electronAPI.clearAllTimers().then(() => {
      console.log(`Timers are deleted`);
      dispatch(clearTimers());
    });
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
          />
        )}

        {isFormVisible && (
          <TimerForm
            title={isClickBtnAdd ? "Add new timer" : "Edit the time"}
            isFormVisible={isFormVisible}
            onClose={handleCloseForm}
            onChange={handleTimeChange}
            time={currentTimer.remainingTime}
            onSubmit={handleSubmit}
            timers={timers}
          />
        )}
        {isListVisible && (
          <TimerList
            timers={timers}
            onClose={handleCloseList}
            onClick={handleClickBtn}
            onChange={handleCheckbox}
            selectedTimerId={selectedTimerId}
          />
        )}

        <Bee
          time={currentTimer.remainingTime}
          onClick={handleClickBtn}
          isFormVisible={isFormVisible}
          isFinishedCountDown={isFinishedCountDown}
        />
      </div>
    </>
  );
}
