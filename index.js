const addon = require('bindings')('addon');
const TreeSet = require('./TreeSet/TreeSet')

console.time('C++ constructor')
const tree = new addon.Tree((a, b) => {
  return a.n > b.n ? 1 : a.n < b.n ? -1 : 0;
})
console.timeEnd('C++ constructor')

console.time('JS constructor')
const set = new TreeSet((a, b) => {
  return a.n > b.n ? 1 : a.n < b.n ? -1 : 0;
})
console.timeEnd('JS constructor')

const obj = {
  kharkiv: { secret: '123' }
}

let count = 200000;
console.time('JS add')
for (let i = 0 ; i < count; ++i) {
  set.add({ string: 'STRING', n: Math.random() * 1000000 })
}
console.timeEnd('JS add')

console.time('c++ add')
for (let i = 0 ; i < count; ++i) {
  tree.add({ string: 'STRING', n: Math.random() * 1000000 })
}
console.timeEnd('c++ add')

let f = Math.random() * 1000000;

console.time('C++ get')
console.log(tree.get({ n: f }))
console.timeEnd('C++ get')

console.time('JS set get')
console.log(set.get({ n: f }))
console.timeEnd('JS set get')

//tree.forEach((a, level) => console.log(a, level));
