'use strict'
//函数的定义和调用
/*
JavaScript的函数不但是“头等公民”，而且可以像变量一样使用，具有非常强大的抽象能力
函数就是最基本的一种代码抽象的方式
*/
//定义函数
/*
function指出这是一个函数定义；
abs是函数的名称；
(x)括号内列出函数的参数，多个参数以,分隔；
{ ... }之间的代码是函数体，可以包含若干语句，甚至可以没有任何语句。
请注意，函数体内部的语句在执行时，一旦执行到return时，函数就执行完毕，并将结果返回。因此，函数内部通过条件判断和循环可以实现非常复杂的逻辑
如果没有return语句，函数执行完毕后也会返回结果，只是结果为undefined
*/
function abs(x) {
    return (x >= 0 ? x : -x)
}
console.log(abs(-123))

//由于JavaScript的函数也是一个对象，上述定义的abs()函数实际上是一个函数对象，而函数名abs可以视为指向该函数的变量
//在这种方式下，function (x) { ... }是一个匿名函数，它没有函数名。但是，这个匿名函数赋值给了变量abs，所以，通过变量abs就可以调用该函数
//上述两种定义完全等价，注意第二种方式按照完整语法需要在函数体末尾加一个;，表示赋值语句结束
var abs = function (x) {
    return (x >=0 ? x : -x)
};

console.log(abs(-445))

//调用函数
/* 
调用函数时，按顺序传入参数即可
由于JavaScript允许传入任意个参数而不影响调用，因此传入的参数比定义的参数多也没有问题，虽然函数内部并不需要这些参数
传入的参数比定义的少也没有问题
*/
console.log(abs(-22))
console.log(abs(-2, 'gagaga'))
console.log(abs(-3, 'sdsdsds', null, undefined))
console.log(abs())

//此时abs(x)函数的参数x将收到undefined，计算结果为NaN
//要避免收到undefined，可以对参数进行检查
function abs1(x) {
    console.log(typeof(x))
    if (typeof x !== 'number') {
       throw 'Not a Number'
    }
    return (x >= 0 ? x : -x)
}
//catch住异常
try {
  console.log(abs1())  
} catch (error) {
  console.log(error)
}
//抛出异常后，后面的js不会执行了
// console.log(abs1())
console.log(abs1(1))

//arguments
/* 
JavaScript还有一个免费赠送的关键字arguments，
它只在函数内部起作用，并且永远指向当前函数的调用者传入的所有参数。arguments类似Array但它不是一个Array
*/

function foo(x) {
    var a = [1, 2, 3]
    console.log(a, arguments)
    console.log('x = ' + x + ' typeof(arguments): ' + typeof(arguments))
    for (var i = 0; i < arguments.length; i++) {
        console.log('arg ' + i + ' = ' + arguments[i])
    } 
}

foo(123, 12, 121)

//利用arguments，你可以获得调用者传入的所有参数。也就是说，即使函数不定义任何参数，还是可以拿到参数的值
function test() {
    if (arguments.length === 0) {
      return 0
    }
    var x = arguments[0]
    return x >=0 ? x : -x;
}

console.log(test(), test(-99), test(9), test(0))

//实际上arguments最常用于判断传入参数的个数。你可能会看到这样的写法
//要把中间的参数b变为“可选”参数，就只能通过arguments判断，然后重新调整参数并赋值。
function foo1(a, b, c) {
      if (arguments.length === 2) {
         c = b
         b = null
      }
      console.log(a, b, c)
}

foo1(1, 2, 3)
foo1(1, 3)

//rest参数
//由于JavaScript函数允许接收任意个参数，于是我们就不得不用arguments来获取所有参数
function foo2(a, b) {
      var i, rest = [];
      if (arguments.length > 2) {
        for (i = 2; i < arguments.length; i++) {
          rest.push(arguments[i])
        }
      }
      console.log('a = ', a)
      console.log('b = ', b)
      console.log('rest = ', rest)
}

foo2(1, 2, 3, 4, 5, null, undefined)

//为了获取除了已定义参数a、b之外的参数，我们不得不用arguments，并且循环要从索引2开始以便排除前两个参数，这种写法很别扭，只是为了获得额外的rest参数，有没有更好的方法？
//ES6标准引入了rest参数，上面的函数可以改写为
function foo3(a, b, ...rest) {
    console.log('a = ', a)
    console.log('b = ', b)
    console.log('rest = ', rest)
}
foo3(1, 3, 'aaa', 23, null)
foo3(1)
foo3(1, 3)
foo3()

//rest参数只能写在最后，前面用...标识，从运行结果可知，传入的参数先绑定a、b，多余的参数以数组形式交给变量rest，所以，不再需要arguments我们就获取了全部参数
//如果传入的参数连正常定义的参数都没填满，也不要紧，rest参数会接收一个空数组（注意不是undefined）


//小心你的return语句
/* 
 前面我们讲到了JavaScript引擎有一个在行末自动添加分号的机制，这可能让你栽到return语句的一个大坑
*/
function foo4() {
    return {name: 'foo'}
}
console.log(foo4())

//如果把return语句拆成两行：
function foo5() {
  return
          {name: 'foo'}
}
console.log(foo5())

//要小心了，由于JavaScript引擎在行末自动添加分号的机制，上面的代码实际上变成了
function foo5() {
  return; //自动添加了分号，相当于return undefined;
          {name: 'foo'};
}
console.log(foo5())

//所以正确的多行写法是：
function foo6() {
  return {
    name: 'foo6'
  }
}
console.log(foo6())


//变量作用域与解构赋值
/**
 * 在JavaScript中，用var申明的变量实际上是有作用域的
 * 如果一个变量在函数体内部申明，则该变量的作用域为整个函数体，在函数体外不可引用该变量
 */

 function fkk() {
   var x = 1
   x += 1
 }
