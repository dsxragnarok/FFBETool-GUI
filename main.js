const {app, BrowserWindow, ipcMain} = require('electron');
const path = require('path')
const url = require('url')
const fs = require('fs');
const util = require('util');
const { fork } = require('child_process');

const readdir = util.promisify(fs.readdir);

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win

function createWindow () {
  // Create the browser window.
  win = new BrowserWindow({width: 800, height: 600})

  const startUrl = (process.env.ELECTRON_DEV && 'http://localhost:3000') ||
    url.format({
        pathname: path.join(__dirname, 'build/index.html'),
        protocol: 'file:',
        slashes: true
    });

  // and load the index.html of the app.
  win.loadURL(startUrl)

  // Open the DevTools.
  win.webContents.openDevTools()

  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null
  })

  // Installing React DevTools
  // Need to figure out a better way to do this.
  BrowserWindow.addDevToolsExtension('/Users/kevin.phung/Library/Application Support/Google/Chrome/Default/Extensions/fmkadmapgofadopljbjfkapdkoienihi/3.2.3_0');
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
ipcMain.on('invoke-ffbetool', (event, message) => {
  console.log('[invoke-ffbetool]', message);
  const worker = fork('./ffbetool-worker.js');
  worker.send(message);
  worker.on('message', (message) => console.log('-- received from worker --', message));
});

ipcMain.on('retrieve-animNames', (event, { id, path }) => {
  console.log('[retrieve-animNames]', id, path);

  const isCgsFileWithId = (file, id) => file.indexOf('_cgs_') >= 0 && file.indexOf(String(id)) > 0;
  const extractAnimNameFromPath = (file) => file.substring('unit_'.length, file.indexOf('_cgs_'));

  readdir(path)
    .then((files) => {
      const animations = files
        .filter((file) => isCgsFileWithId(file, id))
        .map((file) => extractAnimNameFromPath(file));

      console.log(animations);
      event.sender.send('acquired-animNames', { animations });
    })
    .catch((error) => console.error('[readdir]', error));
});
