
//length
var arr = [1, 2, 3.14, 'Hello', null , true]
console.log(arr.length)
arr.length = 3
console.log(arr)
console.log(arr.length)
arr[0] = null
console.log(arr)
arr[10] = null
console.log(arr.length)
//indexOf
console.log(arr.indexOf(3.14))
console.log(arr.indexOf('abc'))
console.log(arr)
//slice
var temp = arr.slice(0, 3)
console.log(temp)
temp = arr.slice(3)
console.log(temp)
//push pop
console.log(arr)
arr.push('A', 'B', 'C')
console.log(arr)
arr.pop()
console.log(arr)
//unshift shift
arr.unshift('A', "B", "C")
console.log(arr)
arr.shift()
console.log(arr)
//sort
arr.sort()
console.log(arr)
//reverse
arr.reverse()
console.log(arr)
//splice
//splice()方法是修改Array的“万能方法”，它可以从指定的索引开始删除若干元素，然后再从该位置添加若干元素
arr.splice(2, 3, "D", "E", "F")
console.log(arr)
arr.splice(2, 3)
console.log(arr)
arr.splice(2, 0, "D", "E", "F")
console.log(arr)
//concat concat()方法把当前的Array和另一个Array连接起来，并返回一个新的Array
//请注意，concat()方法并没有修改当前Array，而是返回了一个新的Array
//实际上，concat()方法可以接收任意个元素和Array，并且自动把Array拆开，然后全部添加到新的Array里
var arr1 = ['A', "B", 'C']
console.log(arr1)
temp = arr1.concat(1, 2, [3, 4])
console.log(temp)
//join
//join()方法是一个非常实用的方法，它把当前Array的每个元素都用指定的字符串连接起来，然后返回连接后的字符串
temp = arr1.join('-')
console.log(temp)
//多维数组
arr = [[1, 2, 3], [400, 500, 600], '-']
console.log(arr)