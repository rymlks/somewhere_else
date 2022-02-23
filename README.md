# somewhere_else
A game set in 4D euclidian space. Use WASD keys to move around, and use the mouse to rotate the camera. Press ESC to pause/unpause. Hold shift to change your keyboard and mouse controls to 4-dimensional movement and rotation. While Shift is held, the W and S keys move alond the W axis relative to the camera, and the mouse rotates on xw and yw planes. A and D keys are unaffected by holding Shift. Rotate the scroll wheel to rotate the camera along the zw plane. You can download a short demo video at https://github.com/rymlks/somewhere_else/blob/master/Somewhere%20Else%202020-11-05%2017-51-11.mp4

## Initial setup
- Install `node` and `npm` (https://nodejs.org/en/download/)
- Set up submodules with `git submodule init` and `git submodule update` (may take several minutes)
- Run `npm install` to install packages
- Run `cd js/three.js` and `npm install` again to install three.js's dependencies
- Run `cd ../..` to get back to the root directory
- Run `bash ./build_robot.sh` to build robotjs for your system. I have no idea why running `npm rebuild` does not do this for you.

## How to run
- Bring your three.js (forked) version up to date: `git submodule update`
- Run `npm start` to start the app

## How to build
- Run `npm run-script build` - the output will be in the `build` directory
- Zip the contents of `build/itch.io` for uploading