//  x += 2 //ReferenceError! 无法在函数体外引用变量x

//如果两个不同的函数各自申明了同一个变量，那么该变量只在各自的函数体内起作用。换句话说，不同函数内部的同名变量互相独立，互不影响
//由于JavaScript的函数可以嵌套，此时，内部函数可以访问外部函数定义的变量，反过来则不行
function fkk() {
   var x = 1
   function bar () {
       var y = x + 1 //bar可以访问foo的变量x
   }
   var z = y + 1 //ReferenceError! foo不可以访问bar的变量y
}

// fkk()
//这说明JavaScript的函数在查找变量时从自身函数定义开始，从“内”向“外”查找。如果内部函数定义了与外部函数重名的变量，则内部函数的变量将“屏蔽”外部函数的变量
//就近原则
function fkk() {
  var x = 1
  function bar() {
    var x = 'A'
    console.log('x in bar() = ', x)
  }
  console.log('x in foo() = ', x)
  bar()
}
// fkk()

//变量提升
//JavaScript的函数定义有个特点，它会先扫描整个函数体的语句，把所有申明的变量“提升”到函数顶部
/*
虽然是strict模式，但语句var x = 'Hello, ' + y;并不报错，原因是变量y在稍后申明了。
但是console.log显示Hello, undefined，说明变量y的值为undefined。
这正是因为JavaScript引擎自动提升了变量y的声明，但不会提升变量y的赋值
*/
function fkk() {
  var x = 'Hello, ' + y
  console.log(x)
  var y = 'Bob'
}

fkk()

//对于上述fkk()函数，JavaScript引擎看到的代码相当于
function fkk() {
  var y;
  var x = 'Hello, ' + y
  console.log(x)
  y = 'Bob'
}

//由于JavaScript的这一怪异的“特性”，我们在函数内部定义变量时，请严格遵守“在函数内部首先申明所有变量”这一规则。最常见的做法是用一个var申明函数内部用到的所有变量
function fkk() {
  var 
     x = 1,
     y = x + 1,
     z, i
     for (i = 1; i < 100; i++) {
          
     }
}

fkk()

//全局作用域
/*
不在任何函数内定义的变量就具有全局作用域。实际上，JavaScript默认有一个全局对象window，全局作用域的变量实际上被绑定到window的一个属性

这说明JavaScript实际上只有一个全局作用域。任何变量（函数也视为变量），
如果没有在当前函数作用域中找到，就会继续往上查找，
最后如果在全局作用域中也没有找到，则报ReferenceError错误
*/
var course = 'Learn JavaScript'
console.log(course)
console.log(window.course)
//因此，直接访问全局变量course和访问window.course是完全一样的
//由于函数定义有两种方式，以变量方式var foo = function () {}定义的函数实际上也是一个全局变量，因此，顶层函数的定义也被视为一个全局变量，并绑定到window对象：
function fks() {
   console.log('fks')
}
fks()
window.fks()
//我们每次直接调用的alert()函数其实也是window的一个变量
// window.alert('Window的alert')
// var old_alert = window.alert
// window.alert = function () {}
// alert('无法显示')
// window.alert = old_alert
// alert('又可以显示了')

//名字空间
/*
全局变量会绑定到window上，不同的JavaScript文件如果使用了相同的全局变量，或者定义了相同名字的顶层函数，都会造成命名冲突，并且很难被发现
减少冲突的一个方法是把自己的所有变量和函数全部绑定到一个全局变量中
把自己的代码全部放入唯一的名字空间MYAPP中，会大大减少全局变量冲突的可能
许多著名的JavaScript库都是这么干的：jQuery，YUI，underscore等等
*/

var MYAPP = {}
//其他变量
MYAPP.name = 'myapp'
MYAPP.version = 1.0

//其他函数
MYAPP.foo = function () {
  return 'foo'
}

//局部作用域
/*
由于JavaScript的变量作用域实际上是函数内部，我们在for循环等语句块中是无法定义具有局部作用域的变量的
*/
function fkk1() {
    for (var i = 0; i < 100; i++) {

    }
    i += 100 // 仍然可以引用变量i
    console.log('HHAHAHA- ', i)
}
fkk1()

//为了解决块级作用域，ES6引入了新的关键字let，用let替代var可以申明一个块级作用域的变量
function fkk2() {
    let sum = 0
    for (let i = 0; i < 100; i++) {
      sum += i
    }
    console.log('FKK2', sum)
    // i += 1 // SyntaxError
}
fkk2()

//常量
/*
由于var和let申明的是变量，如果要申明一个常量，在ES6之前是不行的，
我们通常用全部大写的变量来表示“这是一个常量，不要修改它的值”

ES6标准引入了新的关键字const来定义常量，const与let都具有块级作用域
*/
var PI = 3.13
console.log('PI = ', PI)
PI = 2.2
console.log('PI = ', PI)

const M_PI = 3.14
console.log('M_PI = ', M_PI)
// M_PI = 2.2 //某些浏览器不报错，但是无效果！
//Uncaught TypeError: Assignment to constant variable
// console.log('M_PI = ', M_PI)

//解构赋值
/* 
从ES6开始，JavaScript引入了解构赋值，可以同时对一组变量进行赋值
什么是解构赋值？我们先看看传统的做法，如何把一个数组的元素分别赋值给几个变量
注意，对数组元素进行解构赋值时，多个变量要用[...]括起来
*/
var array = ["H", "M", "S"]
var x = array[0]
var y = array[1]
var z = array[2]
console.log('x = ', x, ' y = ', y, ' z = ', z)

