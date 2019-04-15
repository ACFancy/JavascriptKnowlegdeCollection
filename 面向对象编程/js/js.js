'use strict'
//面向对象编程
/* 
JavaScript的所有数据都可以看成对象，那是不是我们已经在使用面向对象编程了呢？
当然不是。如果我们只使用Number、Array、string以及基本的{...}定义的对象，还无法发挥出面向对象编程的威力
JavaScript的面向对象编程和大多数其他语言如Java、C#的面向对象编程都不太一样。如果你熟悉Java或C#，很好，你一定明白面向对象的两个基本概念
1. 类：类是对象的类型模板，例如，定义Student类来表示学生，类本身是一种类型，Student表示学生类型，但不表示任何具体的某个学生
2. 实例：实例是根据类创建的对象，例如，根据Student类可以创建出xiaoming、xiaohong、xiaojun等多个实例，每个实例表示一个具体的学生，他们全都属于Student类型

所以，类和实例是大多数面向对象编程语言的基本概念
不过，在JavaScript中，这个概念需要改一改。JavaScript不区分类和实例的概念，而是通过原型（prototype）来实现面向对象编程
原型是指当我们想要创建xiaoming这个具体的学生时，我们并没有一个Student类型可用。那怎么办？恰好有这么一个现成的对象
*/
var robot = {
  name: 'Robot',
  height: 2.2,
  run: function() {
    console.log(this.name, ' is running')
  }
}
//我们看这个robot对象有名字，有身高，还会跑，有点像小明，干脆就根据它来“创建”小明得了
//于是我们把它改名为Student，然后创建出xiaoming
var Student = {
  name: 'Robot',
  height: 2.2,
  run: function() {
    console.log(this.name, ' is running')
  }
}

var xiaoming = {
  name: '小明'
}
xiaoming.__proto__ = Student
//注意最后一行代码把xiaoming的原型指向了对象Student，看上去xiaoming仿佛是从Student继承下来的
console.log('Object:', xiaoming.name)
xiaoming.run()
//xiaoming有自己的name属性，但并没有定义run()方法。不过，由于小明是从Student继承而来，只要Student有run()方法，xiaoming也可以调用

//JavaScript的原型链和Java的Class区别就在，它没有“Class”的概念，所有对象都是实例，所谓继承关系不过是把一个对象的原型指向另一个对象而已
var Bird = {
  fly: function() {
    console.log(this.name, ' is flying')
  }
}

xiaoming.__proto__ = Bird
//现在xiaoming已经无法run()了，他已经变成了一只鸟
// xiaoming.run() //Uncaught TypeError: xiaoming.run is not a function
xiaoming.fly()
//在JavaScrip代码运行时期，你可以把xiaoming从Student变成Bird，或者变成任何对象
/* 
请注意，上述代码仅用于演示目的。在编写JavaScript代码时，不要直接用obj.__proto__去改变一个对象的原型，并且，低版本的IE也无法使用__proto__
Object.create()方法可以传入一个原型对象，并创建一个基于该原型的新对象，但是新对象什么属性都没有，因此，我们可以编写一个函数来创建xiaoming
*/
//原型对象
var Student = {
  name: 'Robot',
  height: 2.2,
  run: function () {
    console.log(this.name, ' is running')
  }
}

function createStudent(name) {
  //基于Student原型创建一个新对象
  var s = Object.create(Student)
  s.name = name
  return s
}

