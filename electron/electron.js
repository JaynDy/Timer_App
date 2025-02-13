import { app, BrowserWindow, screen } from "electron";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let mainWindow;

app.on("ready", () => {
  const { width, height } = screen.getPrimaryDisplay().workAreaSize;

  mainWindow = new BrowserWindow({
    frame: false,
    alwaysOnTop: true,
    resizable: false,
    skipTaskbar: true,
    transparent: true,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  const windowWidth = 200;
  const windowHeight = 280;
  const margin = 30;

  // const windowWidth = 500;
  // const windowHeight = 680;

  mainWindow.setBounds({
    x: width - windowWidth - margin,
    y: height - windowHeight + margin,
    width: windowWidth,
    height: windowHeight,
  });

  mainWindow.loadURL(
    app.isPackaged
      ? `file://${path.join(__dirname, "../dist/index.html")}`
      : "http://localhost:5173"
  );

  // if (!app.isPackaged) {
  //   mainWindow.webContents.openDevTools();
  // }
});

// import { app, BrowserWindow, ipcMain, screen } from "electron";
// import { fileURLToPath } from "url";
// import path from "path";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// let mainWindow;

// app.on("ready", () => {
//   const { width, height } = screen.getPrimaryDisplay().workAreaSize;

//   mainWindow = new BrowserWindow({
//     frame: false,
//     alwaysOnTop: true,
//     resizable: false,
//     skipTaskbar: true,
//     transparent: true,
//     webPreferences: {
//       preload: path.join(__dirname, "preload.js"),
//       contextIsolation: true,
//       nodeIntegration: false,
//     },
//   });

// const windowWidth = 500;
// const windowHeight = 750;
// mainWindow.setBounds({
//   x: width - windowWidth,
//   y: height - windowHeight,
//   width: windowWidth,
//   height: windowHeight,
// });

//   const startUrl = `file://${path.resolve(__dirname, "index.html")}`;

//   mainWindow.loadURL(startUrl).catch((err) => {
//     console.error("Failed to load URL:", err);
//   });

//   mainWindow.setMenuBarVisibility(false);
//   mainWindow.webContents.openDevTools();

//   ipcMain.on("start-timer", (event) => {
//     console.log("Timer started from React");
//     event.sender.send("timer-status", "Timer started!");
//   });

//   ipcMain.on("edit-time", () => {
//     console.log("Edit time clicked");
//   });

//   console.log("NODE_ENV:", process.env.NODE_ENV);
//   console.log("Resolved Preload Path:", path.join(__dirname, "preload.js"));
//   console.log("Resolved HTML Path:", startUrl);
// });
