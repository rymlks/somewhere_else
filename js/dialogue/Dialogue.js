import { DialogueNode } from "./DialogueNode.js"

class Dialogue {
    
    /**
     * Create a new Dialogue
     * @param {DialogueNode} startNode The first DialogueNode to show when starting this Dialogue
     */
    constructor(startNode) {
        if (startNode === undefined)
            this.startNode = new DialogueNode("start", "");
        else
            this.startNode = startNode;
        this.reset();
    }

    /**
     * Set this Dialogue back to the beginning
     */
    reset() {
        this.currentNode = this.startNode;
    }
}

export { Dialogue }