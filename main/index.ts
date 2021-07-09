const { app, ipcMain } = require("electron");
const { BrowserWindow } = require("electron-acrylic-window");
const path = require("path");
let win;

// Create Electron App
function createWindow() {
  win = new BrowserWindow({
    width: 1280,
    height: 720,
    frame: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

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
