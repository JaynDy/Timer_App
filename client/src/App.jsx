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
import { TimerButton } from "./components/TimerButton";
import sound1 from "./sounds/sound1.mp3";
import { getSoundEnabled, getTimers, saveSoundEnabled } from "./api/api.timers";

export default function App() {
  const [isFormVisible, setIsFormVisible] = useState(true);
  const [isListVisible, setIsListVisible] = useState(false);
  const [isAdditionListVisible, setIsAdditionListVisible] = useState(false);
  const [mainTimerIdToDelete, setMainTimerIdToDelete] = useState(null);

  const [timerState, setTimerState] = useState("idle"); // idle (show btn START), running (show btn PAUSE), paused (show btn PLAY), alarmIcon
  const [isFinishedCountDown, setIsFinishedCountDown] = useState(false);
  const additionalTimersQueueRef = useRef([]);
  const hasRunAllAdditionTimersRef = useRef(false);
  const prevTimerState = useRef(timerState);

  const alarmSound = useRef(new Audio(sound1));
  alarmSound.current.loop = true;
  const [isSoundEnabled, setIsSoundEnabled] = useState(true);

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
  }, [timers, isClickAdditionalTimerBtn, isListVisible]);

  useEffect(() => {
    console.log("isClickBtnAdd", isClickBtnAdd);
    console.log("isClickAdditionalTimerBtn", isClickAdditionalTimerBtn);
    console.log("isFormVisible", isFormVisible);
    console.log("isListVisible", isListVisible);
    console.log("isAdditionListVisible", isAdditionListVisible);
    console.log("initialTimer", initialTimer);
    console.log("previousCurrentTimer", previousCurrentTimer);
  });

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
    console.log("timerState", timerState);
    if (timerState === "running") {
      startCountDown();
    }
  }, [currentTimer, timerState]);

  useEffect(() => {
    getSoundEnabled().then((isEnabled) => {
      setIsSoundEnabled(isEnabled);
    });
  }, []);

  const toggleSound = () => {
    const newValue = !isSoundEnabled;
    setIsSoundEnabled(newValue);
    saveSoundEnabled(newValue);
  };

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
    setTimerState("idle");
  };

  const handleCloseList = () => {
    if (currentTimer.mainTimerId !== null) {
      setIsListVisible(true);
    } else {
      setIsAdditionListVisible(false), setIsListVisible(false);
    }
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
          setMainTimerIdToDelete(mainTimer.id);
          console.log("mainTimerIdToDelete", mainTimerIdToDelete);
        } else if (
          !mainTimer.isMain ||
          mainTimer.remainingTime !== currentTimer.remainingTime
        ) {
          const updatedMainTimer = {
            ...mainTimer,
            isMain: true,
            remainingTime: currentTimer.initialTime,
            initialTime: currentTimer.initialTime,
          };

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
        setTimerState("idle");
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

  const handlePauseTimer = () => {
    clearInterval(timeRef.current);
    timeRef.current = null;
  };

  const startCountDown = () => {
    if (timeRef.current) return;
    let seconds = Math.floor(convertToSeconds(currentTimer.remainingTime));

    timeRef.current = setInterval(() => {
      if (seconds <= 1) {
        setTimerState("alarmIcon");
        setIsFinishedCountDown(true);
      }
      if (seconds <= 0) {
        clearInterval(timeRef.current);
        timeRef.current = null;
        return;
      }
      seconds--;

      dispatch(
        setCurrentTimer({
          ...currentTimer,
          remainingTime: formatTime(seconds),
        })
      );
    }, 1000);

    setIsFinishedCountDown(false);
  };

  const handleClickBtn = (iconName, id) => {
    console.log("click:", iconName);

    switch (iconName) {
      case "alarm":
        if (isFinishedCountDown) {
          setIsFinishedCountDown(true);

          const existenceAdditionalTimers = timers.filter(
            (timer) => timer.mainTimerId === selectedTimerId
          );

          if (
            existenceAdditionalTimers.length > 0 &&
            !hasRunAllAdditionTimersRef.current
          ) {
            if (additionalTimersQueueRef.current.length === 0) {
              additionalTimersQueueRef.current = [...existenceAdditionalTimers];
            }

            const nextTimer = additionalTimersQueueRef.current.shift();

            if (nextTimer) {
              dispatch(setCurrentTimer(nextTimer));
              setTimerState("running");
              setIsFinishedCountDown(false);
            }

            if (additionalTimersQueueRef.current.length === 0) {
              hasRunAllAdditionTimersRef.current = true;
            }
          } else if (hasRunAllAdditionTimersRef.current) {
            if (additionalTimersQueueRef.current.length === 0) {
              hasRunAllAdditionTimersRef.current = true;
              const mainTimer = timers.find(
                (t) => t.id === currentTimer.mainTimerId && t.isMain
              );
              if (mainTimer) {
                dispatch(setCurrentTimer(mainTimer));
                setTimerState("idle");
              }
            }
          } else {
            setTimerState("idle");
            dispatch(
              setCurrentTimer({
                ...currentTimer,
                remainingTime: currentTimer.initialTime,
              })
            );
          }
        }
        break;

      case "start":
        if (currentTimer.remainingTime !== "00 : 00 : 00") {
          hasRunAllAdditionTimersRef.current = false;
          startCountDown();
          setTimerState("running");
        }
        break;
      case "play":
        if (currentTimer.remainingTime !== "00 : 00 : 00") {
          hasRunAllAdditionTimersRef.current = false;
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

        console.log("selectedTimerId", selectedTimerId);

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
        console.log("isClickBtnAdd", isClickBtnAdd);
        break;

      case "restart":
        handlePauseTimer();
        console.log(currentTimer.initialTime);
        dispatch(
          setCurrentTimer({
            ...currentTimer,
            remainingTime: currentTimer.initialTime,
          })
        );
        setTimerState("idle");
        break;

      case "delete":
        if (id) {
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

            if (timers.length === additionalTimers.length + 1) {
              dispatch(clearCurrentTimer());
              setIsListVisible(false);
              setIsClickBtnAdd(true);
            }
          } else {
            handleDeleteTimer(id);

            const remainingAdditionalTimers = timers.filter(
              (t) => t.mainTimerId === timerToDelete.mainTimerId && t.id !== id
            );

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
        setClickedTimerId(id);
        break;
    }
  };

  const handleCloseForm = (e) => {
    e.preventDefault();

    if (isClickAdditionalTimerBtn) {
      setIsClickAdditionalTimerBtn(false);
      setIsClickBtnAdd(true);
      setIsFormVisible(true);
      dispatch(setCurrentTimer(previousCurrentTimer));
      dispatch(updateTimer(previousCurrentTimer));

      if (mainTimerIdToDelete !== null) {
        const mainTimerToDelete = timers.find(
          (t) => t.id === mainTimerIdToDelete
        );

        if (mainTimerToDelete) {
          dispatch(deleteTimer(mainTimerToDelete.id));
          setMainTimerIdToDelete(null);
        }
      }
      return;
    }
    if (timerState === "paused" && !isClickAdditionalTimerBtn) {
      setIsClickAdditionalTimerBtn(false);
      setIsFormVisible(false);
      dispatch(setCurrentTimer(initialTimer));
      return;
    }
    if (initialTimer !== null) {
      dispatch(setCurrentTimer(initialTimer));
      dispatch(updateTimer(initialTimer));
      setIsFormVisible(false);
      return;
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
            currentTimer={currentTimer}
            onClick={handleClickBtn}
            isFormVisible={isFormVisible}
            timerState={timerState}
            isSoundEnabled={isSoundEnabled}
            onToggleSound={toggleSound}
          />
        )}

        {isFormVisible && (
          <TimerForm
            title={
              isClickAdditionalTimerBtn || currentTimer.mainTimerId !== null
                ? "Additional timer"
                : isClickBtnAdd && !currentTimer.id
                ? "Add new timer"
                : "Edit the time"
            }
            isFormVisible={isFormVisible}
            onClose={handleCloseForm}
            onChange={handleTimeChange}
            onSubmit={handleSubmit}
            timers={timers}
            isClickAdditionalTimerBtn={isClickAdditionalTimerBtn}
            currentTimer={currentTimer}
            timerState={timerState}
          />
        )}

        <TimerButton timerState={timerState} prevTimerState={prevTimerState} />

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
          alarmSound={alarmSound.current}
          isSoundEnabled={isSoundEnabled}
        />
      </div>
    </>
  );
}