var xiaoming1 = createStudent('ming1')
xiaoming1.run()
console.log('Object.create:', xiaoming1.__proto__ === Student , xiaoming1.height)
//这是创建原型继承的一种方法，JavaScript还有其他方法来创建对象
/*
prototype是原型独有的属性,也就是有constructor可以实例化对象的方法才有;
proto是对象才有的属性.
因为js中所有的都是对象,原型虽然有proto属性但是他其实是一个空的方法
对象实例化之后他的__proto__就指向原型的prototype,所以c.__proto__==C.prototype=={constructor:f,其他属性:其他方法}

当调用c.getX()时,首先从c中寻找是否有getX这个属性,如果没有就继续去c.__proto__(C.prototype)中去寻找.
如果没有则继续去c.__proto__.__proto__(C.prototype.__proto__)(Object.prototype)(因为C.prototype是一个实例化的对象所以C.prototype.__proto__==Object.prototype)中去寻找,
如果没有则去c.__proto__.__proto__.__proto__(C.prototype.__proto__.__proto__)(Object.prototype.__proto__)中去寻找
而Object.prototype.__proto__==null,到此寻找结束
所有字面量即 var a = {}的方式,调用的是var a = new Object()的原型
*/
//这里的Object是一个函数，而Object.__proto__是函数原型，而函数的__proto__是Object，所以Student.__proto__ === Object.__proto__.__proto__才是对的
console.log('Object:proto', Student.__proto__ === Object.__proto__.__proto__)
/* 
Student.__proto__ 并不等于Object的，控制台显示的Object应该是说Student.__proto__的类型是Object（Student.__proto__是Object的一个实例），而不是其指向Object对象。Student.__proto__ === Object.prototype 。
事实上，对于任何通过{}创建的对象（比如o1 = {}，相当于o1 = new Object() ），其 o1.__proto__ === Object.prototype；
对于函数（即function对象）（如 function Foo() 或 Foo = new Fuction() ），其Foo.__proto__ === Function.prototype；
对于构造函数创建的对象（例如 f1 = new Foo() 或 new function(){} 后者相当于new匿名构造函数），f1.__proto__ === Foo.prototype；
而对于 Function.prototype 与 Foo.prototype 来说，Function.prototype.__proto__ === Object.prototype，Foo.prototype.__proto__ === Object.prototype ;
对于 Object.prototype 来说，Object.prototype.__proto__ === null，说明Object.prototype是最顶级的
*/
console.log('Object:proto', Student.__proto__ === Object.prototype)
console.log('tag', Student.__proto__)
console.log('tag', Object.prototype)
console.log('tag', Object.__proto__)

var o1 = {}
console.log('tag', o1, o1.__proto__ === Object.prototype)
var o2 = new Object();
console.log('tag', o2, o2.__proto__ === Object.prototype)
var foo = new Function()
console.log('tag', foo.__proto__ === Function.prototype, foo, foo.prototype)
var f1 = new foo()
console.log('tag', f1.__proto__ === foo.prototype, f1, f1.__proto__, f1.prototype, foo.prototype)
console.log('tag', Object.prototype.__proto__)

//创建对象
/* 
JavaScript对每个创建的对象都会设置一个原型，指向它的原型对象
当我们用obj.xxx访问一个对象的属性时，JavaScript引擎先在当前对象上查找该属性，如果没有找到，就到其原型对象上找
，如果还没有找到，就一直上溯到Object.prototype对象最后，如果还没有找到，就只能返回undefined
*/
//例如，创建一个Array对象
var arr = [1, 2, 3]
//其原型链是
/* 
arr --> Array.prototype --> Object.prototype  --> null
*/

//Array.prototype定义了indexOf()、shift()等方法，因此你可以在所有的Array对象上直接调用这些方法

//当我们创建一个函数时
function foo () {
  return 0;
}
//函数也是一个对象，它的原型链是
/*
foo --> Function.prototype --> Object.prototype --> null
*/
//由于Function.prototype定义了apply()等方法，因此，所有函数都可以调用apply()方法
//很容易想到，如果原型链很长，那么访问一个对象的属性就会因为花更多的时间查找而变得更慢，因此要注意不要把原型链搞得太长

//构造函数
//除了直接用{ ... }创建一个对象外，JavaScript还可以用一种构造函数的方法来创建对象。它的用法是，先定义一个构造函数
function Student1(name) {
  this.name = name;
  this.hello = function() {
     console.log('Hello, ', this.name, '!')
  }
}

