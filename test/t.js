var a = [{
  id: 1,
  children: [{
    id: 2
  }, {
    id: 3
  }]
}, {}]

function recursiveTraverse(node, action) {
  if (node instanceof Array && node.length != 0) {
    node.forEach(function (item, index) {
      recursiveTraverse(item, action)
    })
  }
  action(node)
  if (!node || !node.children) {
    return
  }
  node.children.forEach(function (item, index) {
    recursiveTraverse(item, action)
  })
}

recursiveTraverse(a, e => {
  e.id = 'www';
})

console.log(JSON.stringify(a, null, 2));
