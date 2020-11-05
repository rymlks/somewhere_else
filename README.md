# somewhere_else
A game set in 4D euclidian space. Use WASD keys to move around, and use the mouse to rotate the camera. Hold shift to change your keyboard and mouse controls to 4-dimensional movement and rotation. While Shift is held, the W and S keys move alond the W axis relative to the camera, and the mouse rotates on xw and yw planes. A and D keys are unaffected by holding Shift. Rotate the scroll wheel to rotate the camera along the zw plane.

## Initial setup
- Install `node` and `npm` (https://nodejs.org/en/download/)
- Set up submodules with `git submodule init` and `git submodule update`
- Run `npm install` to install packages

## How to run
- Bring your three.js (forked)version up to date: `git submodule update` 
- Run `npm start` to start the app