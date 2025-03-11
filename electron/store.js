import Store from "electron-store";

const store = new Store();

export const getTimers = async () => store.get("timers", []);

export const saveTimers = async (timers) => {
  store.set("timers", timers);
  console.log("timers Electron", timers);
};