/* 
你会问，咦，这不是一个普通函数吗？
这确实是一个普通函数，但是在JavaScript中，可以用关键字new来调用这个函数，并返回一个对象
*/
var xiaom = new Student1('ss');
console.log(xiaom.name)
xiaom.hello()
var xiaom2 = new Student1('kk');

/* 
注意，如果不写new，这就是一个普通函数，它返回undefined
但是，如果写了new，它就变成了一个构造函数，它绑定的this指向新创建的对象，并默认返回this，也就是说，不需要在最后写return this;
新创建的xiaom的原型链是
xiaom --> Student1.prototype  --> Object.prototye --> null
也就是说，xiaoming的原型指向函数Student的原型。如果你又创建了xiaohong、xiaojun，那么这些对象的原型与xiaoming是一样的
xiaom    ↘
xiaom2  --> Student1.prototype  --> Object.prototye --> null
xiaom3   ↗
用new Student1()创建的对象还从原型上获得了一个constructor属性，它指向函数Student1本身

注意，Student1.prototype指向的对象就是xiaom、xiaom2的原型对象，这个原型对象自己还有个属性constructor，指向Student1函数本身
另外，函数Student1恰好有个属性prototype指向xiaom、xiaom2的原型对象.
但是xiaom、xiaom2这些对象可没有prototype这个属性，不过可以用__proto__这个非标准用法来查看
现在我们就认为xiaom、xiaom2这些对象“继承”自Student1
*/
console.log(xiaom.constructor === Student1.prototype.constructor)
console.log('liog', xiaom)
console.log(Student1.prototype)
console.log(Student1.prototype.constructor)
console.log(Student1.prototype.constructor === Student1)
console.log(Object.getPrototypeOf(xiaom) === Student1.prototype)
console.log(xiaom instanceof Student1)

console.log(xiaom.name)
console.log(xiaom2.name)
xiaom.hello()
xiaom2.hello()
console.log(xiaom.hello === xiaom2.hello)

/* 
xiaom和xiaom2各自的name不同，这是对的，否则我们无法区分谁是谁了。
xiaom和xiaom2各自的hello是一个函数，但它们是两个不同的函数，虽然函数名称和代码都是相同的！
如果我们通过new Student1()创建了很多对象，这些对象的hello函数实际上只需要共享同一个函数就可以了，这样可以节省很多内存。
要让创建的对象共享一个hello函数，根据对象的属性查找原则，
我们只要把hello函数移动到xiaom、xiaom2这些对象共同的原型上就可以了，也就是Student1.prototype
*/

function Student2(name) {
  this.name = name
}

Student2.prototype.hello = function() {
  console.log('Hello, ', this.name, '!')
}
var xiaon = new Student2('ss');
console.log(xiaon.name)
xiaon.hello()
var xiaon2 = new Student2('kk');
console.log(xiaon.name)
console.log(xiaon2.name)
xiaon.hello()
xiaon2.hello()
console.log(xiaon.hello === xiaon2.hello)
//用new创建基于原型的JavaScript的对象就是这么简单

//忘记写new怎么办
/* 
如果一个函数被定义为用于创建对象的构造函数，但是调用时忘记了写new怎么办？
在strict模式下，this.name = name将报错，因为this绑定为undefined，
在非strict模式下，this.name = name不报错，因为this绑定为window，于是无意间创建了全局变量name，
并且返回undefined，这个结果更糟糕。
所以，调用构造函数千万不要忘记写new。
为了区分普通函数和构造函数，按照约定，构造函数首字母应当大写，而普通函数首字母应当小写，
这样，一些语法检查工具如jslint将可以帮你检测到漏写的new
最后，我们还可以编写一个createStudent()函数，在内部封装所有的new操作。一个常用的编程模式像这样
*/

function Student3(props) {
  this.name = props.name || '匿名'
  this.grade = props.grade || 1;
}

Student3.prototype.hello = function() {
  console.log('Hello, ', this.name, '!')
}

function createStudent3(props) {
  return new Student3(props || {})
}

