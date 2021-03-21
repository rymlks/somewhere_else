const { app, BrowserWindow, globalShortcut } = require('electron')
const robot = require('robotjs')

function createWindow () {
  // Create the browser window.
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    },
    acceptFirstMouse: true
  })

  // and load the index.html of the app.
  win.loadFile('index.html')

  // Turn off capslock on window close
  var caps = false;
  var wc = win.webContents;
  win.on('closed', _ => {
    if (caps === true)
      robot.keyTap("capslock");
  });
  win.on('blur', _ => {
    if (caps === true) {
      robot.keyTap("capslock");
      caps = !caps;
    }
  });
  wc.on('before-input-event', (e, i) => {
    // On Capslock keyUp event, toggle caps state
    if(i.key === 'CapsLock') {
      if(i.type === 'keyUp') {
          caps = !caps;
          //console.log('Caps: ' + caps);
      }
    }
  });
}

app.whenReady().then(createWindow)