//现在，在ES6中，可以使用解构赋值，直接对多个变量同时赋值
var [x, y, z] = ['Lala', 'Hahah', 'Dada']
console.log('x = ', x, ' y = ', y, ' z = ', z)

//如果数组本身还有嵌套，也可以通过下面的形式进行解构赋值，注意嵌套层次和位置要保持一致
let [x1, [y1, z1]] = ['HH', ['MM', 'SS']]
console.log('x1 = ', x1, ' y1 = ', y1, ' z1 = ', z1)

//解构赋值还可以忽略某些元素
let [,, z2] = ['sd', 'sds', 'sdsdsd', 'sdsdsdsd']
console.log('z2 = ', z2)

//如果需要从一个对象中取出若干属性，也可以使用解构赋值，便于快速获取对象的指定属性
var person1 = {
  name: '小明',
  age: 20,
  gender: 'male',
  passport: 'G-1234545',
  school: 'No.4 middle school'
}

// var {name, age, passport} = person1
// console.log('name:', name, 'age:', age, 'passport:', passport)

var person1 = {
  name: '小明',
  age: 20,
  gender: 'male',
  passport: 'G-1234545',
  school: 'No.4 middle school',
  address: {
    city: "Beijing",
    street: 'NO.1 Road',
    zipcode: '100101'
  }
}
// var {name, address: {city, zipcode}} = person1
// console.log('name:', name, 'city:',  city ,'zipCode:', zipcode)
// 注意: address不是变量，而是为了让city和zip获得嵌套的address对象的属性
// console.log('address', address) //Uncaught ReferenceError: address is not defined

/* 
使用解构赋值对对象属性进行赋值时，如果对应的属性不存在，变量将被赋值为undefined，
这和引用一个不存在的属性获得undefined是一致的。
如果要使用的变量名和属性名不一致，可以用下面的语法获取
*/
let {name:name1, passport: passport1} = person1
console.log('name1:', name1, 'passport1:', passport1)
//Uncaught ReferenceError: passport is not defined
// console.log('name:', name, 'passport:', passport)

//解构赋值还可以使用默认值，这样就避免了不存在的属性返回undefined的问题
var  {name, single='false'} = person1
console.log('name:', name, 'single:', single)

//有些时候，如果变量已经被声明了，再次赋值的时候，正确的写法也会报语法错误
// var x, y
// {x, y} = {name: '晓', x: 100, y: 200}//Uncaught SyntaxError: Unexpected token =

//这是因为JavaScript引擎把{开头的语句当作了块处理，于是=不再合法。解决方法是用小括号括起来
var x, y
({x, y} = {name: 'xxx', x: 200, y: 300})
console.log('x:', x, 'y:', y)

//使用场景
//解构赋值在很多时候可以大大简化代码。例如，交换两个变量x和y的值，可以这么写，不再需要临时变量
var x = 1, y = 2;
[y, x] = [x, y]
console.log('x:', x, 'y:', y)

//快速获取当前页面的域名和路径
var {hostname:domain, pathname:path} = location
console.log('domain:', domain, 'path:', path)

//如果一个函数接收一个对象作为参数，那么，可以使用解构直接把对象的属性绑定到变量中。例如，下面的函数可以快速创建一个Date对象
function buildDate({year, month, day, hour=0, minute=0, second=0}) {
  return new Date(year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second)
}

//它的方便之处在于传入的对象只需要year、month和day这三个属性
console.log('Date:', buildDate({year: 2019, month: 4, day: 3}))

//也可以传入hour、minute和second属性
console.log('Date:', buildDate({year: 2019, month: 4, day: 3, hour:19, minute: 18, second:59}))
/*
使用解构赋值可以减少代码量，
但是，需要在支持ES6解构赋值特性的现代浏览器中才能正常运行。
目前支持解构赋值的浏览器包括Chrome，Firefox，Edge等
*/

//方法
/* 
在一个对象中绑定函数，称为这个对象的方法
*/
var xiaoming = {
   name: '小明',
   birth: 1990
}

//如果我们给xiaoming绑定一个函数，就可以做更多的事情。比如，写个age()方法，返回xiaoming的年龄
var xiaoming = {
  name: '小明',
  birth: 1992,
  age: function () {
    var y = new Date().getFullYear()
    return y - this.birth
  }
}

console.log('xiaoming:', xiaoming.age)
console.log('xiaoming:', xiaoming.age())

//绑定到对象上的函数称为方法，和普通函数也没啥区别，但是它在内部使用了一个this关键字
/* 
在一个方法内部，this是一个特殊变量，它始终指向当前对象，也就是xiaoming这个变量。
所以，this.birth可以拿到xiaoming的birth属性
*/

function getAge() {
    var y = new Date().getUTCFullYear()
    return y - this.birth
}

var xiaohe = {
  name: '小何',
  birth: 1990,
  age: getAge
}

console.log('xiaohe', xiaohe.age)
console.log('xiaohe', xiaohe.age())

//单独调用函数getAge()怎么返回了NaN？请注意，我们已经进入到了JavaScript的一个大坑里
//JavaScript的函数内部如果调用了this，那么这个this到底指向谁,视情况而定
//如果以对象的方法形式调用，比如xiaoming.age()，该函数的this指向被调用的对象，也就是xiaoming，这是符合我们预期的
//如果单独调用函数，比如getAge()，此时，该函数的this指向全局对象，也就是window
// console.log('getAge', getAge()) //strit模式下Uncaught TypeError: Cannot read property 'birth' of undefined

//如果这么写,也是不行的！要保证this指向正确，必须用obj.xxx()的形式调用
//由于这是一个巨大的设计错误，要想纠正可没那么简单。
//ECMA决定，在strict模式下让函数的this指向undefined，因此，在strict模式下，你会得到一个错误
var fn = xiaoming.age
// fn() //Uncaught TypeError: Cannot read property 'birth' of undefined

