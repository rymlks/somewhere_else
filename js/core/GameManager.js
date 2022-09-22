import * as THREE from "../three.js/build/three.module.js";
import { GameState } from "./GameState.js"
import { keyPressed, keyReleased, 
    pressedKeys, heldKeys, releasedKeys, 
    mousePressed, mouseReleased, mouseMoved, wheelScrolled, 
    pressedMouseButtons, heldMouseButtons, releasedMouseButtons, mouseAxis, mouseWheel } from "../controls/utils.js"
import { mainControls } from "../controls/MainControls.js"
import { pausedControls } from "../controls/PausedControls.js"
import { dialogueControls } from "../controls/DialogueControls.js"
import { editorControls } from "../controls/EditorControls.js"
import { DialogueManager } from "../dialogue/DialogueManager.js"
import { QuadScene } from "../scenes/util/QuadScene.js";

var instance = null;

class GameManager {
    #clock;
    #mouseAxis;
    #mouseWheel;
    #frameDeltas;

    #dialogueManager;

    #previousGameState;

    constructor() {
        if (instance !== null) {
            throw "Only one instance of GameManager is allowed."
        }

        this.gameState = GameState.PAUSED;
        this.#previousGameState = GameState.DEFAULT;
        this.speed = 5.0;
        this.#dialogueManager = new DialogueManager(this);

        this.#setUpInputs();
        this.#setUpEventHandlers();
        this.#setUpRenderingPipeline();
        this.#setUpTiming();
        this.#setUpControls();

        instance = this;
        
        this.renderTarget = new THREE.WebGLRenderTarget(1024, 1024);
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
        this.#setGameState(GameState.PAUSED)
    }

    /**
     * Unpause the game. Re-enable controls. Close pause menu (TODO)
     */
    unPause() {
        this.#setGameState(this.#previousGameState)
        document.body.requestPointerLock()
    }

    /**
     * Enter level editor mode.
     */
    beginEditor() {
        this.#setGameState(GameState.EDITOR);
        this.player.noCollision = true;
    }

    /**
     * Exit level editor mode.
     */
    endEditor() {
        this.#setGameState(GameState.DEFAULT);
        //this.player.noCollision = false;
    }

    /**
     * Pause the game and present text to the player.
     * @param {string} dialogue: The yarn file to begin running 
     */
    beginDialogue(dialogue) {
        this.#setGameState(GameState.DIALOGUE);
        this.#dialogueManager.beginDialogue(dialogue);
    }

    /**
     * Move dialogue ahead one node
     */
    advanceDialogue() {
        this.#dialogueManager.advanceDialogue();
    }

    /**
     * Unpause the game and hide the text box
     */
     exitDialogue() {
        this.#setGameState(GameState.DEFAULT);
        this.#dialogueManager.exitDialogue();
    }

    increaseDialogueSelection() {
        this.#dialogueManager.increaseSelection();
    }
    decreaseDialogueSelection() {
        this.#dialogueManager.decreaseSelection();
    }

    setScene(scene) {
        this.scene = scene;
        this.scene.add(this.player);
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

        this.pressedMouseButtons = pressedMouseButtons;
        this.heldMouseButtons = heldMouseButtons;
        this.releasedMouseButtons = releasedMouseButtons;

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
        document.onwheel = undefined; // sadface
        document.onmousedown = mousePressed;
        document.onmouseup = mouseReleased;

        document.addEventListener('wheel', wheelScrolled, {passive: false}); 
        window.addEventListener( 'resize', this.#resize.bind(this), false );
    }

    /**
     * Instantiate THREE.js objects to handle rendering graphics to the canvas.
     * Creates a WebGLRenderer, a PerspectiveCamera4D, and a Scene4D, and moves the camera to a default position at 0, 0, 5, 5
     */
    #setUpRenderingPipeline() {
        this.resolution = 800;
        this.renderer = new THREE.WebGLRenderer({logarithmicDepthBuffer: true, antialias: false});
        this.camera = new THREE.PerspectiveCamera4D( 75, window.innerWidth / window.innerHeight, 0.1, 1000, 0.1, 1000 );
        //this.camera = new THREE.OrthographicCamera4D();
        this.#resize();
        this.renderer.shadowMap.enabled = true
        document.body.appendChild( this.renderer.domElement );
        
        this.scene = new THREE.Scene4D();

        var playerMaterial = new THREE.MeshBasicMaterial( { color: 0xffffff, transparent: true, opacity: 0 } );
        var playerGeometry = new THREE.GlomeCapsuleGeometry4D( );
        this.player = new THREE.PhysicsMesh4D(playerGeometry, playerMaterial);
        this.camera.position.y = 1;
        this.camera.position.w = 0.2;
        this.player.isAffectedByGravity = false;
        this.player.renderLayer = -1;
        this.player.add(this.camera);

        this.player.position.z = -5;
        this.player.position.w = 1.2;
        this.scene.add(this.player);

        this.quadScene = new QuadScene();
        this.quadCamera = new THREE.OrthographicCamera4D( -50, 50 ,50, -50, -1000, 1000 );
        this.quadCamera.position.z = 100;

        document.body.requestPointerLock = document.body.requestPointerLock ||
             element.mozRequestPointerLock ||
             element.webkitRequestPointerLock;

        document.body.requestPointerLock();
    }

