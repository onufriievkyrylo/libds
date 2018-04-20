export interface Collection<T> {
  readonly isEmpty: boolean

  add(value: T): void
  remove(value: T): void
  destroy(): void
  includes(value: T): boolean
  values(): Array<T>
  forEach(callback: (value: T) => void): void
  [Symbol.iterator](): Iterator<T>
}
