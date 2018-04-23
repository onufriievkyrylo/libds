import { Comparable } from '../helpers/Comparable'
import { Map } from '../Map'
import { AVLTreeNode as Node } from './Nodes/AVLTreeNode'


export class AVLTreeMap<K extends Comparable<K>, V> implements Map<K, V> {
  private root: Node<K, V>

  constructor() {
    this.root = null
  }
  get isEmpty(): boolean {
    return !this.root
  }
  add(key: K, value: V): void {
    this.root = this.root ? this.root.add(key, value) : new Node(key, value)
  }
  remove(key: K): void {
    this.root = this.root ? this.root.remove(key) : null
  }
  get(wanted: any): V {
    const node = this.root ? this.root.get(wanted) : null
    return node ? node.value : undefined
  }
  destroy(): void {
    this.root = null
  }
  includes(key: K): boolean {
    return this.root ? this.root.includes(key) : false
  }
  keys(): Array<K> {
    return this.root.keys([])
  }
  values(): Array<V> {
    return this.root.values([])
  }
  forEach(callback: (key: K, value: V) => void): void {
    return this.root.forEach(callback)
  }
  *[Symbol.iterator](): Iterator<V> {
    if (this.root) {
      yield* this.root
    }
  }
}

