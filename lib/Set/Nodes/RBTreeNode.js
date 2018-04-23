"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AbstractTreeNode_1 = require("./AbstractTreeNode");
var Color;
(function (Color) {
    Color[Color["RED"] = 0] = "RED";
    Color[Color["BLACK"] = 1] = "BLACK";
})(Color = exports.Color || (exports.Color = {}));
class RBTreeNode extends AbstractTreeNode_1.AbstractTreeNode {
    constructor(value, parent = null, color = Color.BLACK) {
        super(value);
        this.parent = parent;
        this.color = color;
        this.left = null;
        this.right = null;
    }
    static color(node) {
        return node ? node.color : Color.BLACK;
    }
    get grandparent() {
        return this.parent ? this.parent.parent : null;
    }
    get uncle() {
        const grandparent = this.grandparent;
        if (grandparent) {
            return this.parent.isLeftChild ? grandparent.right : grandparent.left;
        }
        else {
            return null;
        }
    }
    get sibling() {
        if (this.parent) {
            return this.isLeftChild ? this.parent.right : this.parent.left;
        }
        else {
            return null;
        }
    }
    get isLeftChild() {
        return this.parent ? this.parent.left === this : false;
    }
    get isRightChild() {
        return this.parent ? this.parent.right === this : false;
    }
    add(value) {
        if (this.value.compareTo(value) > 0) {
            this.left = this.left ? this.left.add(value) : new RBTreeNode(value, this, Color.RED);
            return this.fix(this.left);
        }
        else if (this.value.compareTo(value) < 0) {
            this.right = this.right ? this.right.add(value) : new RBTreeNode(value, this, Color.RED);
            return this.fix(this.right);
        }
        else {
            this.value = value;
            return this;
        }
    }
    remove(value) {
        return this;
    }
    forEach(calllback, level = 1) {
        if (this.left) {
            this.left.forEach(calllback, level + 1);
        }
        calllback(this, level);
        if (this.right) {
            this.right.forEach(calllback, level + 1);
        }
    }
    fix(prev) {
        console.log(this.value, this.color);
        if (this.color === Color.RED) {
            const sibiling = this.sibling;
            if (RBTreeNode.color(sibiling) === Color.RED) {
                console.log('just recoloring')
                this.color = Color.BLACK;
                sibiling.color = Color.BLACK;
                this.parent.color = Color.RED;
                return this;
            }
            else if (this.right === prev) {
                if (this.isLeftChild || (!this.parent && prev.color === Color.RED)) {
                    console.log('this.isLeftChild || !this.parent');
                    return this.rotateLeft();
                }
                else {
                    console.log('recolor1');
                    this.color = Color.BLACK;
                    this.parent.color = Color.RED;
                    return this;
                }
            }
            else if (this.left === prev) {
                if (this.isRightChild || (!this.parent && prev.color === Color.RED)) {
                    console.log('this.isRightChild || !this.parent');
                    return this.rotateRight();
                }
                else {
                    console.log('recolor 2');
                    this.color = Color.BLACK;
                    this.parent.color = Color.RED;
                    return this;
                }
            }
        }
    }
    balance() {
        if (this.parent.color === Color.RED) {
            const uncle = this.uncle;
            if (RBTreeNode.color(uncle) === Color.RED) {
                this.parent.color = Color.BLACK;
                uncle.color = Color.BLACK;
                this.grandparent.color = Color.RED;
            }
            else if (this.isRightChild) {
                return this.parent.isLeftChild ? this.parent.rotateLeft() : this.parent.rotateRight();
            }
            else {
                this.parent.color = Color.BLACK;
                this.grandparent.color = Color.RED;
                return this.parent.isRightChild ? this.grandparent.rotateLeft() : this.grandparent.rotateRight();
            }
        }
    }
    rotateRight() {
        const temp = this.left;
        this.left = temp.right;
        if (temp.right) {
            temp.right.parent = this;
        }
        temp.parent = this.parent;
        temp.right = this;
        this.parent = temp;
        return temp;
    }
    rotateLeft() {
        const temp = this.right;
        this.right = temp.left;
        if (temp.left) {
            temp.left.parent = this;
        }
        temp.parent = this.parent;
        temp.left = this;
        this.parent = temp;
        return temp;
    }
}
exports.RBTreeNode = RBTreeNode;
//# sourceMappingURL=RBTreeNode.js.map
