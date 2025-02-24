const { contextBridge, ipcRenderer } = require("electron");

console.log("Preload script loaded");

contextBridge.exposeInMainWorld("electronAPI", {
  getTimers: () => ipcRenderer.invoke("getTimers"),
  saveTimers: (timers) => ipcRenderer.invoke("saveTimers", timers),
});