//原因是this指针只在age方法的函数内指向xiaoming，在函数内部定义的函数，this又指向undefined了！（在非strict模式下，它重新指向全局对象window
var xiaoming1 = {
  birth: 1992,
   age: function () {
     function getAgeFromBirth() {
       var y = new Date().getFullYear()
       return y - this.birth
     }
     return getAgeFromBirth()
   }
}

// xiaoming1.age()//Uncaught TypeError: Cannot read property 'birth' of undefined

//修复的办法也不是没有，我们用一个that变量首先捕获this
var xiaoming2 = {
  birth: 1992,
   age: function () {
     var that = this
     function getAgeFromBirth() {
       var y = new Date().getFullYear()
       return y - that.birth
     }
     return getAgeFromBirth()
   }
}
console.log('xiaoming2:', xiaoming2.age())
//用var that = this;，你就可以放心地在方法内部定义其他函数，而不是把所有语句都堆到一个方法中

//apply
/* 
虽然在一个独立的函数调用中，根据是否是strict模式，this指向undefined或window，不过，我们还是可以控制this的指向的
要指定函数的this指向哪个对象，可以用函数本身的apply方法，它接收两个参数，第一个参数就是需要绑定的this变量，第二个参数是Array，表示函数本身的参数
*/

//用apply修复getAge()调用
// console.log('Before Apply', getAge())
console.log('Apply', getAge.apply(xiaohe, []))

/* 
另一个与apply()类似的方法是call()，唯一区别是：
apply()把参数打包成Array再传入；
call()把参数按顺序传入。
比如调用Math.max(3, 5, 4)，分别用apply()和call()实现如下
对普通函数调用，我们通常把this绑定为null
*/

console.log('Math Apply', Math.max.apply(null, [3, 4, 5]))
console.log('Math Call', Math.max.call(null, 3, 4, 5))
// console.log('Math Call', Math.max.call(null, [3, 4, 5])) //NaN

//装饰器
/* 
利用apply()，我们还可以动态改变函数的行为
JavaScript的所有对象都是动态的，即使内置的函数，我们也可以重新指向新的函数
现在假定我们想统计一下代码一共调用了多少次parseInt()，可以把所有的调用都找出来，然后手动加上count += 1，不过这样做太傻了。最佳方案是用我们自己的函数替换掉默认的parseInt()
*/

var count = 0
var oldParseInt = parseInt

window.parseInt = function () {
  count += 1
  return oldParseInt.apply(null, arguments)
}
parseInt('10')
parseInt('10')
parseInt('10')
console.log('ParseInt Count', count)

//高阶函数
/*
JavaScript的函数其实都指向某个变量。既然变量可以指向函数，函数的参数能接收变量，
那么一个函数就可以接收另一个函数作为参数，这种函数就称之为高阶函数
*/
//一个最简单的高阶函数
function add(x, y, f){
  return f(x) + f(y)
}

console.log('add:', add(5, -6, Math.abs))
//当我们调用add(-5, 6, Math.abs)时，参数x，y和f分别接收-5，6和函数Math.abs，根据函数定义，我们可以推导计算过程为
/*
x = 5
y = -6
f = Math.abs
f(x) + f(y) ==> Math.abs(x) + Math.abs(y)  ==> 11
return 11
*/
//写高阶函数，就是让函数的参数能够接收别的函数

//map/reduce
//map 
/* 
举例说明，比如我们有一个函数f(x)=x2，要把这个函数作用在一个数组[1, 2, 3, 4, 5, 6, 7, 8, 9]上，就可以用map实现如下
*/
//由于map()方法定义在JavaScript的Array中，我们调用Array的map()方法，传入我们自己的函数，就得到了一个新的Array作为结果
function pow(x) {
  if (typeof x !== 'number') {
    return 0
  }
  return x * x
}

var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9]
var results = arr.map(pow)
console.log('Result:',  results)

//注意：map()传入的参数是pow，即函数对象本身
//map()作为高阶函数，事实上它把运算规则抽象了，因此，我们不但可以计算简单的f(x)=x2，还可以计算任意复杂的函数，比如，把Array的所有数字转为字符串
console.log('String:', arr.map(String))

//reduce
/* 
再看reduce的用法。Array的reduce()把一个函数作用在这个Array的[x1, x2, x3...]上，
这个函数必须接收两个参数，reduce()把结果继续和序列的下一个元素做累积计算，其效果就是
[x1, x2, x3, x4].reduce(f) = f(f(f(x, x2), x3), x4)
*/
//比方说对一个Array求和，就可以用reduce实现
var arr1 = [1, 3, 5, 7, 9]
var result = arr1.reduce(function(x, y) {
  return x + y
}) 
console.log('result:', result)

//要把[1, 3, 5, 7, 9]变换成整数13579，reduce()也能派上用场
result = arr1.reduce(function(x, y) {
     return x * 10 + y
})
console.log('result:', result)

//小明希望利用map()把字符串变成整数，他写的代码很简洁
var arr = ['1', '2', '3'];
var r;
r = arr.map(parseInt);
console.log(r);
/*
结果竟然是1, NaN, NaN，小明百思不得其解，请帮他找到原因并修正代码
由于map()接收的回调函数可以有3个参数：callback(currentValue, index, array)，通常我们仅需要第一个参数，而忽略了传入的后面两个参数。不幸的是，parseInt(string, radix)没有忽略第二个参数，导致实际执行的函数分别是：

parseInt('0', 0); // 0, 按十进制转换

parseInt('1', 1); // NaN, 没有一进制

parseInt('2', 2); // NaN, 按二进制转换不允许出现2

可以改为r = arr.map(Number);，因为Number(value)函数仅接收一个参数。
*/
r = arr.map(Number);
console.log(r);

