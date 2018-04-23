
const {RBTreeNode} = require('./lib/Set/Nodes/RBTreeNode')

class C {
  constructor(data) {
    this.data = data
  }
  compareTo(value) {
    return this.data > value.data ? 1 : this.data < value.data ? -1 : 0
  }
}

let root = new RBTreeNode(new C(10));

console.log('#20')
root.add(new C(20))
console.log('#30')
root = root.add(new C(30))
console.log('#40')
root = root.add(new C(40))
// console.log('#4')
// root = root.add(new C(-2))

root.forEach((node, level) => {
  console.log('::'.repeat(level), node.value.data, node.color ? 'BLACK' : 'RED')
})
