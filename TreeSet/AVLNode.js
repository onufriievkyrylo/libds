class AVLNode {
  constructor(value) {
    this.value = value
    this.left = null
    this.right = null
    this.height = 1
  }
  static height(node) {
    return node ? node.height : 0
  }
  get isLeaf() {
    return !(this.left || this.right)
  }
  get factor() {
    return AVLNode.height(this.right) - AVLNode.height(this.left)
  }
  get min() {
    return this.left ? this.left.min : this
  }
  get max() {
    return this.right ? this.right.max : this
  }
  add(value, comparator) {
    if (comparator(this.value, value) > 0) {
      this.left = this.left ? this.left.add(value, comparator) : new AVLNode(value)
    } else if (comparator(this.value, value) < 0) {
      this.right = this.right ? this.right.add(value, comparator) : new AVLNode(value)
    } else {
      this.value = value
      return this
    }
    return this.balance()
  }
  remove(value, comparator) {
    if (comparator(this.value, value) > 0) {
      this.left = this.left ? this.left.remove(value, comparator) : null
    } else if (comparator(this.value, value) < 0) {
      this.right = this.right ? this.right.remove(value, comparator) : null
    } else {
      if (!this.right) {
        return this.left
      }
      const temp = this.right.min
      temp.right = this.right.shift()
      temp.left = this.left
      return temp.balance()
    }
    return this.balance()
  }
  get(value, comparator) {
    if (comparator(this.value, value) > 0) {
      return this.left ? this.left.get(value, comparator) : null
    } else if (comparator(this.value, value) < 0) {
      return this.right ? this.right.get(value, comparator) : null
    } else {
      return this
    }
  }
  includes(value, comparator) {
    if (comparator(this.value, value) > 0) {
      return this.left ? this.left.includes(value, comparator) : false
    } else if (comparator(this.value, value) < 0) {
      return this.right ? this.right.includes(value, comparator) : false
    } else {
      return true
    }
  }
  values(values = []) {
    if (this.left) {
			values = this.left.values(values)
		}
		values.push(this.value)
		if (this.right) {
      values = this.right.values(values)
    }
    return values
  } 
	*[Symbol.iterator]() {
    if (this.left) {
			yield* this.left
		}
		yield this.value
    if (this.right) {
			yield* this.right
		}
  }
  shift() {
    this.left = this.left ? this.left.shift() : this.right
    return this.balance()
  }
  pop() {
    this.right = this.right ? this.right.pop() : this.left
    return this.balance()
  }
  balance() {
    this.fixHeight()
    if (this.factor == 2) {
      if (this.right.factor < 0) {
        this.right = this.right.rotateRight()
      }
      return this.rotateLeft()
    }
    if (this.factor == -2) {
      if (this.left.factor > 0) {
        this.left = this.left.rotateLeft()
      }
      return this.rotateRight()
    }
    return this
  }
  fixHeight() {
    this.height = Math.max(AVLNode.height(this.right), AVLNode.height(this.left)) + 1
  }
  rotateRight() {
    const temp = this.left
    this.left = temp.right
    temp.right = this
    this.fixHeight()
    temp.fixHeight()
    return temp
  }
  rotateLeft() {
    const temp = this.right
    this.right = temp.left
    temp.left = this
    this.fixHeight()
    temp.fixHeight()
    return temp
  }
}

module.exports = AVLNode