//filter
/* 
filter也是一个常用的操作，它用于把Array的某些元素过滤掉，然后返回剩下的元素
和map()类似，Array的filter()也接收一个函数。和map()不同的是，filter()把传入的函数依次作用于每个元素，
然后根据返回值是true还是false决定保留还是丢弃该元素。
例如，在一个Array中，删掉偶数，只保留奇数，可以这么写
*/

var arr_f = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 15]
var temp = arr_f.filter(function(x) {
  if (typeof x !== 'number') {
    return 0;
  }
  return ((x & 1) > 0)
})
console.log('filter: odd:', temp)

//把一个Array中的空字符串删掉，可以这么写
var arr_f = ['A', '', 'B', null, undefined, 'C', '']
temp = arr_f.filter(function(s) {
  return s && s.trim()
})
console.log('filter: string:', temp)
//可见用filter()这个高阶函数，关键在于正确实现一个“筛选”函数

//回调函数
/*
filter()接收的回调函数，其实可以有多个参数。
通常我们仅使用第一个参数，表示Array的某个元素。回调函数还可以接收另外两个参数，表示元素的位置和数组本身
*/
var arr_f = ['A', 'B', 'C']
temp = arr_f.filter(function (element, index , self){
   console.log('filter:function:element:', element)
   console.log('filter:function:index:', index)
   console.log('filter:function:arraySelf:', self)
})

//利用filter，可以巧妙地去除Array的重复元素
//去除重复元素依靠的是indexOf总是返回第一个元素的位置，后续的重复元素位置与indexOf返回的位置不相等，因此被filter滤掉了
var arr_f = ['apple', 'strawberry', 'banana', 'pear', 'apple', 'orange', 'strawberry']
temp = arr_f.filter(function(element, index, self) {
  return self.indexOf(element) === index
})
console.log('filter:removeSameElement', temp, arr_f === temp)

//请尝试用filter()筛选出素数
function get_primes(arr) {
  let temp = arr.filter(function(element) {
    let isPrime = element >= 2 ? true : false
    for (let i = 2; i * i <= element; i++) {
        if (element % i == 0) {
           isPrime = false
           break
        }
    }
   return isPrime
  }) 

  console.log('temp: ' + temp)
  return temp
}

// 测试:
var arr = [];
for (let x = 1; x < 100; x++) {
    arr.push(x);
}
temp = get_primes(arr);
if (temp.toString() === [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97].toString()) {
    console.log('测试通过!');
} else {
    console.log('测试失败: ' + temp.toString());
}

//sort
//排序算法
/*
排序也是在程序中经常用到的算法。无论使用冒泡排序还是快速排序，排序的核心是比较两个元素的大小
如果是数字，我们可以直接比较，但如果是字符串或者两个对象呢？直接比较数学上的大小是没有意义的，
因此，比较的过程必须通过函数抽象出来
通常规定，对于两个元素x和y，如果认为x < y，则返回-1，如果认为x == y，则返回0，如果认为x > y，则返回1
这样，排序算法就不用关心具体的比较过程，而是根据比较结果直接排序
JavaScript的Array的sort()方法就是用于排序的，但是排序结果可能让你大吃一惊
*/
console.log('sort:', ['Google', 'Apple', 'Microsoft'].sort())
console.log('sort:', ['Google', 'apple', 'Microsoft'].sort())
console.log('sort:', [10, 20, 1, 2, 9, 6].sort())
//如果不知道sort()方法的默认排序规则，直接对数字排序，绝对栽进坑里
//幸运的是，sort()方法也是一个高阶函数，它还可以接收一个比较函数来实现自定义的排序
var arr_s = [10, 20, 20, 2, 2, 1, 2, 1]
temp = arr_s.sort(function(x, y) {
   return x <= y ? -1 : 1
})
console.log('sort:', temp)
//倒序
temp = arr_s.sort(function(x, y) {
  return x <= y ? 1 : -1
})
console.log('sort:', temp)
/*
默认情况下，对字符串排序，是按照ASCII的大小比较的，现在，我们提出排序应该忽略大小写，按照字母序排序。
要实现这个算法，不必对现有代码大加改动，只要我们能定义出忽略大小写的比较算法就可以
忽略大小写来比较两个字符串，实际上就是先把字符串都变成大写（或者都变成小写），再比较
从上述例子可以看出，高阶函数的抽象能力是非常强大的，而且，核心代码可以保持得非常简洁
最后友情提示，sort()方法会直接对Array进行修改，它返回的结果仍是当前Array
*/
var arr_s = ['Google', 'apple', 'Microsoft']
temp = arr_s.sort(function(s1, s2) {
   let temp1 = s1.toUpperCase()
   let temp2 = s2.toUpperCase()
   return temp1 <= temp2 ? -1 : 1
})
console.log('sort:', temp, arr_s, temp === arr_s)

//闭包
//函数作为返回值
/* 
高阶函数除了可以接受函数作为参数外，还可以把函数作为结果值返回.
我们来实现一个对Array的求和。通常情况下，求和的函数是这样定义的
*/

function sum(arr) {
  return arr.reduce(function(x, y) {
    return x + y
  })
}

console.log('sum', sum([1, 2, 3, 4, 5]))

