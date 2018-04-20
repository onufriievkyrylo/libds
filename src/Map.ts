import { Comparable } from './helpers/Comparable'

export interface Map<K extends Comparable<K>, V> {
  readonly isEmpty: boolean

  get(key: K): V
  get(comparator: (key: K) => number): V
  add(key: K, value: V): void
  remove(key: K): void
  destroy(): void
  includes(key: K): boolean
  keys(): Array<K>
  values(): Array<V>
  forEach(callback: (key: K, value: V) => void): void
  [Symbol.iterator](): Iterator<V>
}
