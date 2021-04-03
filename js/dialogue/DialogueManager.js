import { DialogueMode } from "../dialogue/DialogueMode.js";
import * as THREE from "../three.js/src/Three.js";

const bondage = require('bondage');
const fs = require('fs');

class DialogueManager {

    #GM;

    #currentDialogue;
    #currentNode;
    #nextNode;
    #nodeProgress;

    #options;
    #currentOption = 0;
    
    #canvas;
    #ctx;

    #bufferCanvas;
    #bufferCtx;

    #timeSinceLastUpdate;
    #timeSinceDialogueOpen;
    #textOffset = {
        'x': 20,
        'y': 20,
    };
    #textBox = {
        'top': 10,
        'left': 10,
        'height': 100,
        'fillStyle': '#101010',
        'strokeStyle': '#955abf',
    }
    #fontLoader;
    #fonts = {};

    #worldObjects = [];

    constructor(GM) {
        this.#GM = GM;
        this.runner = new bondage.Runner();
        this.refreshSeconds = 0.1;
        this.#currentDialogue = undefined;
        this.#resetNodeProgress();
        this.#setUpDOMElements();
        this.#setUpTHREEObjects();
        this.resize();
    }

    ///////////////////////////////////////////////////////////////////////////
    // Public methods                                                        //
    ///////////////////////////////////////////////////////////////////////////

    /**
     * Present text to the player.
     * @param {Dialogue} dialogue: The dialogue to begin showing 
     */
    beginDialogue(dialogue) {
        const yarnData = JSON.parse(fs.readFileSync(dialogue));
        this.runner.load(yarnData);
        console.log(this.runner);

        this.#currentDialogue = this.runner.run('Start');
        this.#nextNode = this.#currentDialogue.next().value;
        this.advanceDialogue();
        this.#showDialogueNode(this.#currentNode);
    }

    /**
     * Hide the text box
     */
    exitDialogue() {
        this.#currentDialogue = undefined;
        this.#currentNode = undefined;
        this.#nextNode = undefined;
        this.#resetNodeProgress();
        this.#hide();
    }

    /**
     * Move to the next node in the dialogue
     */
    advanceDialogue() {
        if (this.#nextNode instanceof bondage.TextResult) {
            this.#currentNode = this.#nextNode;
            this.#resetNodeProgress();
            this.#nextNode = this.#currentDialogue.next().value;

            if (this.#nextNode instanceof bondage.OptionsResult) {
                this.#options = this.#nextNode;
                //this.#nextNode = this.#currentDialogue.next().value;
            }
        } else if (this.#nextNode instanceof bondage.OptionsResult) {
            this.#nextNode.select(this.#currentOption);
            this.#nextNode = this.#currentDialogue.next().value;
            this.advanceDialogue();
        } else if (this.#nextNode instanceof bondage.CommandResult) {
            // If the text was inside <<here>>, it will get returned as a CommandResult string, which you can use in any way you want
            console.log(`TODO: make this command work: ${this.#nextNode}`);
        } else if (this.#nextNode === undefined) {
            this.#GM.exitDialogue();
        }
    }

    /**
     * Scroll up through options.
     */
    increaseSelection() {
        if (this.#options === undefined) return;
        this.#currentOption = (this.#currentOption + 1) % this.#options.options.length;
    }

    /**
     * Scroll down through options.
     */
    decreaseSelection() {
        if (this.#options === undefined) return;
        this.#currentOption = (this.#currentOption - 1 + this.#options.options.length) % this.#options.options.length;
    }

    /**
     * Advance one frame of animation.
     */
    update(timedelta) {

        // Don't update if there's no dialogue
        if (this.#currentDialogue === undefined)  return;

        this.#bufferCtx.clearRect(0, 0, this.#bufferCanvas.width, this.#bufferCanvas.height);

        // Update text at a fixed rate
        this.#timeSinceLastUpdate += timedelta;
        this.#timeSinceDialogueOpen += timedelta;
        if (this.#timeSinceLastUpdate >= this.refreshSeconds) {
            var framespassed = Math.floor(this.#timeSinceLastUpdate / this.refreshSeconds);
            this.#timeSinceLastUpdate = this.#timeSinceLastUpdate % this.refreshSeconds;

            // Advance text progress
            this.#nodeProgress = Math.min(this.#nodeProgress + framespassed, this.#currentNode.text.length);
        }

        // Display
        this.#drawText(this.#currentNode);
        if (this.#options !== undefined && this.#nodeProgress >= this.#currentNode.text.length) {
            this.#drawOptions();
        }

        this.#render();
    }

    /**
     * update the size of the UI canvas and buffer
     */
    resize() {
        var windowWidth = window.innerWidth;
        var windowHeight = window.innerHeight;
        
        var aspect = windowHeight/windowWidth;
        var width = 500;
        var height = 500 * aspect;

        // Resizing canvas clears the buffer immediately.
        // To reduce flicker, cache the old contents to a temporary canvas.
        var tempCanvas = document.createElement('canvas');
        var tempContext = tempCanvas.getContext('2d');
        tempCanvas.width = width; 
        tempCanvas.height = height;
        tempContext.clearRect(0, 0, width, height);
        tempContext.drawImage(this.#canvas, 0, 0);

        this.#canvas.width = width;
        this.#canvas.height = height;

        this.#bufferCanvas.width = width;
        this.#bufferCanvas.height = height;

        // Redraw old contents
        this.#ctx.drawImage(tempCanvas, 0, 0);
    }

    addFont(name, font) {
        this.#fonts[name] = font;
    }

    ///////////////////////////////////////////////////////////////////////////
    // Private methods                                                       //
    ///////////////////////////////////////////////////////////////////////////

    /**
     * Present text to the player.
     * @param {} node: The DialogueNode to render to the screen.
     */
    #showDialogueNode(node) {
        this.#drawText(node);
        this.#show();
    }

    /**
     * Make the dialogue box visible
     */
    #show() {
        this.#canvas.style.display = "block";
    }

    /**
     * Make the dialogue box visible
     */
    #hide() {
        this.#canvas.style.display = "none";
        this.#ctx.clearRect(0, 0, this.#canvas.width, this.#canvas.height);

        for (var worldObject of this.#worldObjects) {
            worldObject.geometry.dispose();
            worldObject.material.dispose();
            this.#GM.scene.remove(worldObject);
        }
        this.#worldObjects = [];
    }

    /**
     * Swap buffers
     */
    #render() {
        this.#ctx.clearRect(0, 0, this.#canvas.width, this.#canvas.height);
        this.#ctx.drawImage(this.#bufferCanvas, 0, 0);
    }

    /**
     * Set the progress of text back to the beginning of the node
     */
    #resetNodeProgress() {
        this.#nodeProgress = 0;
        this.#timeSinceDialogueOpen = 0;
        this.#timeSinceLastUpdate = 0;
        
        this.#options = undefined;
        this.#currentOption = 0;
    }

    /**
     * Update the currently showing text
     * @param {} node The DialogueNode to show on screen
     */
    #drawText(node) {
        var text = node.text;
        text = text.substr(0, this.#nodeProgress);

        //if (node.mode === DialogueMode.CANVAS) {
            this.#drawTextBox();
        //}

        for (var i=0; i < text.length; i++) {
            this.#drawCharacter(text, i, DialogueMode.CANVAS);
        }
    }

    #drawTextBox() {
        this.#bufferCtx.save();
        this.#bufferCtx.beginPath();
        this.#bufferCtx.lineWidth = "6";
        this.#bufferCtx.strokeStyle = this.#textBox['strokeStyle'];
        this.#bufferCtx.fillStyle = this.#textBox['fillStyle'];
        this.#bufferCtx.rect(
            this.#textBox['left'], 
            this.#textBox['top'], 
            this.#bufferCanvas.width - 2 * this.#textBox['left'], 
            this.#textBox['height']
        );
        this.#bufferCtx.fill();
        this.#bufferCtx.stroke();
        this.#bufferCtx.restore();
    }

    #drawCharacter(text, index, mode) {
        switch(mode) {
            case 1:
                this.#drawCharacterWorld(text, index);
                break;
            case 0:
            default:
                this.#drawCharacterCanvas(text, index);
                break;
        }
    }

    #drawCharacterCanvas(text, index, flags) {
        var rotation = Math.PI * this.#timeSinceDialogueOpen;
        rotation = 0;
        this.#bufferCtx.save();

        this.#bufferCtx.font = "20px monospace";
        this.#bufferCtx.fillStyle = "white";

        var char = text[index];
        var renderedText = text.substr(0, index+1);
        var textSize = this.#bufferCtx.measureText(renderedText)
        var x = textSize.width;
        var y = textSize.actualBoundingBoxAscent;

        this.#bufferCtx.translate(this.#textOffset['x'] + Math.round(x), this.#textOffset['y'] + Math.round(y));
        this.#bufferCtx.rotate(rotation);
        this.#bufferCtx.textAlign = "center";
        this.#bufferCtx.textBaseline = "middle";
        this.#bufferCtx.fillText(char, 0, 0);
        this.#bufferCtx.restore();
    }

    #drawCharacterWorld(text, index, flags) {
        if (this.#worldObjects[index] !== undefined) return;
        var font = this.#fonts['helvetiker'];
        if (font === undefined) return;
        
        var char = text[index];

        var x;
        if (index == 0) {
            x = 0;
        }
        else {
            x = this.#worldObjects[index - 1].geometry.boundingBox.max.x + this.#worldObjects[index - 1].position.x + 0.05;
        }

        var textGeo = new THREE.TextGeometry4D(char, {font: font, size: 1, height: 0});
        textGeo.computeBoundingBox();
        if (textGeo.boundingBox.max.x == Infinity || textGeo.boundingBox.max.x == -Infinity) {
            textGeo.boundingBox.max.x = 0.5;
        }
        var textmat = new THREE.MeshBasicMaterial( { color: 0xFFFF00 } );
        var textMesh = new THREE.Mesh4D(textGeo, textmat)
        textMesh.position.x = x;
        textMesh.position.y = 0;
        textMesh.position.z = -3;
        textMesh.name = char;
        this.#GM.scene.add(textMesh);
        this.#worldObjects[index] = textMesh;
    }

    #drawOptions() {
        this.#bufferCtx.save();
        this.#bufferCtx.translate(this.#textOffset['x'], this.#textBox['height'] - this.#textOffset['y']);

        var options = this.#options.options;

        this.#bufferCtx.font = "20px monospace";
        this.#bufferCtx.fillStyle = "white";
        var textSize = this.#bufferCtx.measureText("dummy text");
        var y = textSize.actualBoundingBoxAscent;
        for (var i=0; i<options.length; i++) {
            var text = options[i];
            var prefix;
            if (i == this.#currentOption) {
                prefix = " > ";
            } else {
                prefix = "   ";
            }
            text = prefix + text;
            this.#bufferCtx.fillText(text, 0, y * i - (y * (options.length - 1)));
        }
        this.#bufferCtx.restore();
    }

    /**
     * Create necessary objects for showing DOM text
     */
     #setUpDOMElements() {
        this.#canvas = document.createElement("canvas");
        this.#canvas.className = "UICanvas";
        this.#canvas.id = "UI";
        this.#canvas.style.display = "none";
        this.#ctx = this.#canvas.getContext("2d");

        this.#bufferCanvas = document.createElement("canvas");
        this.#bufferCanvas.className = "UICanvas";
        this.#bufferCanvas.id = "UIBuffer";
        this.#bufferCanvas.style.display = "none";
        this.#bufferCtx = this.#bufferCanvas.getContext("2d");

        document.body.appendChild(this.#canvas);
        document.body.appendChild(this.#bufferCanvas);
    }

    #setUpTHREEObjects() {
        this.#fontLoader = new THREE.FontLoader();
        var instance = this;
        this.#fontLoader.load( 'assets/unlicensed/fonts/helvetiker_regular.typeface.json', function ( response ) {
            instance.addFont("helvetiker", response);
        } );
    }

}

export { DialogueManager }