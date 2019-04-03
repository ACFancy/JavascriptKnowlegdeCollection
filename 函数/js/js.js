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
console.log('Date:', buildDate({year: 2019, month: 04, day: 3}))

//也可以传入hour、minute和second属性
console.log('Date:', buildDate({year: 2019, month: 04, day: 3, hour:19, minute: 18, second:59}))
/*
使用解构赋值可以减少代码量，
但是，需要在支持ES6解构赋值特性的现代浏览器中才能正常运行。
目前支持解构赋值的浏览器包括Chrome，Firefox，Edge等
*/