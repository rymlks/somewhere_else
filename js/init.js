import { keyPressed, keyReleased, mouseMoved, wheelScrolled } from "./controls.js"

// Set up event handlers for controls
window.onkeyup = keyReleased;
window.onkeydown = keyPressed;
document.onmousemove = mouseMoved;
document.onwheel = wheelScrolled;