//这个createStudent()函数有几个巨大的优点：一是不需要new来调用，二是参数非常灵活，可以不传，也可以这么传
var xiaok1 = createStudent3({
  name: 'xiaok'
})

console.log(xiaok1)
//如果创建的对象有很多属性，我们只需要传递需要的某些属性，剩下的属性可以用默认值
//由于参数是一个Object，我们无需记忆参数的顺序。如果恰好从JSON拿到了一个对象，就可以直接创建出xiaok1

//原型继承
/* 
在传统的基于Class的语言如Java、C++中，继承的本质是扩展一个已有的Class，并生成新的Subclass
由于这类语言严格区分类和实例，继承实际上是类型的扩展。但是，JavaScript由于采用原型继承，我们无法直接扩展一个Class，因为根本不存在Class这种类型
但是办法还是有的。我们先回顾Student构造函数
*/

function Student4(props) {
  this.name = props.name || 'Unnamed'
}

Student4.prototype.hello = function() {
  console.log('Hello, ', this.name , '!')
}

//现在，我们要基于Student扩展出PrimaryStudent，可以先定义出PrimaryStudent
// PrimaryStudent构造函数:
function PrimaryStudent(props) {
  //调用Student4构造函数，绑定this变量
  Student4.call(this, props)
  this.grade = props.grade || 1
}
console.log('tag', PrimaryStudent.constructor)
console.log('tag', PrimaryStudent.prototype)
/* 
但是，调用了Student4构造函数不等于继承了Student4，PrimaryStudent创建的对象的原型是
new PrimaryStudent() --> PrimaryStudent.prototype --> Object.prototype --> null
必须想办法把原型链修改为：
new PrimaryStudent() --> PrimaryStudent.prototype --> Student4.prototype --> Object.prototype --> null
这样，原型链对了，继承关系就对了。新的基于PrimaryStudent创建的对象不但能调用PrimaryStudent.prototype定义的方法，
也可以调用Student4.prototype定义的方法
如果你想用最简单粗暴的方法这么干：
PrimaryStudent.prototype = Student4.prototype;
是不行的！如果这样的话，PrimaryStudent和Student共享一个原型对象，那还要定义PrimaryStudent干啥?
我们必须借助一个中间对象来实现正确的原型链，这个中间对象的原型要指向Student.prototype。为了实现这一点，
参考道爷（就是发明JSON的那个道格拉斯）的代码，中间对象可以用一个空函数F来实现
*/

// 空函数F:
function F() {

}
// 把F的原型指向Student.prototype:
F.prototype = Student4.prototype
console.log('tag', F.constructor)
// 把PrimaryStudent的原型指向一个新的F对象，F对象的原型正好指向Student4.prototype:
PrimaryStudent.prototype = new F()
// 把PrimaryStudent原型的构造函数修复为PrimaryStudent:
PrimaryStudent.prototype.constructor = PrimaryStudent
// 继续在PrimaryStudent原型（就是new F()对象）上定义方法：
PrimaryStudent.prototype.getGrade = function() {
  return this.grade
}
console.log('tag', PrimaryStudent.prototype.constructor)
console.log('tag', PrimaryStudent.prototype)
console.log('tagF:', F.prototype)

var xiaof1 = new PrimaryStudent({
  name: 'xf',
  grade: 2
}) 
console.log('tag', xiaof1)

//验证类型
console.log('tag', xiaof1.__proto__ === PrimaryStudent.prototype)
console.log('tag', xiaof1.__proto__.__proto__ === Student4.prototype)

//验证继承关系
console.log('tag', xiaof1 instanceof PrimaryStudent)
console.log('tag', xiaof1 instanceof Student4)

//注意，函数F仅用于桥接，我们仅创建了一个new F()实例，而且，没有改变原有的Student定义的原型链
//如果把继承这个动作用一个inherits()函数封装起来，还可以隐藏F的定义，并简化代码
function inherits(Child, Parent) {
  var F = function(){}
  F.prototype = Parent.prototype
  Child.prototype = new F()
  Child.prototype.constructor = Child
}

