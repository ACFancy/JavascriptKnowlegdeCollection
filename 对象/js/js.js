//JavaScript的对象是一种无序的集合数据类型，它由若干键值对组成
//JavaScript的对象用于描述现实世界中的某个对象
<!-- JavaScript的对象,用于描述现实世界中的某个对象隔开。注意，最后一个键值对不需要在末尾加,如果加了，有的浏览器（如低版本的IE）将报错 -->
var xiaoming = {
    name: '小明',
    birth: 1990,
    school: 'No.1 middle school',
    height: 1.76,
    weight: 70,
    score: null
}
console.log(xiaoming.school)
//访问属性是通过.操作符完成的，但这要求属性名必须是一个有效的变量名。如果属性名包含特殊字符，就必须用''括起来
var xiaohong = {
    name: '小红',
    'middle-school': 'No.2 Middle School'
}
//xiaohong的属性名middle-school不是一个有效的变量，就需要用''括起来。访问这个属性也无法使用.操作符，必须用['xxx']来访问
console.log(xiaohong["middle-school"])
console.log(xiaohong['name'])
console.log(xiaohong.name)
<!-- 也可以用xiaohong['name']来访问xiaohong的name属性，不过xiaohong.name的写法更简洁。我们在编写JavaScript代码的时候，属性名尽量使用标准的变量名，这样就可以直接通过object.prop的形式访问一个属性了。 -->
//实际上JavaScript对象的所有属性都是字符串，不过属性对应的值可以是任意数据类型
//如果访问一个不存在的属性会返回什么呢？JavaScript规定，访问不存在的属性不报错，而是返回undefined
console.log(xiaohong.age) //undefined

//由于JavaScript的对象是动态类型，你可以自由地给一个对象添加或删除属性
var xiaohe = {
    name: '小何'
}
console.log(xiaohe.age)
xiaohe.age = 18 //新增age属性
console.log(xiaohe.age)
delete xiaohe.age
console.log(xiaohe.age)
delete xiaohe['name']
console.log(xiaohe.name)
delete xiaohe.school

//如果我们要检测xiaoming是否拥有某一属性，可以用in操作符
console.log('name' in xiaoming)
console.log('grade' in xiaoming)

//不过要小心，如果in判断一个属性存在，这个属性不一定是xiaoming的，它可能是xiaoming继承得到的
//因为toString定义在object对象中，而所有对象最终都会在原型链上指向object，所以xiaoming也拥有toString属性
console.log('toString' in xiaoming)

//判断一个属性是否是xiaoming自身拥有的，而不是继承得到的，可以用hasOwnProperty()
console.log(xiaoming.hasOwnProperty('name'))
console.log(xiaoming.hasOwnProperty('toString'))
