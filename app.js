const { app, BrowserWindow, globalShortcut } = require('electron')
const robot = require('robotjs')

const fs = require('fs');

app.commandLine.appendSwitch ("disable-http-cache");
const path = require("path");

function createWindow () {
  //globalShortcut.unregister("CommandOrControl+W");
  //globalShortcut.unregister("CommandOrControl+A");

  // Create the browser window.
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
    acceptFirstMouse: true
  });

  // and load the index.html of the app.
  var index = 'index.html';
  if (process.argv.includes('editor')) {
    index = `${__dirname}/js/three.js/editor/index.html`;
    console.log("Launching into editor...\n");
  }
  win.loadFile(index, {"extraHeaders" : "pragma: no-cache\n"});

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