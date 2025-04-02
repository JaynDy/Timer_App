const { contextBridge, ipcRenderer } = require("electron");

console.log("Preload script loaded");

contextBridge.exposeInMainWorld("electronAPI", {
  getTimers: () => ipcRenderer.invoke("getTimers"),
  saveTimers: (timers) => ipcRenderer.invoke("saveTimers", timers),
  getSoundEnabled: () => ipcRenderer.invoke("getSoundEnabled"),
  saveSoundEnabled: (isEnabled) =>
    ipcRenderer.send("saveSoundEnabled", isEnabled),
});
