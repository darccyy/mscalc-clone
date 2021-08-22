const {app, BrowserWindow, ipcMain} = require("electron");
const path = require("path");

var win;
function createWindow() {
  win = new BrowserWindow({
    width: 377,
    height: 552,
    webPreferences: {
      nodeIntegration: true
    },
    show: false,
    icon: path.join(__dirname, "image/icon.png"),
    frame: false,
    titleBarStyle: "hidden",
  });
  // win.maximize();
  win.setMenuBarVisibility(false);
  // win.setFullScreen(true);

  win.loadFile("html/index.html");
  win.once("ready-to-show", () => {
    win.show()
  });

  win.on("focus", () => {
    win.webContents.send("focus");
  })

  win.on("blur", () => {
    win.webContents.send("blur");
  })
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

/* Client Messages */
ipcMain.on("minimize", () => {
  win.minimize();
});

ipcMain.on("maximize", () => {
  if (win.isMaximized()) {
    win.restore();
  } else {
    win.maximize();
  }
});

ipcMain.on("quit", () => {
  app.quit();
  process.exit();
});