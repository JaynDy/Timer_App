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

export default function App() {
  const [isFormVisible, setIsFormVisible] = useState(true);
  const [isListVisible, setIsListVisible] = useState(false);
  const [isAdditionListVisible, setIsAdditionListVisible] = useState(false);

  const [timerState, setTimerState] = useState("idle"); // idle (show btn START), running (show btn PAUSE), paused (show btn PLAY )
  const [isFinishedCountDown, setIsFinishedCountDown] = useState(false);

  const [isClickBtnAdd, setIsClickBtnAdd] = useState(true);
  const [isClickAdditionalTimerBtn, setIsClickAdditionalTimerBtn] =
    useState(false);

  const [selectedTimerId, setSelectedTimerId] = useState(null);
  const [clickedTimerId, setClickedTimerId] = useState(null);

  const [initialTimer, setInitialTimer] = useState(null);
  const [previousCurrentTimer, setPreviousCurrentTimer] = useState(null);

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
    if (isClickAdditionalTimerBtn && currentTimer.id) {
      const updatedMainTimer = timers.find((t) => t.id === currentTimer.id);
      if (updatedMainTimer) {
        dispatch(setCurrentTimer({ mainTimerId: updatedMainTimer.id }));
      }
    }
  }, [timers, isClickAdditionalTimerBtn]);

  useEffect(() => {
    dispatch(loadTimers());
    window.electronAPI.getTimers().then((timers) => {
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
    // console.log("initialTimer", initialTimer);
    // console.log("previousCurrentTimer", previousCurrentTimer);
    // console.log("isClickBtnAdd", isClickBtnAdd);
    // console.log("isFormVisible", isFormVisible);
    // console.log("isListVisible", isListVisible);
    // console.log("isAdditionListVisible", isAdditionListVisible);
    // console.log("selectedTimerId", selectedTimerId);
  });

  const handleCheckbox = (timerId) => {
    const newSelectedTimer = timerId === selectedTimerId ? null : timerId;
    handleClickBtn("toggle", timerId, newSelectedTimer !== null);

    const updatedTimers = timers.map((timer) => ({
      ...timer,
      isSelected: timer.id === timerId,
    }));
    dispatch(updateTimer(updatedTimers));

    const selectedTimer = updatedTimers.find((timer) => timer.id === timerId);
    if (selectedTimer.id) {
      dispatch(setCurrentTimer({ ...selectedTimer, isSelected: true }));
    }

    setSelectedTimerId(newSelectedTimer);
    console.log("updatedTimers", updatedTimers);
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
    if (currentTimer.id) {
      const updatedAdditionalTimer = {
        ...currentTimer,
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
    } else {
      const additionalTimer = {
        id: uuidv4(),
        remainingTime: currentTimer.initialTime,
        initialTime: currentTimer.initialTime,
        isSelected: false,
        isMain: false,
        mainTimerId: mainTimer.id,
      };

      dispatch(addTimer(additionalTimer));
    }

    return mainTimer;
  };

  const handleSubmit = async (e, actionType) => {
    e.preventDefault();
    let savedMainTimer = null;

    switch (actionType) {
      case "additionalTimer":
        setIsClickAdditionalTimerBtn(true);
        setPreviousCurrentTimer(currentTimer);

        let mainTimer = timers.find((timer) => timer.id === currentTimer.id);
        console.log("mainTimer", mainTimer);

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
        } else if (
          !mainTimer.isMain ||
          mainTimer.remainingTime !== currentTimer.remainingTime
        ) {
          const updatedMainTimer = {
            ...mainTimer,
            isMain: true,
            remainingTime: currentTimer.remainingTime,
            initialTime: currentTimer.initialTime,
          };

          console.log("Updating main timer:", updatedMainTimer);
          dispatch(updateTimer({ ...updatedMainTimer }));
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
        isSelected: true,
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
    // console.log("click:", iconName, id);

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
        setInitialTimer(currentTimer);

        console.log("initialTimer", initialTimer);

        setIsAdditionListVisible(false);
        setIsListVisible(false);
        setIsFormVisible(true);
        setIsClickBtnAdd(false);
        handlePauseTimer();
        setTimerState("paused");

        if (id !== selectedTimerId) {
          const selectedTimer = timers.find((timer) => timer.id === id);
          if (selectedTimer === undefined) return;

          console.log("selectedTimer", selectedTimer);
          dispatch(clearCurrentTimer());
          dispatch(setCurrentTimer(selectedTimer));
        }

        break;

      case "add":
        setInitialTimer(currentTimer);
        dispatch(clearCurrentTimer());
        setIsFormVisible(true);
        setIsClickBtnAdd(true);
        break;

      case "delete":
        if (id) {
          console.log(id);

          const timerToDelete = timers.find((timer) => timer.id === id);
          const selectedTimer = timers.find(
            (timer) => timer.id === selectedTimerId
          );

          if (timerToDelete.isMain) {
            const additionalTimers = timers.filter(
              (timer) => timer.mainTimerId === id
            );

            additionalTimers.forEach((t) => handleDeleteTimer(t.id));

            handleDeleteTimer(id);

            dispatch(setCurrentTimer(selectedTimer));

            if (timers.length === 1) {
              dispatch(clearCurrentTimer());
              setIsListVisible(false);
              setIsClickBtnAdd(true);
            }
          } else {
            handleDeleteTimer(id);

            console.log("timerToDelete", timerToDelete);

            const remainingAdditionalTimers = timers.filter(
              (t) => t.mainTimerId === timerToDelete.mainTimerId && t.id !== id
            );

            console.log("remainingAdditionalTimers", remainingAdditionalTimers);

            if (remainingAdditionalTimers.length === 0) {
              const mainTimer = timers.find(
                (t) => t.id === timerToDelete.mainTimerId
              );

              dispatch(updateTimer({ ...mainTimer, isMain: false }));
              setIsAdditionListVisible(false);
              setIsListVisible(true);
            }

            if (id === selectedTimerId || timers.length === 1) {
              dispatch(clearCurrentTimer());
              setSelectedTimerId(null);
              setIsFormVisible(true);
              setIsClickBtnAdd(true);
              setSelectedTimerId(null);
            }
          }
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
        window.electronAPI.getTimers().then(() => {
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
        setClickedTimerId(id);
        break;
    }
  };

  const handleCloseForm = (e) => {
    e.preventDefault();
    console.log("Click close btn");
    console.log(" previousCurrentTimer", previousCurrentTimer);
    console.log(isAdditionListVisible, isAdditionListVisible);

    if (isClickAdditionalTimerBtn) {
      setIsClickAdditionalTimerBtn(false);
      setIsFormVisible(true);
      dispatch(setCurrentTimer(previousCurrentTimer));
      dispatch(updateTimer(previousCurrentTimer));
    }
    if (initialTimer && !isClickAdditionalTimerBtn) {
      setIsFormVisible(false);
      dispatch(setCurrentTimer(initialTimer));
      dispatch(updateTimer(initialTimer));
    }
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
            clickedTimerId={clickedTimerId}
            isAdditionListVisible={isAdditionListVisible}
            setIsAdditionListVisible={setIsAdditionListVisible}
            isListVisible={isListVisible}
            setIsListVisible={setIsListVisible}
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
