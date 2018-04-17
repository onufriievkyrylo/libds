const addon = require('bindings')('addon');

console.time('C++ constructor')
const tree = new addon.Tree((a, b) => {
  return a.n > b.n ? 1 : a.n < b.n ? -1 : 0;
})
console.timeEnd('C++ constructor')

const obj = {
  kharkiv: { secret: '123' }
}

tree.add({ city: 'Kharkiv', n: 1 })
tree.add({ city: 'Lviv', n: 4 })
tree.add({ city: 'Kyiv', n: 5 })
tree.add({ city: 'Sumy', n: 2 })
tree.add({ city: 'Rivno', n: 6 })
tree.add({ city: 'Odessa', n: 0 })
tree.add({ city: 'Poltava', n: 3 })

console.time('JS get')
console.log(obj.kharkiv)
console.timeEnd('JS get')

console.time('C++ get')
console.log(tree.get({ city: 'Sumy' }))
console.timeEnd('C++ get')

tree.forEach((a) => console.log(a));
