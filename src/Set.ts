import { Comparable } from './helpers/Comparable'
import { Collection } from './Collection'

export interface Set<T extends Comparable<T>> extends Collection<T> {
  get(value: T): T
  get(comparator: (value: T) => number): T
}
