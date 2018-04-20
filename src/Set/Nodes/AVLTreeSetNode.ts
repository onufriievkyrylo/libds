import { TreeSetNode } from './TreeSetNode'
import { Comparable } from '../../helpers/Comparable'

export class AVLNode<T extends Comparable<T>> extends TreeSetNode<T> {
  protected left: AVLNode<T>
  protected right: AVLNode<T>
  private height: number
  
  constructor(value: T) {
    super(value)
    this.left = null
    this.right = null
    this.height = 1
  }

  static height(node: AVLNode<any>): number  {
    return node ? node.height : 0
  }
  get factor(): number {
    return AVLNode.height(this.right) - AVLNode.height(this.left)
  }

  add(value: T): AVLNode<T> {
    if (this.value.compareTo(value) > 0) {
      this.left = this.left ? this.left.add(value) : new AVLNode(value)
    } else if (this.value.compareTo(value) < 0) {
      this.right = this.right ? this.right.add(value) : new AVLNode(value)
    } else {
      this.value = value
      return this
    }
    return this.balance()
  }
  remove(value: T): AVLNode<T> {
    if (this.value.compareTo(value) > 0) {
      this.left = this.left ? this.left.remove(value) : null
    } else if (this.value.compareTo(value) < 0) {
      this.right = this.right ? this.right.remove(value) : null
    } else {
      if (!this.right) {
        return this.left
      }
      const temp: AVLNode<T> = this.right.min
      temp.right = this.right.shift()
      temp.left = this.left
      return temp.balance()
    }
    return this.balance()
  }


  shift(): AVLNode<T>  {
    this.left = this.left ? this.left.shift() : this.right
    return this.balance()
  }
  pop(): AVLNode<T> {
    this.right = this.right ? this.right.pop() : this.left
    return this.balance()
  }

  private fixHeight(): void {
    this.height = Math.max(AVLNode.height(this.right), AVLNode.height(this.left)) + 1
  }
  private balance(): AVLNode<T> {
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
  private rotateRight(): AVLNode<T> {
    const temp = this.left
    this.left = temp.right
    temp.right = this
    this.fixHeight()
    temp.fixHeight()
    return temp
  }
  private rotateLeft(): AVLNode<T> {
    const temp = this.right
    this.right = temp.left
    temp.left = this
    this.fixHeight()
    temp.fixHeight()
    return temp
  }
}