    /**
     * Set up internal clock and properties to hold the time between frames
     */
    #setUpTiming() {
        this.#clock = new THREE.Clock();
        this.timeDelta = this.#clock.getDelta();
        this.timeScaledSpeed = this.speed * this.timeDelta;

        this.#frameDeltas = [];
        this.FPSBufferSize = 10;
        this.framesPerSecond = 0;
        this.secondsPerFrame = Infinity;
        this.maxSecondsPerFrame = Infinity;
    }

    /**
     * Set up references to functions that will handle inputs given the current GameState.
     */
    #setUpControls() {
        // I wish js would let me define this in one assignment statement, but oh well, here we are.
        this.controlsFunction = {}
        this.controlsFunction[GameState.DEFAULT] = mainControls;
        this.controlsFunction[GameState.PAUSED] = pausedControls;
        this.controlsFunction[GameState.DIALOGUE] = dialogueControls;
        this.controlsFunction[GameState.EDITOR] = editorControls;
    }

    ///////////////////////////////////////////////////////////////////////////
    // Utils                                                                 //
    ///////////////////////////////////////////////////////////////////////////

    /**
     * Update the game state. Take actions on state change if necessary
     * 
     * @param {GameState} gameState The state to set the game to
     */
    #setGameState(gameState) {
        switch(gameState) {
            case GameState.PAUSED:
                // pass
            case GameState.DIALOGUE:
                document.exitPointerLock();
                break;
            case GameState.EDITOR:
                // pass
            case GameState.DEFAULT:
                document.body.requestPointerLock();
                break;
            default:
                throw "Illegal game state reached: " + gameState;
        }
        this.#previousGameState = this.gameState;
        this.gameState = gameState;
    }

    /**
     * Destroy every property in an object
     * @param {*} object 
     */
    #clearObject(object) {
        for (var prop in object) {
            if (object.hasOwnProperty(prop)) {
                delete object[prop];
            }
        }
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
        this.#updateDialogue();
        //this.scene.light.shadow.camera = this.camera.clone();
        
        var oldrendertarget = this.renderer.getRenderTarget();
        this.renderer.setRenderTarget(this.renderTarget);
        this.renderer.render( this.scene, this.scene.light.shadow.camera );
        this.renderer.setRenderTarget(oldrendertarget);
        
        this.scene.quadMaterial.uniforms.map.value = this.renderTarget.texture;
        //this.scene.quadMaterial.uniforms.map.value = this.scene.light.shadow.map.texture;

        this.renderer.render( this.scene, this.camera );

        //this.renderer.render( this.quadScene, this.quadCamera );

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
        if (this.#frameDeltas.length > this.FPSBufferSize) {
            this.#frameDeltas.shift();
        }
        // Divide number of frames by the sum of the length of each frame to get frames per second
        this.framesPerSecond = this.#frameDeltas.length / this.#frameDeltas.reduce(function(a, b){ return a + b; }, 0);
        this.secondsPerFrame = 1 / this.framesPerSecond;
        this.maxSecondsPerFrame = this.#frameDeltas.reduce(function(a, b){ return Math.max(a, b); }, 0);

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
        this.#clearObject(this.pressedKeys);
        
        // Clear KeyUp handles
        this.#clearObject(this.releasedKeys);

        // Clear MouseDown handles
        this.#clearObject(this.pressedMouseButtons);
        
        // Clear MouseUp handles
        this.#clearObject(this.releasedMouseButtons);
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
                child.update(this.timeDelta, this.scene, this);
            }
        }
    }

    /**
     * Advance dialogue rendering for this frame
     */
    #updateDialogue() {
        this.#dialogueManager.update(this.timeDelta);
    }

    /**
     * Resize the game window
     */
     #resize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();

        var maxDim = Math.max(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(this.resolution / maxDim);
        this.renderer.setSize( window.innerWidth, window.innerHeight );
        this.#dialogueManager.resize();
    }
}

export {GameManager, instance as GM}