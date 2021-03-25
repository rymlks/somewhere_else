//import { dialogueControls } from "../controls/DialogueControls.js";
import { DialogueNode } from "./DialogueNode.js";

class DialogueManager {

    #currentDialogue;
    #nodeProgress;
    #timeSinceLastUpdate;
    
    #overlayElement;
    #textElement;

    #buttons;

    constructor() {
        this.#buttons = [];
        this.refreshSeconds = 0.1;
        this.#currentDialogue = undefined;
        this.#resetNodeProgress();
        this.#setUpDOMElements();
    }

    /**
     * Present text to the player.
     * @param {Dialogue} dialogue: The dialogue to begin showing 
     */
    beginDialogue(dialogue) {
        this.#currentDialogue = dialogue;
        this.#currentDialogue.reset();
        this.#resetNodeProgress();
        this.#showDialogueNode(this.#currentDialogue.currentNode);
    }

    /**
     * Hide the text box
     */
    exitDialogue() {
        this.#textElement.innerHTML = "";
        this.#currentDialogue = undefined;
        this.#resetNodeProgress();
        this.#hide();
    }

    /**
     * Advance one frame of animation.
     */
    update(timedelta) {
        // Don't update if there's no dialogue
        if (this.#currentDialogue === undefined)  return;

        // Update at a fixed rate
        this.#timeSinceLastUpdate += timedelta;
        if (this.#timeSinceLastUpdate < this.refreshSeconds)  return;
        // CBA to try and play multiple frames if timedelta > this.refreshSeconds. 
        // If it's lagging that bad we have worse problems.
        this.#timeSinceLastUpdate = this.#timeSinceLastUpdate % this.refreshSeconds;

        // Advance text progress and show text
        this.#nodeProgress = Math.min(this.#nodeProgress + 1, this.#currentDialogue.currentNode.text.length);
        this.#updateText(this.#currentDialogue.currentNode);
        if (this.#nodeProgress >= this.#currentDialogue.currentNode.text.length) {
            this.#showButtons();
        }
    }

    /**
     * Present text to the player.
     * @param {DialogueNode} node: The DialogueNode to render to the screen.
     */
    #showDialogueNode(node) {
        this.#updateText(node);
        this.#updateButtons(node);
        this.#hideButtons();
        this.#show();
    }

    /**
     * Make the dialogue box visible
     */
    #show() {
        this.#overlayElement.style.display = "flex";
    }

    /**
     * Make the dialogue box visible
     */
    #hide() {
        this.#overlayElement.style.display = "none";
    }

    /**
     * Set the progress of text back to the beginning of the node
     */
    #resetNodeProgress() {
        this.#nodeProgress = 1;
        this.#timeSinceLastUpdate = 0;
    }

    /**
     * Update the currently showing text
     * @param {DialogueNode} node The DialogueNode to show on screen
     */
    #updateText(node) {
        var text = node.text;
        text = text.substr(0, this.#nodeProgress).replace(/\n/g, "<br />\n");
        this.#textElement.innerHTML = text;
    }

    /**
     * Update the options available to the user
     * @param {DialogueNode} node The node to get button info from
     */
    #updateButtons(node) {
        // Remove the old buttons
        for (var button of this.#buttons) {
            button.parentNode.removeChild(button);
        }
        
        this.#buttons = [];

        // Make new buttons
        for (const [key, value] of Object.entries(node.nextNodes)) {
            var button = document.createElement("button");
            button.className = "dialogueButton";
            button.innerHTML = key;

            this.#overlayElement.appendChild(button);
            this.#buttons.push(button);
        }

        // If no buttons, make an exit button
        if (this.#buttons.length === 0) {
            var button = document.createElement("button");
            button.className = "dialogueButton";
            button.innerHTML = "Goodbye."

            this.#overlayElement.appendChild(button);
            this.#buttons.push(button);
        }
    }

    #showButtons() {
        for (var button of this.#buttons) {
            button.style.display = "block";
        }
    }

    #hideButtons() {
        for (var button of this.#buttons) {
            button.style.display = "none";
        }
    }

    /**
     * Create necessary objects for showing DOM text
     */
     #setUpDOMElements() {
        this.#overlayElement = document.createElement("div");
        this.#overlayElement.className = "overlay";
        this.#overlayElement.id = "textOverlay";
        this.#overlayElement.style.display = "none";

        this.#textElement = document.createElement("div");
        this.#textElement.id = "textOverlayContents";
        this.#textElement.innerHTML = "text overlay";

        this.#overlayElement.appendChild(this.#textElement);
        document.body.appendChild(this.#overlayElement);
    }
}

export { DialogueManager }