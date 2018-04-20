"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AVLTreeSetNode_1 = require("./Nodes/AVLTreeSetNode");
class AVLTreeSet {
    constructor() {
        this.root = null;
    }
    get isEmpty() {
        return !this.root;
    }
    add(value) {
        this.root = this.root ? this.root.add(value) : new AVLTreeSetNode_1.AVLNode(value);
    }
    remove(value) {
        this.root = this.root ? this.root.remove(value) : null;
    }
    get(wanted) {
        const node = this.root ? this.root.get(wanted) : null;
        return node ? node.value : undefined;
    }
    destroy() {
        this.root = null;
    }
    includes(value) {
        return this.root ? this.root.includes(value) : false;
    }
    values() {
        return this.root.values([]);
    }
    forEach(callback) {
        return this.root.forEach(callback);
    }
    *[Symbol.iterator]() {
        if (this.root) {
            yield* this.root;
        }
    }
}
exports.AVLTreeSet = AVLTreeSet;
//# sourceMappingURL=AVLTreeSet.js.map