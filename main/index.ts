const os = require("os");
const { app, ipcMain, BrowserWindow } = require("electron");
// const { BrowserWindow } = require("electron-acrylic-window");
const path = require("path");

let frame: boolean;
let win;

os.platform() === "linux" ? (frame = true) : (frame = false);

// Create Electron App
function createWindow() {
  win = new BrowserWindow({
    width: 1280,
    height: 720,
    frame,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });
  win.setMenu(null);

  win.loadURL(`file://${path.join(__dirname, "../renderer/index.html")}`);

  win.webContents.openDevTools();
  win.on("closed", function () {
    win = null;
  });
  win.on("maximize", () => {
    win.webContents.send("isMaximized");
  });
  win.on("unmaximize", () => {
    win.webContents.send("isRestored");
  });
}

// Minimize App
ipcMain.on("minimizeApp", () => {
  win.minimize();
});

// Maximize App
ipcMain.on("maximizeApp", () => {
  if (win.isMaximized()) {
    win.restore();
  } else {
    win.maximize();
  }
});

// Close App
ipcMain.on("closeApp", () => {
  win.close();
});

app.on("ready", createWindow);
