import Store from "electron-store";

const store = new Store();

// export const saveTimers = (newTimer) => {
//   const timers = store.set("timers", []);
//   const updatedTimers = [...timers, newTimer];

//   store.set("timers", updatedTimers);
//   console.log("✅ saveTimers: таймеры сохранены", updatedTimers);
// };

export const saveTimers = (newTimer) => {
  const updatedTimers = [...store.get("timers", []), newTimer];
  store.set("timers", updatedTimers);
};

export const getTimers = () => {
  const timers = store.get("timers", []);
  console.log("getTimers", timers);

  return timers;
};
