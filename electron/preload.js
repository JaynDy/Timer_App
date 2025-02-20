const { contextBridge, ipcRenderer } = require("electron");

console.log("Preload script loaded");

contextBridge.exposeInMainWorld("electronAPI", {
  // sendMessage: (channel, data) => ipcRenderer.send(channel, data),
  // onMessage: (channel, callback) => ipcRenderer.on(channel, callback),
  getTimers: () => ipcRenderer.invoke("getTimers"),
  saveTimers: (timers) => ipcRenderer.invoke("saveTimers", timers),
});
