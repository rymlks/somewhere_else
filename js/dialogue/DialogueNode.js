

class DialogueNode {
    /**
     * Constructor for new DialogueNodes
     * @param {string} text Text to render when this node in the Dialogue has been reached
     */
    constructor(name, text, enabled=true) {
        this.name = name;
        this.text = text;
        this.enabled = enabled;
        this.nextNodes = {};
    }

    /**
     * Add a transition from this DialogueNode to another DialogueNode.
     * @param {DialogueNode} node The next block of dialogue to show when this option is selected
     * @param {string} option The text to show on the button that will advance dialogue to the given node.
     */
    addNode(node, option) {
        this.nextNodes[option] = node;
    }

    /**
     * Remove a DialogueNode from this DialogueNode
     * @param {string} name The name of the Node to be removed from this DialogueNode
     */
    removeNode(name) {

    }
}

export { DialogueNode }