import { AbstractTreeNode } from './AbstractTreeNode'
import { Comparable } from '../../helpers/Comparable'

export class AVLTreeNode<T extends Comparable<T>> extends AbstractTreeNode<T> {
  protected left: AVLTreeNode<T>
  protected right: AVLTreeNode<T>
  private height: number
  
  constructor(value: T) {
    super(value)
    this.left = null
    this.right = null
    this.height = 1
  }

  static height(node: AVLTreeNode<any>): number  {
    return node ? node.height : 0
  }
  get factor(): number {
    return AVLTreeNode.height(this.right) - AVLTreeNode.height(this.left)
  }

  add(value: T): AVLTreeNode<T> {
    if (this.value.compareTo(value) > 0) {
      this.left = this.left ? this.left.add(value) : new AVLTreeNode(value)
    } else if (this.value.compareTo(value) < 0) {
      this.right = this.right ? this.right.add(value) : new AVLTreeNode(value)
    } else {
      this.value = value
      return this
    }
    return this.balance()
  }
  remove(value: T): AVLTreeNode<T> {
    if (this.value.compareTo(value) > 0) {
      this.left = this.left ? this.left.remove(value) : null
    } else if (this.value.compareTo(value) < 0) {
      this.right = this.right ? this.right.remove(value) : null
    } else {
      if (!this.right) {
        return this.left
      }
      const temp: AVLTreeNode<T> = this.right.min
      temp.right = this.right.shift()
      temp.left = this.left
      return temp.balance()
    }
    return this.balance()
  }


  shift(): AVLTreeNode<T>  {
    this.left = this.left ? this.left.shift() : this.right
    return this.balance()
  }
  pop(): AVLTreeNode<T> {
    this.right = this.right ? this.right.pop() : this.left
    return this.balance()
  }

  private fixHeight(): void {
    this.height = Math.max(AVLTreeNode.height(this.right), AVLTreeNode.height(this.left)) + 1
  }
  private balance(): AVLTreeNode<T> {
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
  private rotateRight(): AVLTreeNode<T> {
    const temp = this.left
    this.left = temp.right
    temp.right = this
    this.fixHeight()
    temp.fixHeight()
    return temp
  }
  private rotateLeft(): AVLTreeNode<T> {
    const temp = this.right
    this.right = temp.left
    temp.left = this
    this.fixHeight()
    temp.fixHeight()
    return temp
  }
}
