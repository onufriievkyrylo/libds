"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AbstractTreeNode_1 = require("./AbstractTreeNode");
class AVLTreeNode extends AbstractTreeNode_1.AbstractTreeNode {
    constructor(key, value) {
        super(key, value);
        this.left = null;
        this.right = null;
        this.height = 1;
    }
    static height(node) {
        return node ? node.height : 0;
    }
    get factor() {
        return AVLTreeNode.height(this.right) - AVLTreeNode.height(this.left);
    }
    add(key, value) {
        if (this.key.compareTo(key) > 0) {
            this.left = this.left ? this.left.add(key, value) : new AVLTreeNode(key, value);
        }
        else if (this.key.compareTo(key) < 0) {
            this.right = this.right ? this.right.add(key, value) : new AVLTreeNode(key, value);
        }
        else {
            this.value = value;
            return this;
        }
        return this.balance();
    }
    remove(key) {
        if (this.key.compareTo(key) > 0) {
            this.left = this.left ? this.left.remove(key) : null;
        }
        else if (this.key.compareTo(key) < 0) {
            this.right = this.right ? this.right.remove(key) : null;
        }
        else {
            if (!this.right) {
                return this.left;
            }
            const temp = this.right.min;
            temp.right = this.right.shift();
            temp.left = this.left;
            return temp.balance();
        }
        return this.balance();
    }
    shift() {
        this.left = this.left ? this.left.shift() : this.right;
        return this.balance();
    }
    pop() {
        this.right = this.right ? this.right.pop() : this.left;
        return this.balance();
    }
    fixHeight() {
        this.height = Math.max(AVLTreeNode.height(this.right), AVLTreeNode.height(this.left)) + 1;
    }
    balance() {
        this.fixHeight();
        if (this.factor == 2) {
            if (this.right.factor < 0) {
                this.right = this.right.rotateRight();
            }
            return this.rotateLeft();
        }
        if (this.factor == -2) {
            if (this.left.factor > 0) {
                this.left = this.left.rotateLeft();
            }
            return this.rotateRight();
        }
        return this;
    }
    rotateRight() {
        const temp = this.left;
        this.left = temp.right;
        temp.right = this;
        this.fixHeight();
        temp.fixHeight();
        return temp;
    }
    rotateLeft() {
        const temp = this.right;
        this.right = temp.left;
        temp.left = this;
        this.fixHeight();
        temp.fixHeight();
        return temp;
    }
}
exports.AVLTreeNode = AVLTreeNode;
//# sourceMappingURL=AVLTreeNode.js.map