const { app, BrowserWindow } = require("electron");
const runServer = require("./index");

app.whenReady().then(() => {
  app.whenReady().then(() => {
    runServer();

    const mainWindow = new BrowserWindow({
      width: 1000,
      height: 800,
      webPreferences: {
        nodeIntegration: true,
      },
    });

    mainWindow.loadURL("http://localhost:8080");
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
