import Store from "electron-store";

const store = new Store();

export const saveTimers = (timers) => {
  store.set("timers", timers);
};

export const getTimers = () => {
  return store.get("timers", []);
};