//但是，如果不需要立刻求和，而是在后面的代码中，根据需要再计算怎么办？可以不返回求和的结果，而是返回求和的函数
/*
在这个例子中，我们在函数lazy_sum中又定义了函数sum，并且，内部函数sum可以引用外部函数lazy_sum的参数和局部变量，
当lazy_sum返回函数sum时，相关参数和变量都保存在返回的函数中，这种称为“闭包（Closure）”的程序结构拥有极大的威力
*/
function lazy_sum(arr) {
  var sum = function () {
    return arr.reduce(function(x, y) {
      return x + y
    })
  }
  return sum
}

let f = lazy_sum([1, 2, 3, 4, 5])
console.log('lazy_sum', f)
console.log('lazy_sum', f())

//请再注意一点，当我们调用lazy_sum()时，每次调用都会返回一个新的函数，即使传入相同的参数
var f1 = lazy_sum([1, 2, 3, 4, 5])
console.log('lazy_sum:Equal:',  f === f1)

//闭包
/*
注意到返回的函数在其定义内部引用了局部变量arr，所以，当一个函数返回了一个函数后，其内部的局部变量还被新函数引用，
所以，闭包用起来简单，实现起来可不容易
另一个需要注意的问题是，返回的函数并没有立刻执行，而是直到调用了f()才执行
 */
function Count() {
  var arr = []
  for (var i = 1; i <= 3; i++) {
    arr.push(function(){
      return i * i
    })
  }
  return arr
}

temp = Count()
var f1 = temp[0]
var f2 = temp[1]
var f3 = temp[2]
console.log('closure: count:', f1, f2, f3)
//在上面的例子中，每次循环，都创建了一个新的函数，然后，把创建的3个函数都添加到一个Array中返回了
//你可能认为调用f1()，f2()和f3()结果应该是1，4，9，但实际结果
console.log('closure: count:', f1(), f2(), f3()) // 16, 16, 16
//全部都是16！原因就在于返回的函数引用了变量i，但它并非立刻执行。等到3个函数都返回时，它们所引用的变量i已经变成了4，因此最终结果为16

/* 
返回闭包时牢记的一点就是：返回函数不要引用任何循环变量，或者后续会发生变化的变量
1.使用let关键字，声明的变量仅在块级作用域内有效
2.如果一定要引用循环变量怎么办？方法是再创建一个函数，用该函数的参数绑定循环变量当前的值，
  无论该循环变量后续如何更改，已绑定到函数参数的值不变
*/
function Count1() {
  var arr = []
  for (var i = 1; i <= 3; i++) {
    arr.push((function(j){
       return function() {
         return j * j
       }
    })(i))
  }
  return arr
}
//注意这里用了一个“创建一个匿名函数并立刻执行”的语法
temp = Count1()
var f1 = temp[0]
var f2 = temp[1]
var f3 = temp[2]
console.log('closure: count:', f1, f2, f3)
console.log('closure: count:', f1(), f2(), f3()) // 1, 4, 9

function Count2() {
  var arr = []
  for (let i = 1; i <= 3; i++) {
    arr.push(function(){
      return i * i
    })
  }
  return arr
}
temp = Count2()
var f1 = temp[0]
var f2 = temp[1]
var f3 = temp[2]
console.log('closure: count:', f1, f2, f3)
console.log('closure: count:', f1(), f2(), f3()) // 1, 4, 9
/*
上面代码中，变量i是let声明的，当前的i只在本轮循环有效，所以每一次循环的i其实都是一个新的变量。
你可能会问，如果每一轮循环的变量i都是重新声明的，那它怎么知道上一轮循环的值，从而计算出本轮循环的值？
这是因为 JavaScript 引擎内部会记住上一轮循环的值，初始化本轮的变量i时，就在上一轮循环的基础上进行计算。

另外，for循环还有一个特别之处，就是设置循环变量的那部分是一个父作用域，而循环体内部是一个单独的子作用域
下面代码正确运行，输出了 3 次abc。这表明函数内部的变量i与循环变量i不在同一个作用域，有各自单独的作用域
*/
for (let i = 0; i < 3; i++) {
  let i = 'abc'
  console.log('let:', i)
}

/*
 理论上讲，创建一个匿名函数并立刻执行可以这么写
 function (x) { return x*x} (3);
 但是由于JavaScript语法解析的问题，会报SyntaxError错误，因此需要用括号把整个函数定义括起来
 (function(x) {return x*x}) (3);
 通常，一个立即执行的匿名函数可以把函数体拆开，一般这么写
 (function(x) {
    return x * x
 })(3)
*/

/* 
说了这么多，难道闭包就是为了返回一个函数然后延迟执行吗？
当然不是！闭包有非常强大的功能。举个栗子
在面向对象的程序设计语言里，比如Java和C++，要在对象内部封装一个私有变量，可以用private修饰一个成员变量
在没有class机制，只有函数的语言里，借助闭包，同样可以封装一个私有变量。我们用JavaScript创建一个计数器
在返回的对象中，实现了一个闭包，该闭包携带了局部变量x，并且，从外部代码根本无法访问到变量x。
换句话说，闭包就是携带状态的函数，并且它的状态可以完全对外隐藏起来
*/
function create_counter(initial) {
  console.log('initial', initial)
  var x_c = initial || 0
  console.log('x_c', x_c)
  return {
    inc: function () {
       x_c += 1
       return x_c
    }
  }
}

var c1 = create_counter(1)
console.log('createCounter:', c1.inc())
console.log('createCounter:', c1.inc())
console.log('createCounter:', c1.inc())

/* 
闭包还可以把多参数的函数变成单参数的函数。例如，要计算xy可以用Math.pow(x, y)函数，
不过考虑到经常计算x^2或x^3，我们可以利用闭包创建新的函数pow2和pow3
*/
function make_pow(n) {
  return function (x) {
    return Math.pow(x, n)
  }
}

var pow2 = make_pow(2)
var pow3 = make_pow(3)

