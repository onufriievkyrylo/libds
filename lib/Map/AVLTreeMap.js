"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AVLTreeNode_1 = require("./Nodes/AVLTreeNode");
class AVLTreeMap {
    constructor() {
        this.root = null;
    }
    get isEmpty() {
        return !this.root;
    }
    add(key, value) {
        this.root = this.root ? this.root.add(key, value) : new AVLTreeNode_1.AVLTreeNode(key, value);
    }
    remove(key) {
        this.root = this.root ? this.root.remove(key) : null;
    }
    get(wanted) {
        const node = this.root ? this.root.get(wanted) : null;
        return node ? node.value : undefined;
    }
    destroy() {
        this.root = null;
    }
    includes(key) {
        return this.root ? this.root.includes(key) : false;
    }
    keys() {
        return this.root.keys([]);
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
exports.AVLTreeMap = AVLTreeMap;
//# sourceMappingURL=AVLTreeMap.js.map