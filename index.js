
const {AVLTreeSet} = require('./lib/Set')

class C {
  constructor(data) {
    this.data = data
  }
  compareTo(value) {
    return this.data > value.data ? 1 : this.data < value.data ? -1 : 0
  }
}

const tree = new AVLTreeSet();

tree.add(new C(1))
tree.add(new C(0))
tree.add(new C(4))
tree.add(new C(3))
tree.add(new C(2))

console.log(tree.get(value => value.data > 3 ? 1 : value.data < 3 ? -1 : 0))

//tree.forEach(console.log)
