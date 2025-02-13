const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electron", {
  sendMessage: (channel, data) => ipcRenderer.send(channel, data),
  onMessage: (channel, callback) => ipcRenderer.on(channel, callback),
});

// // @ts-nocheck
// const { contextBridge, ipcRenderer } = require("electron");

// console.log("Preload script загружен!");

// contextBridge.exposeInMainWorld("electron", {
//   startTimer: () => ipcRenderer.send("start-timer"),
//   editTime: () => ipcRenderer.send("edit-time"),
//   onMessage: (channel, callback) =>
//     ipcRenderer.on(channel, (event, ...args) => callback(...args)),
// });
