const Node = require('./AVLNode')

class TreeSet {
  constructor(comparator) {
    if (!(comparator instanceof Function)) {
      throw TypeError('Comparator function expected');
    }
    this.comparator = comparator
    this.root = null
  }
  get isEmpty() {
    return !this.root
  }
  add(value) {
    this.root = this.root ? this.root.add(value, this.comparator) : new Node(value)
  }
  remove(value) {
    this.root = this.root ? this.root.remove(value, this.comparator) : null
  }
  get(value) {
    if (!(value instanceof Object)) {
      throw TypeError('Object expected');
    }
    const node = this.root ? this.root.get(value, this.comparator) : null
    return node ? node.value : undefined
  }
  includes(value) {
    return this.root ? this.root.includes(value, this.comparator) : false
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
