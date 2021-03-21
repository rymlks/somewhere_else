import * as THREE from "../three.js/src/Three.js";
import { GameState } from "./GameState.js"
import { keyPressed, keyReleased, mouseMoved, wheelScrolled, onWindowResize, pressedKeys, heldKeys, releasedKeys, mouseAxis, mouseWheel } from "../controls/utils.js"
import { mainControls } from "../controls/MainControls.js"
import { pausedControls } from "../controls/PausedControls.js"

var instance = null;

class GameManager {
    #clock;
    #mouseAxis;
    #mouseWheel;
    #frameDeltas;

    constructor() {
        if (instance !== null) {
            throw "Only one instance of GameManager is allowed."
        }

        this.gameState = GameState.DEFAULT;
        this.speed = 5.0;

        this.#setUpInputs();
        this.#setUpEventHandlers();
        this.#setUpRenderingPipeline();
        this.#setUpTiming();
        this.#setUpControls();

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
        requestAnimationFrame( this.#update.bind(this) );
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
    // Initialization methods                                                //
    ///////////////////////////////////////////////////////////////////////////

    /**
     * Set up properties for handling user input (mouse, keyboard, etc.)
     */
    #setUpInputs() {
        this.pressedKeys = pressedKeys;
        this.heldKeys = heldKeys;
        this.releasedKeys = releasedKeys;
        this.#mouseAxis = mouseAxis;
        this.#mouseWheel = mouseWheel;

        this.mouseVertical = this.#mouseAxis.vertical;
        this.mouseHorizontal = this.#mouseAxis.horizontal;
        this.mouseWheel = this.#mouseWheel.delta;
    }

    /**
     * Attach event handler methods to the window to update input properties each time an input event is dispatched.
     */
    #setUpEventHandlers() {
        // Set up event handlers for controls
        window.onkeyup = keyReleased;
        window.onkeydown = keyPressed;
        document.onmousemove = mouseMoved;
        document.onwheel = wheelScrolled;
        
        // Resize canvas on window resize
        function updateWindow() {
            onWindowResize(instance);
        }
        window.addEventListener( 'resize', updateWindow, false );
    }

    /**
     * Instantiate THREE.js objects to handle rendering graphics to the canvas.
     * Creates a WebGLRenderer, a PerspectiveCamera4D, and a Scene4D, and moves the camera to a default position at 0, 0, 5, 5
     */
    #setUpRenderingPipeline() {
        this.renderer = new THREE.WebGLRenderer();
        this.camera = new THREE.PerspectiveCamera4D( 75, window.innerWidth / window.innerHeight, 0.1, 1000, 0.1, 1000 );
        this.renderer.setSize( window.innerWidth, window.innerHeight );
        document.body.appendChild( this.renderer.domElement );
        
        this.scene = new THREE.Scene4D();

        this.camera.position.z = 5;
        //this.camera.position.w = 5;
    }

    /**
     * Set up internal clock and properties to hold the time between frames
     */
    #setUpTiming() {
        this.#clock = new THREE.Clock();
        this.timeDelta = this.#clock.getDelta();
        this.timeScaledSpeed = this.speed * this.timeDelta;

        this.#frameDeltas = [];
        this.framesPerSecond = 0;
    }

    /**
     * Set up references to functions that will handle inputs given the current GameState.
     */
    #setUpControls() {
        // I wish js would let me define this in one assignment statement, but oh well, here we are.
        this.controlsFunction = {}
        this.controlsFunction[GameState.DEFAULT] = mainControls;
        this.controlsFunction[GameState.PAUSED] = pausedControls;
    }


    ///////////////////////////////////////////////////////////////////////////
    // Game loop methods                                                     //
    ///////////////////////////////////////////////////////////////////////////

    /**
     * Main loop.
     * 
     * This method will be called once per frame; rendering the scene, handling inputs, and updating physics objects each time.
     */
    #update() {
        this.#frameSetUp();

        // This may need to move below frame teardown
        requestAnimationFrame( this.#update.bind(this) );

        this.#updatePhysicsObjects();
        this.renderer.render( this.scene, this.camera );
        this.controlsFunction[this.gameState](this);
        this.#frameTearDown();
    }

    /**
     * Update properties to be used by various methods this frame.
     */
    #frameSetUp() {
        // Set up frame timing data
        this.timeDelta = this.#clock.getDelta();
        this.timeScaledSpeed = this.speed * this.timeDelta;

        this.#frameDeltas.push(this.timeDelta);
        if (this.#frameDeltas.length > 10) {
            this.#frameDeltas.shift();
        }
        // Divide number of frames by the sum of the length of each frame to get frames per second
        this.framesPerSecond = this.#frameDeltas.length / this.#frameDeltas.reduce(function(a, b){ return a + b; }, 0);

        // Consume mouse movement events
        this.mouseVertical = this.#mouseAxis.vertical;
        this.mouseHorizontal = this.#mouseAxis.horizontal;
        this.mouseWheel = this.#mouseWheel.delta;
    }

    /**
     * Clear any unused properties that should not persist between frames.
     */
    #frameTearDown() {
        // Clear KeyDown handles
        for (var prop in this.pressedKeys) {
            if (this.pressedKeys.hasOwnProperty(prop)) {
                delete this.pressedKeys[prop];
            }
        }
        
        // Clear KeyUp handles
        for (var prop in this.releasedKeys) {
            if (this.releasedKeys.hasOwnProperty(prop)) {
                delete this.releasedKeys[prop];
            }
        }
    }

    /**
     * Apply physics simulation to every physics object in the scene.
     */
    #updatePhysicsObjects() {
        // Do not apply physics when paused
        if (this.gameState === GameState.PAUSED) return;

        // Early update - re-compute collision boxes.
        for (var child of this.scene.children) {
            if (child.isPhysicsObject === true) {
                child.preUpdate();
            }
        }

        // Update - perform collision detection and apply movement.
        for (var child of this.scene.children) {
            if (child.isPhysicsObject === true) {
                child.update(this.timeDelta, this.scene);
            }
        }
    }
}

export {GameManager}