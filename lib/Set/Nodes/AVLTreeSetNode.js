"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TreeSetNode_1 = require("./TreeSetNode");
class AVLNode extends TreeSetNode_1.TreeSetNode {
    constructor(value) {
        super(value);
        this.left = null;
        this.right = null;
        this.height = 1;
    }
    static height(node) {
        return node ? node.height : 0;
    }
    get factor() {
        return AVLNode.height(this.right) - AVLNode.height(this.left);
    }
    add(value) {
        if (this.value.compareTo(value) > 0) {
            this.left = this.left ? this.left.add(value) : new AVLNode(value);
        }
        else if (this.value.compareTo(value) < 0) {
            this.right = this.right ? this.right.add(value) : new AVLNode(value);
        }
        else {
            this.value = value;
            return this;
        }
        return this.balance();
    }
    remove(value) {
        if (this.value.compareTo(value) > 0) {
            this.left = this.left ? this.left.remove(value) : null;
        }
        else if (this.value.compareTo(value) < 0) {
            this.right = this.right ? this.right.remove(value) : null;
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
        this.height = Math.max(AVLNode.height(this.right), AVLNode.height(this.left)) + 1;
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
exports.AVLNode = AVLNode;
//# sourceMappingURL=AVLTreeSetNode.js.map