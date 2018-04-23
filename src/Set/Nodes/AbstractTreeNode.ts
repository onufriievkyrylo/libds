import { Comparable } from '../../helpers/Comparable'

export abstract class AbstractTreeNode <T extends Comparable<T>> {
  protected abstract left: AbstractTreeNode<T>
  protected abstract right: AbstractTreeNode<T>
 
  abstract add(value: T)
  abstract remove(value: T)

  value: T

  constructor(value: T) {
    this.value = value
  }

  get(value: T)
  get(comparator: (value: T) => number)
  get(wanted: any): AbstractTreeNode<T> {
    let comparation: number = 0
    if (typeof wanted === 'function') {
      comparation = wanted(this.value)
    } else {
      comparation = this.value.compareTo(wanted)
    }
    if (comparation > 0) {
      return this.left ? this.left.get(wanted) : null
    } else if (comparation < 0) {
      return this.right ? this.right.get(wanted) : null
    } else {
      return this
    }
  }
  includes(value: T): boolean {
    if (this.value.compareTo(value) > 0) {
      return this.left ? this.left.includes(value) : false
    } else if (this.value.compareTo(value) < 0) {
      return this.right ? this.right.includes(value) : false
    } else {
      return true
    }
  }
  values(values: Array<T>): Array<T> {
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
  forEach(calllback: (value: T) => void): void {
    if (this.left) {
      this.left.forEach(calllback)
    }
    calllback(this.value)
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
