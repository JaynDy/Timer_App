import React from "react";
import "./App.css";
import { useRef, useState, useEffect } from "react";
import { convertToSeconds, formatTime } from "./utilities";
import { TimerForm } from "./components/TimerForm/TimerForm";
import { MainImg } from "./components/MainImg/MainImg";
import { Bee } from "./components/Bee";
import { useDispatch, useSelector } from "react-redux";
import {
  clearCurrentTimer,
  clearCurrentTimerExceptMainId,
  saveAdditionalTimer,
  setCurrentTimer,
} from "./reducer/timerSlice";
import { v4 as uuidv4 } from "uuid";
import {
  addTimer,
  clearTimers,
  deleteTimer,
  loadTimers,
  updateTimer,
} from "./reducer/timersSlice";
import { TimerList } from "./components/TimerList";
import { AdditionTimers } from "./components/AdditionTimers";
import { getTimers } from "./api/api.timers";

export default function App() {
  const [isFormVisible, setIsFormVisible] = useState(true);
  const [isListVisible, setIsListVisible] = useState(false);
  const [isAdditionListVisible, setIsAdditionListVisible] = useState(false);
  const [timerState, setTimerState] = useState("idle"); // idle (show btn START), running (show btn PAUSE), paused (show btn PLAY )
  const [isFinishedCountDown, setIsFinishedCountDown] = useState(false);
  const [isClickBtnAdd, setIsClickBtnAdd] = useState(true);
  const [selectedTimerId, setSelectedTimerId] = useState(null);
  const [previousCurrentTimer, setPreviousCurrentTimer] = useState(null);
  const [isClickAdditionalTimerBtn, setIsClickAdditionalTimerBtn] =
    useState(false);

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
      setIsAdditionListVisible(false);
    }
    const updatedMainTimer = timers.find((t) => t.isMain);
    if (updatedMainTimer) {
      console.log("Обновленный основной таймер:", updatedMainTimer);
    }
  }, [timers]);

  useEffect(() => {
    dispatch(loadTimers());
    getTimers().then((timers) => {
      if (Array.isArray(timers)) {
        const selectedTimer = timers.find((timer) => timer.isSelected === true);

        if (selectedTimer) {
          dispatch(setCurrentTimer(selectedTimer));
          setIsFormVisible(false);
        }
      }
    });
    dispatch(clearCurrentTimerExceptMainId());
  }, [dispatch]);

  useEffect(() => {
    if (currentTimer.remainingTime === "00 : 00 : 00") setTimerState("idle");
  }, [currentTimer.remainingTime]);

  useEffect(() => {
    console.log("isFormVisible", isFormVisible);
    console.log("isClickAdditionalTimerBtn", isClickAdditionalTimerBtn);
  }, [isFormVisible, isClickAdditionalTimerBtn]);

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
    setIsListVisible(false), setIsAdditionListVisible(false);
  };
  const handleDeleteTimer = (id) => dispatch(deleteTimer(id));

  const saveMainTimer = () => {
    const updatedTimer = {
      id: currentTimer.id || uuidv4(),
      remainingTime: currentTimer.initialTime,
      initialTime: currentTimer.initialTime,
      isSelected: true,
      isMain: currentTimer.isMain || false,
      mainTimerId: currentTimer.mainTimerId || null,
    };

    const existingIndex = timers.findIndex((t) => t.id === updatedTimer.id);
    if (existingIndex !== -1) {
      dispatch(updateTimer(updatedTimer));
    } else {
      dispatch(addTimer(updatedTimer));
    }
    return updatedTimer;
  };

  const savedAdditionalTimer = () => {
    let mainTimer = timers.find(
      (timer) => timer.id === currentTimer.mainTimerId
    );
    if (!mainTimer) return null;

    const existingAdditionalTimer = timers.find(
      (t) => t.mainTimerId === mainTimer.id && t.isMain === false
    );

    if (!existingAdditionalTimer) {
      const additionalTimer = {
        id: uuidv4(),
        remainingTime: currentTimer.initialTime,
        initialTime: currentTimer.initialTime,
        isSelected: false,
        isMain: false,
        mainTimerId: mainTimer.id,
      };
      dispatch(addTimer(additionalTimer));
    } else {
      const updatedAdditionalTimer = {
        ...existingAdditionalTimer,
        remainingTime: currentTimer.initialTime,
        initialTime: currentTimer.initialTime,
        isSelected: false,
      };
      dispatch(updateTimer(updatedAdditionalTimer));
      dispatch(
        saveAdditionalTimer({
          mainTimerId: mainTimer.id,
          additionalTimerId: existingAdditionalTimer.id,
        })
      );
    }
    return mainTimer;
  };

  const handleSubmit = async (e, actionType) => {
    e.preventDefault();
    let savedMainTimer = null;

    switch (actionType) {
      case "additionalTimer":
        setIsClickAdditionalTimerBtn(true);
        let mainTimer = timers.find((timer) => timer.id === currentTimer.id);

        if (!mainTimer) {
          mainTimer = {
            id: currentTimer.id || uuidv4(),
            remainingTime: currentTimer.initialTime,
            initialTime: currentTimer.initialTime,
            isSelected: true,
            isMain: true,
            mainTimerId: null,
          };
          dispatch(addTimer(mainTimer));
        } else if (!mainTimer.isMain) {
          const updatedMainTimer = { ...mainTimer, isMain: true };
          dispatch(updateTimer(updatedMainTimer));
        }

        dispatch(setCurrentTimer({ mainTimerId: mainTimer.id }));
        dispatch(clearCurrentTimerExceptMainId());
        setIsFormVisible(true);
        setIsClickBtnAdd(false);
        break;

      case "save":
        if (currentTimer.remainingTime === "00 : 00 : 00") return;

        if (currentTimer.mainTimerId) {
          savedMainTimer = savedAdditionalTimer();
        } else {
          savedMainTimer = saveMainTimer();
        }

        dispatch(clearCurrentTimer());
        dispatch(setCurrentTimer(savedMainTimer));
        setIsFormVisible(false);
        setIsClickAdditionalTimerBtn(false);
        break;
    }
  };

  const handleTimeChange = (e) => {
    const value = e.target.value;
    const isValidFormat = /^\d{0,2} : \d{0,2} : \d{0,2}$/.test(value);
    if (!isValidFormat) return;
    dispatch(
      setCurrentTimer({
        remainingTime: value,
        initialTime: value,
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
      seconds--;
      dispatch(
        setCurrentTimer({ ...currentTimer, remainingTime: formatTime(seconds) })
      );
    }, 1000);

    if (isFinishedCountDown) setIsFinishedCountDown(false);
  };

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
        setIsAdditionListVisible(false);
        setIsListVisible(false);
        setIsFormVisible(true);
        setIsClickBtnAdd(false);
        handlePauseTimer();
        setTimerState("paused");
        console.log("isFormVisible", isFormVisible);
        break;

      case "add":
        setPreviousCurrentTimer(currentTimer);
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
        setIsClickBtnAdd(true);
        break;

      case "settings":
        setIsListVisible(true);
        break;

      case "selectedTimer":
        getTimers().then(() => {
          dispatch(
            setCurrentTimer({
              ...currentTimer,
              isSelected: currentTimer.isSelected,
            })
          );
        });
        break;

      case "additionList":
        setIsAdditionListVisible(true);
        setSelectedTimerId(id);
        break;
    }
  };

  const handleCloseForm = (e) => {
    e.preventDefault();
    if (previousCurrentTimer) {
      dispatch(setCurrentTimer(previousCurrentTimer));
    }
    setIsFormVisible(false);
  };

  const handleDeleteAllTimers = () => {
    dispatch(clearTimers());
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
            title={
              isClickBtnAdd
                ? "Add new timer"
                : isClickAdditionalTimerBtn
                ? "Additional timer"
                : "Edit the time"
            }
            isFormVisible={isFormVisible}
            onClose={handleCloseForm}
            onChange={handleTimeChange}
            time={currentTimer.remainingTime}
            onSubmit={handleSubmit}
            timers={timers}
            isClickAdditionalTimerBtn={isClickAdditionalTimerBtn}
            currentTimer={currentTimer}
          />
        )}
        <AdditionTimers timers={timers} selectedTimerId={selectedTimerId} />

        {isListVisible && (
          <TimerList
            timers={timers}
            onClose={handleCloseList}
            onClick={handleClickBtn}
            onChange={handleCheckbox}
            selectedTimerId={selectedTimerId}
            isAdditionListVisible={isAdditionListVisible}
          />
        )}

        <Bee
          time={currentTimer.remainingTime}
          timers={timers}
          onClick={handleClickBtn}
          isFormVisible={isFormVisible}
          isFinishedCountDown={isFinishedCountDown}
        />
      </div>
    </>
  );
}
