export const convertToSeconds = (timerString) => {
  const [hours, minutes, seconds] = timerString.split(" : ").map(Number);
  return hours * 3600 + minutes * 60 + seconds;
};

export const formatTime = (totalSeconds) => {
  const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, "0");
  const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(
    2,
    "0"
  );
  const seconds = String(totalSeconds % 60).padStart(2, "0");
  return `${hours} : ${minutes} : ${seconds}`;
};