console.log('pow2', pow2(4))
console.log('pow3', pow3(4))

//脑洞大开
/* 
只需要用函数，就可以用计算机实现运算，而不需要0、1、2、3这些数字和+、-、*、/这些符号
JavaScript支持函数，所以可以用JavaScript用函数来写这些计算
f(x)的不返回的值默认是undefined， 
addC主要是执行函数
*/

var zero = function(f) {
  return function(x) {
    return x
  }
}

var one = function(f) {
  return function(x) {
    // console.log('tag', x)
    return f(x)
  }
}

function addC(n, m) {
  return function(f) {
    return function (x) {
      var temp = m(f)(n(f)(x))
      // console.log('temp', temp)
      return temp
    }
  }
}

var two = addC(one, one);

var three = addC(one, two);

var five = addC(two, three);

(one(function(x) {
  console.log('ja:', 'print 1 times', x)
  return 1;
}))(1);

(two(function(x) {
  console.log('ja:', 'print 2 times', x)
  return 2;
}))(2);


(three(function(x) {
  console.log('ja:', 'print 3 times', x)
  return 3;
}))(3);

(five(function() {
  console.log('ja:', 'print 5 times')
  return 5;
}))(5);

//乘法
function multiply(n, m) {
   return function(f) {
     return function(x) {
      return (m(function() {
             return n(f)(x)
       }))(x)
     }
   }
}

function multiply2(n, m) {
  return function(f) {
    return function(x) {
      var i = 0;
      var j = 0;
      m(function(){
        i+=1
        return x
      })(x)
      n(function(){
        j+=1
        return x
      })(x)
      for(let jar = 0; jar < (i*j); jar++) {
        f(x)
      }
      return x
    }
  }
}

var six = multiply(two, three);
(six(function(x){
   console.log('ja:', 'print 6 times', x)
   return 6
}))(6)

var eighteen = multiply(six, three);
(eighteen(function(x){
   console.log('ja:', 'print 18 times', x)
   return 18
}))(18)

//减法
function sub(m, n) {
  return function(f) {
    return function(x) {
        var arr = []
        m(function(){
          arr.push(f)
          return x
        })(x)
        n(function() {
          arr.pop()
          return x
        })(x)
        arr.forEach(f => f(x))
        return x
      }
  }
}

var twelvef = multiply(two, six);
(twelvef(function(x){
  console.log('ja:', 'print 12 times', x)
  return 12
}))(12)

var nine = sub(twelvef, three);
(nine(function(x){
  console.log('ja:', 'print 9 times', x)
  return 9
}))(9)

//除法
function divide(m, n) {
  return function(f) {
    return function(x) {
      var divider = []
      var divided = []
      var result = []
      m(function() {
        divider.push(f)
        return x
      })(x)
      n(function() {
        divided.push(f)
        return x
      })(x)
      while(divider.length >= divide.length) {
        divider.splice(0, divided.length)
        result.push(f)
      }

      result.forEach(f => f(x))
      return x
    }
  }
}

var nineDivideTwo = divide(nine, two);
(nineDivideTwo(function(x){
  console.log('ja:', 'print 4 times', parseInt(x))
  return 9/2
}))(9/2)

//求余
function mod(m, n) {
  return function(f) {
    return function(x) {
      var divider = []
      var divided = []
      m(function() {
        divider.push(f)
        return x
      })(x)
      n(function(){
        divided.push(f)
        return x
      })(x)
      while(divider.length >= divided.length) {
        divider.splice(0, divided.length)
      }
      divider.forEach(f => f(x))
      return x
    }
  }
}

var twelvefMod9 = mod(twelvef, nine);
(twelvefMod9(function(x){
  console.log('ja:', 'print 3 times', x)
  return (12%9)
}))((12%9))

//箭头函数
/* 
ES6标准新增了一种新的函数：Arrow Function（箭头函数)
为什么叫Arrow Function？因为它的定义用的就是一个箭头
x => x * x;
上面的箭头函数相当于：
function(x) {
  return x * x;
}
箭头函数相当于匿名函数，并且简化了函数定义
 1. 箭头函数有两种格式，一种像上面的，只包含一个表达式，连{ ... }和return都省略掉了
*/
var fn = x => x * x
console.log('Arrow Funciton:', fn(6))

// 2. 还有一种可以包含多条语句，这时候就不能省略{ ... }和return
x => {
  if (x > 0) {
    return x * x
  } else {
    return -(x * x)
  }
}

//如果参数不是一个，就需要用括号()括起来
(x, y) => x * x + y * y;

//无参
() => 3.14;

//可变参
let varParamsFunc =
(x, y, ...rest) => {
   var i , sum = x + y;
   rest.forEach(x => {
     sum += x
   })
   return sum
};
console.log('test:', varParamsFunc(1, 2, 3, 4, 5, 6))

//如果要返回一个对象，就要注意，如果是单表达式，这么写的话会报错
var objectFunc = yb => { foo: yb} //SyntaxError 实际上没报错。和浏览器相关？

//因为和函数体的{ ... }有语法冲突，所以要改为
var objectFunc = yb => ({foo: yb})

//this
/* 
箭头函数看上去是匿名函数的一种简写，但实际上，箭头函数和匿名函数有个明显的区别:
箭头函数内部的this是词法作用域，由上下文确定
由于JavaScript函数对this绑定的错误处理，下面的例子无法得到预期结果
*/

var obj = {
  birth: 1992,
  getAge: function() {
    var b = this.birth;
    var fn = function() {
      return new Date().getFullYear() - this.birth // this指向window或undefined
    };
    return fn();
  }
}
// console.log('age', obj.getAge())

