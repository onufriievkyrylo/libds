"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class TreeSetNode {
    constructor(value) {
        this.value = value;
    }
    get(wanted) {
        let comparation = 0;
        if (typeof wanted === 'function') {
            comparation = wanted(this.value);
        }
        else {
            comparation = this.value.compareTo(wanted);
        }
        if (comparation > 0) {
            return this.left ? this.left.get(wanted) : null;
        }
        else if (comparation < 0) {
            return this.right ? this.right.get(wanted) : null;
        }
        else {
            return this;
        }
    }
    includes(value) {
        if (this.value.compareTo(value) > 0) {
            return this.left ? this.left.includes(value) : false;
        }
        else if (this.value.compareTo(value) < 0) {
            return this.right ? this.right.includes(value) : false;
        }
        else {
            return true;
        }
    }
    values(values) {
        if (this.left) {
            values = this.left.values(values);
        }
        values.push(this.value);
        if (this.right) {
            values = this.right.values(values);
        }
        return values;
    }
    get isLeaf() {
        return !(this.left || this.right);
    }
    get min() {
        return this.left ? this.left.min : this;
    }
    get max() {
        return this.right ? this.right.max : this;
    }
    forEach(calllback) {
        if (this.left) {
            this.left.forEach(calllback);
        }
        calllback(this.value);
        if (this.right) {
            this.right.forEach(calllback);
        }
    }
    *[Symbol.iterator]() {
        if (this.left) {
            yield* this.left;
        }
        yield this.value;
        if (this.right) {
            yield* this.right;
        }
    }
}
exports.TreeSetNode = TreeSetNode;
//# sourceMappingURL=TreeSetNode.js.map