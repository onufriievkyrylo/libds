import { Comparable } from '../../helpers/Comparable'

export abstract class AbstractTreeNode <K extends Comparable<K>, V> {
  protected abstract left: AbstractTreeNode<K, V>
  protected abstract right: AbstractTreeNode<K, V>
 
  abstract add(key: K, value: V)
  abstract remove(key: K)

  key: K
  value: V

  constructor(key: K, value: V) {
    this.key = key
    this.value = value
  }

  get(key: K)
  get(comparator: (key: K) => number)
  get(wanted: any): AbstractTreeNode<K, V> {
    let comparation: number = 0
    if (typeof wanted === 'function') {
      comparation = wanted(this.key)
    } else {
      comparation = this.key.compareTo(wanted)
    }
    if (comparation > 0) {
      return this.left ? this.left.get(wanted) : null
    } else if (comparation < 0) {
      return this.right ? this.right.get(wanted) : null
    } else {
      return this
    }
  }
  includes(key: K): boolean {
    if (this.key.compareTo(key) > 0) {
      return this.left ? this.left.includes(key) : false
    } else if (this.key.compareTo(key) < 0) {
      return this.right ? this.right.includes(key) : false
    } else {
      return true
    }
  }
  keys(keys: Array<K>): Array<K> {
    if (this.left) {
      keys = this.left.keys(keys)
    }
    keys.push(this.key)
    if (this.right) {
      keys = this.right.keys(keys)
    }
    return keys
  }
  values(values: Array<V>): Array<V> {
    if (this.left) {
      values = this.left.values(values)
    }
    values.push(this.value)
    if (this.right) {
      values = this.right.values(values)
    }
    return values
  }

  get isLeaf(): boolean {
    return !(this.left || this.right)
  }
  get min() {
    return this.left ? this.left.min : this
  }
  get max() {
    return this.right ? this.right.max : this
  }
  forEach(calllback: (key: K, value: V) => void): void {
    if (this.left) {
      this.left.forEach(calllback)
    }
    calllback(this.key, this.value)
    if (this.right) {
      this.right.forEach(calllback)
    }
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

}
