import { AbstractTreeNode } from './AbstractTreeNode'
import { Comparable } from '../../helpers/Comparable'

export enum Color {
  RED, BLACK
}

export class RBTreeNode<T extends Comparable<T>> extends AbstractTreeNode<T> {
  protected left: RBTreeNode<T>
  protected right: RBTreeNode<T>
  protected parent: RBTreeNode<T>
  private color: Color
  
  constructor(value: T, parent: RBTreeNode<T> = null, color: Color = Color.BLACK) {
    super(value)
    this.parent = parent;
    this.color = color;
    this.left = null
    this.right = null
  }

  static color(node: RBTreeNode<any>): Color  {
    return node ? node.color : Color.BLACK
  }
  get grandparent(): RBTreeNode<T> {
    return this.parent ? this.parent.parent : null
  }
  get uncle(): RBTreeNode<T> {
    const grandparent = this.grandparent
    if (grandparent) {
      return this.parent.isLeftChild ? grandparent.right : grandparent.left
    } else {
      return null;
    }
  }
  get sibling(): RBTreeNode<T> {
    if (this.parent) {
      return this.isLeftChild ? this.parent.right : this.parent.left
    } else {
      return null
    }
  }
  get isLeftChild(): boolean {
    return this.parent ? this.parent.left === this : false
  }
  get isRightChild(): boolean {
    return this.parent ? this.parent.right === this : false
  }

  add(value: T): RBTreeNode<T> {
    if (this.value.compareTo(value) > 0) {
      this.left = this.left ? this.left.add(value) : new RBTreeNode(value, this, Color.RED)
      return this.fix(this.left);
    } else if (this.value.compareTo(value) < 0) {
      this.right = this.right ? this.right.add(value) : new RBTreeNode(value, this, Color.RED)
      return this.fix(this.right);
    } else {
      this.value = value
      return this
    }
  }
  remove(value: T): RBTreeNode<T> {
    // if (this.value.compareTo(value) > 0) {
    //   this.left = this.left ? this.left.remove(value) : null
    // } else if (this.value.compareTo(value) < 0) {
    //   this.right = this.right ? this.right.remove(value) : null
    // } else {
    //   if (!this.right) {
    //     return this.left
    //   }
    //   const temp: AVLTreeNode<T> = this.right.min
    //   temp.right = this.right.shift()
    //   temp.left = this.left
    //   return temp.balance()
    // }
    // return this.balance()
    return this
  }

  forEach(calllback: any, level: number = 1): void {
    if (this.left) {
      this.left.forEach(calllback, level + 1)
    }
    calllback(this, level)
    if (this.right) {
      this.right.forEach(calllback, level + 1)
    }
  }

  private fix(prev: RBTreeNode<T>): RBTreeNode<T> {
    console.log(this.value, this.color)
    if (this.color === Color.RED) {
      const sibiling = this.sibling
      if (RBTreeNode.color(sibiling) === Color.RED) {
        this.color = Color.BLACK
        sibiling.color = Color.BLACK
        this.parent.color = Color.RED
        return this
      } else if (this.right === prev) {
        if (this.isLeftChild || !this.parent) {
          return this.rotateLeft()
        } else {
          this.color = Color.BLACK
          this.parent.color = Color.RED
          return this
        }
      } else if (this.left === prev) {
        if (this.isRightChild || !this.parent) {
          console.log('!@#!@#!@#');
          return this.rotateRight()
        } else {
          this.color = Color.BLACK
          this.parent.color = Color.RED
          return this
        }
      }
    }
  }

  private balance(): RBTreeNode<T> {
    if (this.parent.color === Color.RED) {
      const uncle = this.uncle
      if (RBTreeNode.color(uncle) === Color.RED) {
        this.parent.color = Color.BLACK
        uncle.color = Color.BLACK
        this.grandparent.color = Color.RED
        // parent parent
      } else if (this.isRightChild) {
        return this.parent.isLeftChild ? this.parent.rotateLeft() : this.parent.rotateRight()
      } else {
        this.parent.color = Color.BLACK
        this.grandparent.color = Color.RED
        return this.parent.isRightChild ? this.grandparent.rotateLeft() : this.grandparent.rotateRight()
      }
    }
  }
  private rotateRight(): RBTreeNode<T> {
    const temp: RBTreeNode<T> = this.left
    this.left = temp.right
    if (temp.right) {
      temp.right.parent = this
    }
    temp.parent = this.parent
    temp.right = this
    this.parent = temp
    return temp
  }
  private rotateLeft(): RBTreeNode<T> {
    const temp: RBTreeNode<T> = this.right
    this.right = temp.left
    if (temp.left) {
      temp.left.parent = this
    }
    temp.parent = this.parent
    temp.left = this
    this.parent = temp
    return temp
  }
}
