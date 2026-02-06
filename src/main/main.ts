import path from "node:path"
import started from "electron-squirrel-startup"
import { app, BrowserWindow } from "electron"

if (started) app.quit()

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    fullscreen: false,
    webPreferences: {
      preload: path.join(__dirname, "preload.js")
    },
    skipTaskbar: true
  })

  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL)
  else mainWindow.loadFile(path.join(__dirname, "../../public/index.html"))

  // Abrir DevTools em desenvolvimento
  mainWindow.webContents.openDevTools()
}

app.on("ready", createWindow)
app.on("window-all-closed", () => process.platform !== "darwin" && app.quit())
app.on("activate", () => BrowserWindow.getAllWindows().length === 0 && createWindow())
