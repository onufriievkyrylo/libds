import { AbstractTreeNode } from './AbstractTreeNode'
import { Comparable } from '../../helpers/Comparable'

export class AVLTreeNode<K extends Comparable<K>, V> extends AbstractTreeNode<K, V> {
  protected left: AVLTreeNode<K, V>
  protected right: AVLTreeNode<K, V>
  private height: number
  
  constructor(key: K, value: V) {
    super(key, value)
    this.left = null
    this.right = null
    this.height = 1
  }

  static height(node: AVLTreeNode<any, any>): number  {
    return node ? node.height : 0
  }
  get factor(): number {
    return AVLTreeNode.height(this.right) - AVLTreeNode.height(this.left)
  }

  add(key: K, value: V): AVLTreeNode<K, V> {
    if (this.key.compareTo(key) > 0) {
      this.left = this.left ? this.left.add(key, value) : new AVLTreeNode(key, value)
    } else if (this.key.compareTo(key) < 0) {
      this.right = this.right ? this.right.add(key, value) : new AVLTreeNode(key, value)
    } else {
      this.value = value
      return this
    }
    return this.balance()
  }
  remove(key: K): AVLTreeNode<K, V> {
    if (this.key.compareTo(key) > 0) {
      this.left = this.left ? this.left.remove(key) : null
    } else if (this.key.compareTo(key) < 0) {
      this.right = this.right ? this.right.remove(key) : null
    } else {
      if (!this.right) {
        return this.left
      }
      const temp: AVLTreeNode<K, V> = this.right.min
      temp.right = this.right.shift()
      temp.left = this.left
      return temp.balance()
    }
    return this.balance()
  }


  shift(): AVLTreeNode<K, V>  {
    this.left = this.left ? this.left.shift() : this.right
    return this.balance()
  }
  pop(): AVLTreeNode<K, V> {
    this.right = this.right ? this.right.pop() : this.left
    return this.balance()
  }

  private fixHeight(): void {
    this.height = Math.max(AVLTreeNode.height(this.right), AVLTreeNode.height(this.left)) + 1
  }
  private balance(): AVLTreeNode<K, V> {
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
  private rotateRight(): AVLTreeNode<K, V> {
    const temp = this.left
    this.left = temp.right
    temp.right = this
    this.fixHeight()
    temp.fixHeight()
    return temp
  }
  private rotateLeft(): AVLTreeNode<K, V> {
    const temp = this.right
    this.right = temp.left
    temp.left = this
    this.fixHeight()
    temp.fixHeight()
    return temp
  }
}