//现在，箭头函数完全修复了this的指向，this总是指向词法作用域，也就是外层调用者obj
var obj = {
  birth: 1992,
  getAge: function() {
    var b = this.birth;
    var fn = () => new Date().getUTCFullYear() - this.birth; //this指向obj对象
    return fn();
  }
}
console.log('age', obj.getAge())

/*
如果使用箭头函数，以前的那种hack写法
var that = this;
就不再需要了。
由于this在箭头函数中已经按照词法作用域绑定了，所以，用call()或者apply()调用箭头函数时
无法对this进行绑定，即传入的第一个参数被忽略
*/
var obj = {
  birth: 1992,
  getAge: function(year) {
    var b = this.birth;
    // var fn = (y) => y - this.birth
    var that = this;
    var fn = function(y) {
       return y - this.birth
    }
    return fn.call({birth: 2000}, year)
  }
}
console.log('age', obj.getAge(2019))

//generator
/*
generator（生成器）是ES6标准引入的新的数据类型。一个generator看上去像一个函数，但可以返回多次
ES6定义generator标准的哥们借鉴了Python的generator的概念和语法，如果你对Python的generator很熟悉，那么ES6的generator就是小菜一碟了
我们先复习函数的概念。一个函数是一段完整的代码，调用一个函数就是传入参数，然后返回结果
*/
function foo(x) {
  return x + x
}
console.log('foo:', foo(22))

//函数在执行过程中，如果没有遇到return语句（函数末尾如果没有return，就是隐含的return undefined;），控制权无法交回被调用的代码
//generator跟函数很像，定义如下
function* foo(x) {
  yield x + 1;
  yield x + 2;
  yield x + 3;
}
/* 
generator和函数不同的是，generator由function*定义（注意多出的*号），并且，除了return语句，还可以用yield返回多次
generator就是能够返回多次的“函数”？返回多次有啥用？
还是举个栗子吧。
我们以一个著名的斐波那契数列为例，它由0，1开头
0 1 1 2 3 5 8 13 21 24 ...
*/
function fib(max) {
  var t, a = 0, b = 1, arr = [0, 1];
  while (arr.length < max) {
    [a, b] = [b, a + b]
    arr.push(b)
  }
  return arr;
}
console.log('fib:', fib(5).toString())
console.log('fib', fib(10).toString())
//函数只能返回一次，所以必须返回一个Array。但是，如果换成generator，就可以一次返回一个数，不断返回多次。用generator改写如下
function* fibb(max) {
  var t, a = 0, b = 1, n = 0;
  while (n < max) {
    yield a;
    [a, b] = [b, a + b]
    n++
  }
  return 10000;
}
console.log('fib:', fibb(5))//// fib {[[GeneratorStatus]]: "suspended", [[GeneratorReceiver]]: Window}
/*
直接调用一个generator和调用函数不一样，fibb(5)仅仅是创建了一个generator对象，还没有去执行它
调用generator对象有两个方法，一是不断地调用generator对象的next()方法
next()方法会执行generator的代码，然后，每次遇到yield a;就返回一个对象{value: a, done: true/false}，然后“暂停”。返回的value就是yield的返回值，
done表示这个generator是否已经执行结束了。如果done为true，则value就是return的返回值。
当执行到done为true时，这个generator对象就已经全部执行完毕，不要再继续调用next()了
*/
var fbb = fibb(5)
// console.log('fibb:', fbb.next())
// console.log('fibb:', fbb.next())
// console.log('fibb:', fbb.next())
// console.log('fibb:', fbb.next())
// console.log('fibb:', fbb.next())
// console.log('fibb:', fbb.next())
var next;
while ((next = fbb.next()).done === false) {
  console.log('fibb:', next)
}

//第二个方法是直接用for ... of循环迭代generator对象，这种方式不需要我们自己判断done
for (const x of fibb(10)) {
   console.log('fibb:', x)
}

/*
generator和普通函数相比，有什么用？

因为generator可以在执行过程中多次返回，所以它看上去就像一个可以记住执行状态的函数，利用这一点，
写一个generator就可以实现需要用面向对象才能实现的功能。例如，用一个对象来保存状态，得这么写
用对象的属性来保存状态，相当繁琐
generator还有另一个巨大的好处，就是把异步回调代码变成“同步”代码。这个好处要等到后面学了AJAX以后才能体会到
*/
var fibvar = {
  a: 0,
  b: 1,
  n: 0,
  max: 5,
  next: function() {
    var r = this.a, t = this.a + this.b;
    this.a = this.b;
    this.b = t;
    if (this.n < this.max) {
      this.n++;
      return r;
    } else {
      return undefined
    }
  }
}

//没有generator之前的黑暗时代，用AJAX时需要这么写代码
/* 
ajax('http://url-1', data1, function(err, result) {
  if (err) {
    return handle(err);
  }
  ajax('http://url-2', data2, function(err, result) {
    if (err) {
      return handle(err);
    }
    ajax('http://url-3', data3, function(err, result) {
      if (err) {
        return handle(err); 
      }
      return success(result);
    })
  })
})
回调越多，代码越难看。

有了generator的美好时代，用AJAX时可以这么写
try {
  r1 = yield ajax('http://url-1', data1);
  r2 = yield ajax('http://url-2', data2);
  r3 = yield ajax('http://url-3', data3);
  success(r3)
}
看上去是同步的代码，实际执行是异步的
*/

function* next_id() {
  let id = 0
  // console.log(id)
  while(true) {
   console.log(id)
   yield (++id);
  }
  return;
}
// 测试:
var
    x,
    pass = true,
    g = next_id();
for (x = 1; x < 10; x ++) {
    if (g.next().value !== x) {
        pass = false;
        console.log('测试失败!');
        break;
    }
}
if (pass) {
    console.log('测试通过!');
}