/*
JavaScript的默认对象表示方式{}可以视为其他语言中的Map或Dictionary的数据结构，即一组键值对
但是JavaScript的对象有个小问题，就是键必须是字符串。但实际上Number或者其他数据类型作为键也是非常合理的。
为了解决这个问题，最新的ES6规范引入了新的数据类型Map。要测试你的浏览器是否支持ES6规范，请执行以下代码，如果浏览器报ReferenceError错误，那么你需要换一个支持ES6的浏览器
*/
var m = new Map()
var s = new Set()

//Map
/* 
Map是一组键值对的结构，具有极快的查找速度
给定一个名字，要查找对应的成绩，就先要在names中找到对应的位置，再从scores取出对应的成绩，Array越长，耗时越长
如果用Map实现，只需要一个“名字”-“成绩”的对照表，直接根据名字查找成绩，无论这个表有多大，查找速度都不会变慢。用JavaScript写一个Map如下
*/
var m = new Map([['Michael', 95], ['Bob', 94], ['Tom', 90]])
console.log(m)
console.log(m.get('Michael'))

//初始化Map需要一个二维数组，或者直接初始化一个空Map。Map具有以下方法
var m = new Map()
m.set('Adam', 66)
m.set('Bob', 55)
m.has('Adam')
console.log(m.get('Adam'))
m.delete('Adam')
console.log(m.get('Adam'))
console.log(m)

//由于一个key只能对应一个value，所以，多次对一个key放入value，后面的值会把前面的值冲掉
var m = new Map()
m.set('Adam', 66)
m.set('Adam', 99)
console.log(m)

//Set
/* 
Set和Map类似，也是一组key的集合，但不存储value。由于key不能重复，所以，在Set中，没有重复的key
*/
//要创建一个Set，需要提供一个Array作为输入，或者直接创建一个空Set
var s1 = new Set()
var s2 = new Set([1, 2, 3])
console.log(s1, s2)

//重复元素在Set中自动被过滤
var s = new Set([1, 2, 3, 3, '3'])
console.log(s)

//通过add(key)方法可以添加元素到Set中，可以重复添加，但不会有效果
s.add(4)
console.log(s)
s.add(4)
console.log(s)

//通过delete(key)方法可以删除元素
s.delete(3)
console.log(s)

//Map和Set是ES6标准新增的数据类型，请根据浏览器的支持情况决定是否要使用