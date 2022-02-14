import {KeyCode} from "../KeyCode/keycode.min.js"

console.log(KeyCode);

var bondage = {};
var fs = {};

try {
    bondage = require('bondage');
    fs = require('fs');
} catch (error) {
    console.warn("Could not import module: " + error);
}

export {KeyCode, bondage, fs}