//这个inherits()函数可以复用
function PrimaryStudent2(props) {
  Student1.call(this, props)
  this.grade = props.grade || 1;
}
// 实现原型继承链:
inherits(PrimaryStudent2, Student1)
// 绑定其他方法到PrimaryStudent原型:
PrimaryStudent2.prototype.getGrade = function() {
  return this.grade
}
var xiaof2 = new PrimaryStudent2({
  name: 'f2',
  grade: 4
})
console.log('PTag', xiaof2)

//小结
/* 
JavaScript的原型继承实现方式就是：
  1.定义新的构造函数，并在内部用call()调用希望“继承”的构造函数，并绑定this
  2.借助中间函数F实现原型链继承，最好通过封装的inherits函数完成
  3.继续在新的构造函数的原型上定义新方法
  用过桥函数F(){}主要是为了清空构造函数里的属性，如果直接PrimaryStudent.prototype = new Student(),
  PrimaryStudent的原型上就会包含一些不必要的原Student构造函数上的属性
  Student{
    age,
    name
  }
  但是现在PrimaryStudent只需要name，不需要age。如果使用过桥函数的话，PrimaryStudent.age是找不到的，
  但是不使用的话，就会找到age，而且因为是在原型上的。每个PrimaryStudent的实例找到的age都是一样的。
*/

//class继承
/* 
在上面的章节中我们看到了JavaScript的对象模型是基于原型实现的，特点是简单，缺点是理解起来比传统的类－实例模型要困难，
最大的缺点是继承的实现需要编写大量代码，并且需要正确实现原型链。
有没有更简单的写法？有！
新的关键字class从ES6开始正式被引入到JavaScript中。class的目的就是让定义类更简单
我们先回顾用函数实现Students的方法
*/
function Students(name) {
  this.name = name
} 

Students.prototype.hello = function() {
  console.log('Hello, ', this.name, '!')
}

//如果用新的class关键字来编写Students，可以这样写
class Students1 {
  constructor(name) {
    this.name = name
  }

  hello() {
    console.log('Hello, ', this.name, '!')
  }
}
/* 
比较一下就可以发现，class的定义包含了构造函数constructor和定义在原型对象上的函数hello()
（注意没有function关键字），这样就避免了Student.prototype.hello = function () {...}这样分散的代码。
最后，创建一个Student对象代码和前面章节完全一样：
*/
var st1 = new Students1('xs')
st1.hello()
console.log('class:tag', st1);

//class继承
/* 
用class定义对象的另一个巨大的好处是继承更方便了
想一想我们从Student派生一个PrimaryStudent需要编写的代码量
现在，原型继承的中间对象，原型对象的构造函数等等都不需要考虑了，直接通过extends来实现
*/
class PrimaryStudents1 extends Students1 {
  constructor(name, grade) {
    super(name) //记得用super调用父类的构造方法
    this.grade = grade
  }

  myGrade() {
    return 'I am at grade ' + this.grade
  }
}

/* 
注意PrimaryStudent的定义也是class关键字实现的，而extends则表示原型链对象来自Student
子类的构造函数可能会与父类不太相同，例如，PrimaryStudent需要name和grade两个参数，
并且需要通过super(name)来调用父类的构造函数，否则父类的name属性无法正常初始化
PrimaryStudent已经自动获得了父类Student的hello方法，我们又在子类中定义了新的myGrade方法
ES6引入的class和原有的JavaScript原型继承有什么区别呢？
1.实际上它们没有任何区别，class的作用就是让JavaScript引擎去实现原来需要我们自己编写的原型链代码。
2.简而言之，用class的好处就是极大地简化了原型链代码。
你一定会问，class这么好用，能不能现在就用上？
1.现在用还早了点，因为不是所有的主流浏览器都支持ES6的class。
2.如果一定要现在就用上，就需要一个工具把class代码转换为传统的prototype代码，可以试试Babel这个工具
*/
