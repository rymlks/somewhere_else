import * as THREE from "../three.js/src/Three.js";
import { GameState } from "./GameState.js"
import { keyPressed, keyReleased, mouseMoved, wheelScrolled, pressedKeys, heldKeys, releasedKeys, mouseAxis, mouseWheel } from "../controls/utils.js"
import { mainControls } from "../controls/MainControls.js"
import { pausedControls } from "../controls/PausedControls.js"

var instance = null;

class GameManager {
    constructor() {
        if (instance !== null) {
            throw "Only one instance of GameManager is allowed."
        }

        this.gameState = GameState.DEFAULT;
        this.speed = 5.0;

        this._setUpEventHandlers();
        this._setUpScene();
        this._setUpInputs();
        this._setUpTiming();
        this._setUpControls();

        instance = this;
    }

    ///////////////////////////////////////////////////////////////////////////
    // Public methods                                                        //
    ///////////////////////////////////////////////////////////////////////////

    /**
     * Begin playing the game
     */
    play() {
        this.unPause();
        requestAnimationFrame( this._update.bind(this) );
    }


    /**
     * Pause the game. Disable controls, open pause menu (TODO)
     */
    pause() {
        this.gameState = GameState.PAUSED;
        document.exitPointerLock();
    }

    /**
     * Unpause the game. Re-enable controls. Close pause menu (TODO)
     */
    unPause() {
        this.gameState = GameState.DEFAULT;
        document.body.requestPointerLock();
    }


    ///////////////////////////////////////////////////////////////////////////
    // Private methods                                                       //
    ///////////////////////////////////////////////////////////////////////////
    _setUpInputs() {
        this.pressedKeys = pressedKeys;
        this.heldKeys = heldKeys;
        this.releasedKeys = releasedKeys;
        this._mouseAxis = mouseAxis;
        this._mouseWheel = mouseWheel;

        this.mouseVertical = this._mouseAxis.vertical;
        this.mouseHorizontal = this._mouseAxis.horizontal;
        this.mouseWheel = this._mouseWheel.delta;
    }

    _setUpEventHandlers() {
        // Set up event handlers for controls
        window.onkeyup = keyReleased;
        window.onkeydown = keyPressed;
        document.onmousemove = mouseMoved;
        document.onwheel = wheelScrolled;
    }

    _setUpScene() {
        this.renderer = new THREE.WebGLRenderer();
        this.camera = new THREE.PerspectiveCamera4D( 75, window.innerWidth / window.innerHeight, 0.1, 1000, 0.1, 1000 );
        this.renderer.setSize( window.innerWidth, window.innerHeight );
        document.body.appendChild( this.renderer.domElement );
        
        this.scene = new THREE.Scene4D();

        this.camera.position.z = 5;
        this.camera.position.w = 5;
    }

    _setUpTiming() {
        this._clock = new THREE.Clock();
        this.timeDelta = this._clock.getDelta();
        this.timeScaledSpeed = this.speed * this.timeDelta;
    }

    _setUpControls() {
        // I wish js would let me define this in one assignment statement, but oh well, here we are.
        this.controlsFunction = {}
        this.controlsFunction[GameState.DEFAULT] = mainControls;
        this.controlsFunction[GameState.PAUSED] = pausedControls;
    }

    _update() {
        this._frameSetUp();

        // This may need to move below frame teardown
        requestAnimationFrame( this._update.bind(this) );

        this.renderer.render( this.scene, this.camera );
        this.controlsFunction[this.gameState](this);
        this._frameTearDown();
    }

    _frameSetUp() {
        this.timeDelta = this._clock.getDelta();
        this.timeScaledSpeed = this.speed * this.timeDelta;

        this.mouseVertical = this._mouseAxis.vertical;
        this.mouseHorizontal = this._mouseAxis.horizontal;
        this.mouseWheel = this._mouseWheel.delta;
    }

    _frameTearDown() {
        for (var prop in this.pressedKeys) {
            if (this.pressedKeys.hasOwnProperty(prop)) {
                delete this.pressedKeys[prop];
            }
        }
        
        for (var prop in this.releasedKeys) {
            if (this.releasedKeys.hasOwnProperty(prop)) {
                delete this.releasedKeys[prop];
            }
        }
    }
}

export {GameManager}