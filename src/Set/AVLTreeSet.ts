import { Comparable } from '../helpers/Comparable'
import { Set } from '../Set'
import { AVLTreeNode as Node } from './Nodes/AVLTreeNode'


export class AVLTreeSet<T extends Comparable<T>> implements Set<T> {
  private root: Node<T>

  constructor() {
    this.root = null
  }
  get isEmpty(): boolean {
    return !this.root
  }
  add(value: T): void {
    this.root = this.root ? this.root.add(value) : new Node(value)
  }
  remove(value: T): void {
    this.root = this.root ? this.root.remove(value) : null
  }
  get(wanted: any): T {
    const node = this.root ? this.root.get(wanted) : null
    return node ? node.value : undefined
  }
  destroy(): void {
    this.root = null
  }
  includes(value: T): boolean {
    return this.root ? this.root.includes(value) : false
  }
  values(): Array<T> {
    return this.root.values([])
  }
  forEach(callback: (value: T) => void): void {
    return this.root.forEach(callback)
  }
  *[Symbol.iterator](): Iterator<T> {
    if (this.root) {
      yield* this.root
    }
  }
}

