
function pausedControls(GM) {
	if (GM.pressedKeys[KeyCode.KEY_ESCAPE] === true) {
        GM.unPause();
    }
}

export { pausedControls };