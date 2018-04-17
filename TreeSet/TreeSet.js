const Node = require('./AVLNode')

class TreeSet {
  constructor() {
    this.root = null
  }
  get isEmpty() {
    return !this.root
  }
  add(value) {
    this.root = this.root ? this.root.add(value) : new Node(value)
  }
  remove(value) {
    this.root = this.root ? this.root.remove(value) : null
  }
  get(value) {
    return this.root ? this.root.get(value).value : null
  }
  includes(value) {
    return this.root ? this.root.includes(value) : false
  }
  *[Symbol.iterator]() {
    if (this.root) {
			yield* this.root
		}
  }
  values() {
    return this.root.values()
  }
}

module.exports = TreeSet
