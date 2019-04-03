//iterable
/*
遍历Array可以采用下标循环，遍历Map和Set就无法使用下标。
为了统一集合类型，ES6标准引入了新的iterable类型，Array、Map和Set都属于iterable类型。
具有iterable类型的集合可以通过新的for ... of循环来遍历。
*/
var a = [1, 3, 2]
for (var x of a) {
  console.log(x)
}

//用for ... of循环遍历集合，用法如下
var a = ['A', 'B', 'C']
var s = new Set(['A', 'B', 'C'])
var m = new Map([[1, 'x'], [2, 'y'], [3, 'z']])
for (var x of a) {
  console.log(x)
}

for (var x of s) {
  console.log(x)
}

for (var x of m) {
  console.log(typeof(x) + ':' + x[0] + ' = ' + x[1])
}

//你可能会有疑问，for ... of循环和for ... in循环有何区别？
/* 
for ... in循环由于历史遗留问题，它遍历的实际上是对象的属性名称
一个Array数组实际上也是一个对象，它的每个元素的索引被视为一个属性
我们手动给Array对象添加了额外的属性后，for ... in循环将带来意想不到的意外效果
*/

var a = ['A', 'B', 'C']
a.name = 'Hello'
for (var x in a) {
  console.log('Tag ' , x, a[x])
}

//for ... in循环将把name包括在内，但Array的length属性却不包括在内
//for ... of循环则完全修复了这些问题，它只循环集合本身的元素
for (var x of a) {
  console.log('TagX ' , x)
}

//这就是为什么要引入新的for ... of循环
//然而，更好的方式是直接使用iterable内置的forEach方法，它接收一个函数，每次迭代就自动回调该函数。以Array为例
a.forEach(function (element, index, array) {
   console.log('tag', element + ' index =', index, array)
})

//注意，forEach()方法是ES5.1标准引入的，你需要测试浏览器是否支持
//Set与Array类似，但Set没有索引，因此回调函数的前两个参数都是元素本身
var s = new Set(['A', 'B', 'C'])
s.forEach(function (element, sameElement, set) {
  console.log('tagSet', element, sameElement, set)
})

//Map的回调函数参数依次为value、key和map本身
var m = new Map([[1, 'x'], [2, 'z'], [3, 'y']])
m.forEach(function (value, key, map) {
   console.log('tagMap', value, key, map)
})

//如果对某些参数不感兴趣，由于JavaScript的函数调用不要求参数必须一致，因此可以忽略它们。例如，只需要获得Array的element
var a = ['A', 'B', 'C']
a.forEach(function (value) {
  console.log('tagArray', value)
})