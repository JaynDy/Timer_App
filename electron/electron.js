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
    // skipTaskbar: true,
    transparent: true,
    icon: app.isPackaged
      ? path.join(process.resourcesPath, "img/bee.png")
      : path.join(__dirname, "../src/img/bee.png"),
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  const windowWidth = 200;
  const windowHeight = 280;
  const margin = 30;

  mainWindow.setBounds({
    x: width - windowWidth - margin,
    y: height - windowHeight + margin,
    width: windowWidth,
    height: windowHeight,
  });

  mainWindow.loadURL(
    app.isPackaged
      ? `file://${path.join(__dirname, "index.html")}`
      : "http://localhost:5173"
  );

  // if (!app.isPackaged) {
  //   mainWindow.webContents.openDevTools();
  // }
});
