const { app, BrowserWindow, globalShortcut } = require('electron')
const robot = require('robotjs')

const fs = require('fs');

function createWindow () {
  //globalShortcut.unregister("CommandOrControl+W");
  //globalShortcut.unregister("CommandOrControl+A");

  // Create the browser window.
  const win = new BrowserWindow({
    width: 1,
    height: 1,
    webPreferences: {
      nodeIntegration: true,
    },
    acceptFirstMouse: true,
    autoHideMenuBar: true,
    show: false,
  });
  win.maximize();
  win.show()

  // and load the index.html of the app.
  win.loadFile('index.html')

  // Turn off capslock on window close
  var caps = false;
  var wc = win.webContents;
  win.on('closed', _ => {
    if (caps === true) {
      robot.keyTap("capslock");
    }
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
      }
    }
  });
  
  globalShortcut.register("CommandOrControl+W", () => {
    console.log("CommandOrControl+W is pressed: Shortcut Disabled");
    wc.sendInputEvent({type: "keyDown", keyCode: "W"});
    wc.sendInputEvent({type: "keyDown", keyCode: "CommandOrControl"});
  });
  globalShortcut.register("CommandOrControl+A", () => {
      console.log("CommandOrControl+A is pressed: Shortcut Disabled");
      wc.sendInputEvent({type: "keyDown", keyCode: "A"});
      wc.sendInputEvent({type: "keyDown", keyCode: "CommandOrControl"});
  });
}

app.whenReady().then(createWindow)