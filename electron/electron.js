import { app, BrowserWindow, screen, ipcMain } from "electron";
import path from "path";
import { fileURLToPath } from "url";
import {
  saveTimers,
  getTimers,
  saveSoundEnabled,
  getSoundEnabled,
} from "./store.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let mainWindow;

app.on("ready", () => {
  const { width, height } = screen.getPrimaryDisplay().workAreaSize;

  mainWindow = new BrowserWindow({
    frame: false,
    alwaysOnTop: true,
    resizable: false,
    // skipTaskbar: true,
    transparent: true,
    icon: app.isPackaged
      ? path.join(process.resourcesPath, "dist", "assets", "bee.png")
      : path.join(__dirname, "../src/img/bee.png"),
    webPreferences: {
      preload: app.isPackaged
        ? path.join(
            process.resourcesPath,
            "app.asar.unpacked",
            "electron",
            "preload.js"
          )
        : path.join(__dirname, "../electron/preload.js"),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  console.log("Window created");

  const windowWidth = 400;
  const windowHeight = 780;
  const margin = 30;

  mainWindow.setBounds({
    x: width - windowWidth - margin,
    y: height - windowHeight + margin,
    width: windowWidth,
    height: windowHeight,
  });

  console.log(
    "Loading URL:",
    app.isPackaged
      ? `file://${path.join(__dirname, "../dist/index.html")}`
      : "http://localhost:5173"
  );

  mainWindow.loadURL(
    app.isPackaged
      ? `file://${path.join(__dirname, "../dist/index.html")}`
      : "http://localhost:5173"
  );

  mainWindow.once("ready-to-show", () => {
    console.log("Main window is ready to show");
    mainWindow.show();
  });

  mainWindow.on("unresponsive", () => {
    console.log("Window is unresponsive");
  });

  if (!app.isPackaged) {
    mainWindow.webContents.openDevTools();
  }

  mainWindow.show();

  ipcMain.handle("getTimers", () => getTimers());
  ipcMain.handle("saveTimers", (_, timers) => {
    saveTimers(timers);
  });

  ipcMain.handle("getSoundEnabled", () => getSoundEnabled());
  ipcMain.on("saveSoundEnabled", (_, isEnabled) => {
    saveSoundEnabled(isEnabled);
  });
});
