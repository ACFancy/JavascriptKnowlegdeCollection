/* 
前面章节小结：
1.JavaScript一切皆对象，对象分类型，typeof 返回的是字符串  数组用Array.isArray()  null 用=== undefind检测变量是否定义
2.Array有slice,splice,concat,join,indexof  map,reduce,filter sort(直接根据比较结果排序，把所有元素转化为字符串，字符串根据ASCII码排)
3.闭包是携带状态的函数，返回的函数没有立即调用，所以不能使用可能改变的变量，返回的函数记录了外部函数的参数和局部变量。
4.function* 生成器函数返回生成器对象，然后通过多次调用yield返回值，也是记录状态的函数。
5.除了null,undefind外都有toString方法
6.避免语法冲突，例如匿名函数调用时要加（）,(123).toString
7.Arrow function 是匿名函数 两种形式 this已经定带词法作用域（自动绑定）。
8.函数定义有两种形式  函数单独调用this指向undefined或者window（非strict）,函数对象调用apply和call方法绑带this（手动绑定）
9，const let 定义块级作用域 var 声明的变量在函数内部就是函数作用域，全局变量都绑定在window上。
10.解构赋值多个变量数组需要用[],一般对象用{}括好，可以缺省，可以有默认值，可以当参数接收对象类对象，Array对象
11.for in 遍历对象属性 for of，forEach遍历集合对象，map对应的是entry
12,对象类对象键值默认只能是字符串，新类型Map的键值可以是其他类型
13,iterable类型的forEach，Array的filer的回调函数有三个参数，元素，索引，self
14.函数可以接受任意个变量，可以不定义参数，通过agruements（不是数组，类似）获取变量值。...rest可变参数（以数组的形式接收）
15.包装对象类型是object
*/

//标准对象
/*
在JavaScript的世界里，一切都是对象
但是某些对象还是和其他对象不太一样。为了区分对象的类型，我们用typeof操作符获取对象的类型，它总是返回一个字符串
可见，number、string、boolean、function和undefined有别于其他类型
特别注意null的类型是object，Array的类型也是object，如果我们用typeof将无法区分出null、Array和通常意义上的object——{}
*/
console.log('123', typeof 123) // number
console.log('NaN', typeof NaN) // number
console.log('\'str\'', typeof 'str') // string
console.log('true', typeof true) // boolean
console.log('undefined', typeof undefined) // undefined
console.log('function', typeof Math.abs) // function
console.log('null', typeof null) // object
console.log('[]', typeof []) // object
console.log('{}', typeof {}) // object

//包装对象
/*
除了这些类型外，JavaScript还提供了包装对象，熟悉Java的小伙伴肯定很清楚int和Integer这种暧昧关系
number、boolean和string都有包装对象。没错，在JavaScript中，字符串也区分string类型和它的包装类型。包装对象用new创建
*/
var n = new Number(123)
var b = new Boolean(true)
var s = new String('str')
console.log('Number(123)', n, typeof n)
console.log('Boolean(true)', b, typeof b)
console.log('String(\'str\')', s, typeof s)
//虽然包装对象看上去和原来的值一模一样，显示出来也是一模一样，但他们的类型已经变为object了！所以，包装对象和原始值用===比较会返回false
console.log('Number(123)', n === 123)
console.log('Boolean(true)', b === true)
console.log('String(\'str\')', s === 'str')
//所以闲的蛋疼也不要使用包装对象！尤其是针对string类型
/* 
如果我们在使用Number、Boolean和String时，没有写new会发生什么情况？

此时，Number()、Boolean和String()被当做普通函数，
把任何类型的数据转换为number、boolean和string类型（注意不是其包装类型
*/
var n1 = Number('123')
var b1 = Boolean('true')
var s1 = String(123.4555)

console.log('Number(123)', n1, typeof n1)
console.log('Boolean(true)', b1, typeof b1)
console.log('String(\'str\')', s1, typeof s1)

/* 
总结一下，有这么几条规则需要遵守
1.不要使用new Number()、new Boolean()、new String()创建包装对象
2.用parseInt()或parseFloat()来转换任意类型到number
3.用String()来转换任意类型到string，或者直接调用某个对象的toString()方法
4.通常不必把任意类型转换为boolean再判断，因为可以直接写if (myVar) {...}
5.typeof操作符可以判断出number、boolean、string、function和undefined
6.判断Array要使用Array.isArray(arr)
7.判断null请使用myVar === null
8.判断某个全局变量是否存在用typeof window.myVar === 'undefined'
9.函数内部判断某个变量是否存在用typeof myVar === 'undefined'
10.最后有细心的同学指出，任何对象都有toString()方法吗？null和undefined就没有！确实如此，这两个特殊值要除外，虽然null还伪装成了object类型
*/
//更细心的同学指出，number对象调用toString()报SyntaxError
// 123.toString()//SyntaxError
//遇到这种情况，要特殊处理一下
123..toString();
(123).toString();

//Date
/** 
 * 在JavaScript中，Date对象用来表示日期和时间
 * 
*/
//要获取系统当前时间
var now = new Date();
console.log('now.getFullYear', now.getFullYear())
console.log('now.getMonth', now.getMonth()) //月份，注意月份范围是0~11，5表示六月
console.log('now.getDate', now.getDate())
console.log('now.getDay', now.getDay())
console.log('now.getHours', now.getHours())
console.log('now.getMinutes', now.getMinutes())
console.log('now.getSeconds', now.getSeconds())
console.log('now.getMilliseconds', now.getMilliseconds())
console.log('now.getTime', now.getTime())

console.log('now.getUTCFullYear', now.getUTCFullYear())
console.log('now.getMonth', now.getUTCMonth())
console.log('now.getUTCDate', now.getUTCDate())
console.log('now.getUTCDay', now.getUTCDay())
console.log('now.getUTCHours', now.getUTCHours())
console.log('now.getUTCMinutes', now.getUTCMinutes())
console.log('now.getUTCSeconds', now.getUTCSeconds())
console.log('now.getUTCMilliseconds', now.getUTCMilliseconds())

//如果要创建一个指定日期和时间的Date对象，可以用
var d = new Date(2019, 3, 8, 19, 0, 30, 700) //年月日时分秒毫秒
console.log('date', d)

/* 
你可能观察到了一个非常非常坑爹的地方，就是JavaScript的月份范围用整数表示是0~11，0表示一月，1表示二月……，所以要表示6月，
我们传入的是5！这绝对是JavaScript的设计者当时脑抽了一下，但是现在要修复已经不可能了
使用Date.parse()时传入的字符串使用实际月份01~12，转换为Date对象后getMonth()获取的月份值为0~11
*/
//第二种创建一个指定日期和时间的方法是解析一个符合ISO 8601格式的字符串
var d = Date.parse('2019-04-09T19:00:30.888+08:00')
console.log('date', d)
//它返回的不是Date对象，而是一个时间戳。不过有时间戳就可以很容易地把它转换为一个Date
var d = new Date(1554807630888)
console.log('date', d)

//时区
/* 
Date对象表示的时间总是按浏览器所在时区显示的，不过我们既可以显示本地时间，也可以显示调整后的UTC时间
那么在JavaScript中如何进行时区转换呢？实际上，只要我们传递的是一个number类型的时间戳，我们就不用关心时区转换。
任何浏览器都可以把一个时间戳正确转换为本地时间
时间戳是个什么东西？时间戳是一个自增的整数，它表示从1970年1月1日零时整的GMT时区开始的那一刻，到现在的毫秒数。
假设浏览器所在电脑的时间是准确的，那么世界上无论哪个时区的电脑，
它们此刻产生的时间戳数字都是一样的，所以，时间戳可以精确地表示一个时刻，并且与时区无关
所以，我们只需要传递时间戳，或者把时间戳从数据库里读出来，再让JavaScript自动转换为当地时间就可以了
*/
var d = new Date(1554807630888)
console.log('date1', d.toLocaleDateString())
console.log('date1', d.toUTCString())
console.log('date1', d.toDateString())
console.log('date1', d.toISOString())
console.log('date1', d.toTimeString())
console.log('date1', d.toLocaleTimeString())

if (Date.now) {
    console.log('now1', Date.now()) // 老版本IE没有now()方法
} else {
    console.log('now2', new Date().getTime())
}

//RegExp
/* 
字符串是编程时涉及到的最多的一种数据结构，对字符串进行操作的需求几乎无处不在。比如判断一个字符串是否是合法的Email地址，
虽然可以编程提取@前后的子串，再分别判断是否是单词和域名，但这样做不但麻烦，

而且代码正则表达式是一种用来匹配字符串的强有力的武器。
它的设计思想是用一种描述性的语言来给字符串定义一个规则，凡是符合规则的字符串，
我们就认为它“匹配”了，否则，该字符串就是不合法的。

所以我们判断一个字符串是否是合法的Email的方法是
1.创建一个匹配Email的正则表达式
2.用该正则表达式去匹配用户的输入来判断是否合法

因为正则表达式也是用字符串表示的，所以，我们要首先了解如何用字符来描述字符
在正则表达式中，如果直接给出字符，就是精确匹配。用\d可以匹配一个数字，\w可以匹配一个字母或数字
1. '00\d'可以匹配'007'，但无法匹配'00A'
2. '\d\d\d'可以匹配'010'
3. '\w\w'可以匹配'js'

.可以匹配任意字符，所以
'js.'可以匹配'jsp'、'jss'、'js!'等等

1.要匹配变长的字符，在正则表达式中，用*表示任意个字符（包括0个）
2.用+表示至少一个字符，
3.用?表示0个或1个字符
4.用{n}表示n个字符，用{n,m}表示n-m个字符

来看一个复杂的例子：\d{3}\s+\d{3,8}
我们来从左到右解读一下:
  1.\d{3}表示匹配3个数字，例如'010'；
  2.\s可以匹配一个空格（也包括Tab等空白符），所以\s+表示至少有一个空格，例如匹配' '，'\t\t'等
  3.\d{3,8}表示3-8个数字，例如'1234567'
综合起来，上面的正则表达式可以匹配以任意个空格隔开的带区号的电话号码

如果要匹配'010-12345'这样的号码呢？由于'-'是特殊字符，在正则表达式中，要用'\'转义，所以，上面的正则是\d{3}\-\d{3,8}
但是，仍然无法匹配'010 - 12345'，因为带有空格。所以我们需要更复杂的匹配方式
*/

//进阶
/* 
要做更精确地匹配，可以用[]表示范围，比如
1. [0-9a-zA-Z\_]可以匹配一个数字、字母或者下划线
2. [0-9a-zA-Z\_]+可以匹配至少由一个数字、字母或者下划线组成的字符串，比如'a100'，'0_Z'，'js2015'等等
3. [a-zA-Z\_\$][0-9a-zA-Z\_\$]*可以匹配由字母或下划线、$开头，后接任意个由一个数字、字母或者下划线、$组成的字符串，也就是JavaScript允许的变量名
4. [a-zA-Z\_\$][0-9a-zA-Z\_\$]{0, 19}更精确地限制了变量的长度是1-20个字符（前面1个字符+后面最多19个字符）

A|B可以匹配A或B，所以(J|j)ava(S|s)cript可以匹配'JavaScript'、'Javascript'、'javaScript'或者'javascript'
^表示行的开头，^\d表示必须以数字开头
$表示行的结束，\d$表示必须以数字结束
你可能注意到了，js也可以匹配'jsp'，但是加上^js$就变成了整行匹配，就只能匹配'js'了
.表示任意字符
*/

//RegExp
/* 
JavaScript有两种方式创建一个正则表达式
1. 第一种方式是直接通过/正则表达式/写出来
2. 第二种方式是通过new RegExp('正则表达式')创建一个RegExp对象
*/
var re1 = /ABC\-001/
var re2 = new RegExp('ABC\\-001')
console.log('re1', re1)
console.log('re2', re2)
//注意，如果使用第二种写法，因为字符串的转义问题，字符串的两个\\实际上是一个\
//先看看如何判断正则表达式是否匹配：
//RegExp对象的test()方法用于测试给定的字符串是否符合条件
var re = /^\d{3}\-\d{3,8}$/
console.log('re', re.test('010-12345')) 
console.log('re', re.test('010-1234X'))
console.log('re', re.test('010 12345'))

//切分字符串
//用正则表达式切分字符串比用固定的字符更灵活，请看正常的切分代码
console.log('split', 'a b   c'.split(' '))
console.log('split', 'a b   c'.split(/\s+/))
console.log('split', 'a,b, c   d'.split(/[\s,]+/))
console.log('split', 'a;b;; c  d'.split(/[\s,;]+/))
//如果用户输入了一组标签，下次记得用正则表达式来把不规范的输入转化成正确的数组

//分组
/*
除了简单地判断是否匹配之外，正则表达式还有提取子串的强大功能。用()表示的就是要提取的分组（Group）
^(\d{3})-(\d{3,8})$分别定义了两个组，可以直接从匹配的字符串中提取出区号和本地号码
*/
var re = /^(\d{3})-(\d{3,8}$)/
console.log('分组', re.exec('010-123123').toString())
console.log('分组', re.exec('010 123455'))

/* 
如果正则表达式中定义了组，就可以在RegExp对象上用exec()方法提取出子串来
exec()方法在匹配成功后，会返回一个Array，第一个元素是正则表达式匹配到的整个字符串，后面的字符串表示匹配成功的子串
exec()方法在匹配失败时返回null
*/
//提取子串非常有用。来看一个更凶残的例子
var re = /^([0-1][0-9]|2[0-3])\:([0-5][0-9])\:([0-5][0-9])$/
console.log('time:', re.exec('19:59:04').toString())

//这个正则表达式可以直接识别合法的时间。但是有些时候，用正则表达式也无法做到完全验证，比如识别日期
//对于'2-30'，'4-31'这样的非法日期，用正则还是识别不了，或者说写出来非常困难，这时就需要程序配合识别了
var re = /^([0]*[1-9]|1[0-2])-(0[1-9]|[0-9]|1[0-9]|2[0-9]|3[0-1])$/
console.log('Date', re.exec('4-31').toString())

//贪婪匹配
//需要特别指出的是，正则匹配默认是贪婪匹配，也就是匹配尽可能多的字符。举例如下，匹配出数字后面的0
var re = /^(\d+)(0*)$/
console.log('000:', re.exec('103020100000').toString())
/*
由于\d+采用贪婪匹配，直接把后面的0全部匹配了，结果0*只能匹配空字符串了
必须让\d+采用非贪婪匹配（也就是尽可能少匹配），才能把后面的0匹配出来，加个?就可以让\d+采用非贪婪匹配
*/
var re = /^(\d+?)(0*)$/
console.log('000:', re.exec('103020100000').toString())

//全局搜索
/* 
JavaScript的正则表达式还有几个特殊的标志，最常用的是g，表示全局匹配
全局匹配可以多次执行exec()方法来搜索一个匹配的字符串
当我们指定g标志后，每次运行exec()，正则表达式本身会更新lastIndex属性，表示上次匹配到的最后索引
*/
var r1 = /test/g
//等价于
var r2 = new RegExp('test', 'g')

var s = 'JavaScript, VBScript, JScript and ECMAScript'
var re = /[a-zA-Z]+Script/g
//使用全局匹配
console.log('tag', re.exec(s).toString())
console.log('tag', re.lastIndex)

console.log('tag', re.exec(s).toString())
console.log('tag', re.lastIndex)

console.log('tag', re.exec(s).toString())
console.log('tag', re.lastIndex)

console.log('tag', re.exec(s).toString())
console.log('tag', re.lastIndex)

console.log('tag', re.exec(s))
console.log('tag', re.lastIndex)
/*
全局匹配类似搜索，因此不能使用/^...$/，那样只会最多匹配一次
正则表达式还可以指定i标志，表示忽略大小写，m标志，表示执行多行匹配
小结
正则表达式非常强大，要在短短的一节里讲完是不可能的。要讲清楚正则的所有内容，可以写一本厚厚的书了。
如果你经常遇到正则表达式的问题，你可能需要一本正则表达式的参考书
*/

//请尝试写一个验证Email地址的正则表达式。版本一应该可以验证出类似的Email
var re = /^\w+\.?(\w+)@\w+\.\w+$/
//测试
var
    i,
    success = true,
    should_pass = ['someone@gmail.com', 'bill.gates@microsoft.com', 'tom@voyager.org', 'bob2015@163.com'],
    should_fail = ['test#gmail.com', 'bill@microsoft', 'bill%gates@ms.com', '@voyager.org'];
for (i = 0; i < should_pass.length; i++) {
    if (!re.test(should_pass[i])) {
        console.log('测试失败: ' + should_pass[i]);
        success = false;
        break;
    }
}
for (i = 0; i < should_fail.length; i++) {
    if (re.test(should_fail[i])) {
        console.log('测试失败: ' + should_fail[i]);
        success = false;
        break;
    }
}
if (success) {
    console.log('测试通过!');
}

//版本二可以验证并提取出带名字的Email地址：
var re = /^<(\w+\s+?\w+)>\s+?(\w+\.?\w+?@\w+\.\w+)$/;
// 测试:
var r = re.exec('<Tom Paris> tom@voyager.org');
if (r === null || r.toString() !== ['<Tom Paris> tom@voyager.org', 'Tom Paris', 'tom@voyager.org'].toString()) {
    console.log('测试失败!');
}
else {
    console.log('测试成功!');
}

//JSON
/* 
JSON是JavaScript Object Notation的缩写，它是一种数据交换格式。
在JSON出现之前，大家一直用XML来传递数据。因为XML是一种纯文本格式，所以它适合在网络上交换数据在JSON出现之前，大家一直用XML来传递数据。因为XML是一种纯文本格式，所以它适合在网络上交换数据在JSON出现之前，大家一直用XML来传递数据。因为XML是一种纯文本格式，所以它适合在网络上交换数据在JSON出现之前，大家一直用XML来传递数据。因为XML是一种纯文本格式，所以它适合在网络上交换数据在JSON出现之前，大家一直用XML来传递数据。因为XML是一种纯文本格式，所以它适合在网络上交换数据在JSON出现之前，大家一直用XML来传递数据。因为XML是一种纯文本格式，所以它适合在网络上交换数据在JSON出现之前，大家一直用XML来传递数据。因为XML是一种纯文本格式，所以它适合在网络上交换数据在JSON出现之前，大家一直用XML来传递数据。
因为XML是一种纯文本格式，所以它适合在网络上交换数据
XML本身不算复杂，但是，加上DTD、XSD、XPath、XSLT等一大堆复杂的规范以后，任何正常的软件开发人员碰到XML都会感觉头大了，最后大家发现，即使你努力钻研几个月，也未必搞得清楚XML的规范
在JSON中，一共就这么几种数据类型：
1. number：和JavaScript的number完全一致；
2. boolean：就是JavaScript的true或false；
3. string：就是JavaScript的string；
4. null：就是JavaScript的null；
6. array：就是JavaScript的Array表示方式——[]；
7. object：就是JavaScript的{ ... }表示方式。
8. 以及上面的任意组合。

JSON还定死了字符集必须是UTF-8，表示多语言就没有问题了。为了统一解析，JSON的字符串规定必须用双引号""，Object的键也必须用双引号"
几乎所有编程语言都有解析JSON的库，而在JavaScript中，我们可以直接使用JSON，因为JavaScript内置了JSON的解析
把任何JavaScript对象变成JSON，就是把这个对象序列化成一个JSON格式的字符串
如果我们收到一个JSON格式的字符串，只需要把它反序列化成一个JavaScript对象，就可以在JavaScript中直接使用这个对象了
*/

//序列化
var xiaoming = {
    name: '雄安',
    age: 14,
    gender: true,
    height: 1.70,
    grade: null,
    'middle-school': '\"W3C\" Middle School',
    skills: ['Javascript', 'Java', 'Python', 'Lisp']
};
var s = JSON.stringify(xiaoming);
console.log('JOSN:', s)
//要输出得好看一些，可以加上参数，按缩进输出
console.log('JSON:', JSON.stringify(xiaoming, null, ' '))
console.log('JSON:', JSON.stringify(xiaoming, null, '-'))
//第二个参数用于控制如何筛选对象的键值，如果我们只想输出指定的属性，可以传入Array
console.log('JSON:', JSON.stringify(xiaoming, ['name', 'age'], ' '))
function convert(key, value) {
    if (typeof value === 'string') {
        return value.toUpperCase()
    }
    return value
}
console.log('JSON:', JSON.stringify(xiaoming, convert, ' '))

//如果我们还想要精确控制如何序列化小明，可以给xiaoming定义一个toJSON()的方法，直接返回JSON应该序列化的数据
var xiaohe = {
    name: 'xuao',
    age: 16,
    gender: true,
    height: 1.8,
    grade: null,
    'middle-school': '\"WC\" Middle School',
    skills: ['Javascript', 'Java', 'Python', 'Lisp'],
    toJSON: function () {
        return {
            //只输出name和age，并且改变了key
            'Name': this.name,
            'Age': this.age
        }
    }
}
console.log('JSON:', JSON.stringify(xiaohe))

//反序列化
//拿到一个JSON格式的字符串，我们直接用JSON.parse()把它变成一个JavaScript对象
console.log('UNJSON:', JSON.parse('[1, 2, 3, true]'))
console.log('UNJSON:', JSON.parse('{"name":"小名", "age":14}'))
console.log('UNJSON:', JSON.parse('true'))
console.log('UNJSON:', JSON.parse('123.45'))

//JSON.parse()还可以接收一个函数，用来转换解析出的属性
var obj = JSON.parse('{"name":"sdsd", "age": 14}', function(key, value) {
    if (key === 'name') {
        return value + '同学';
    }
    return value;
})
console.log('JSON:', JSON.stringify(obj))

/*
var url = 'https://restapi.amap.com/v3/weather/weatherInfo?key=自己申请&city=110101&output=JSON'
$.getJSON(url, function (data) {
    var city = data.lives[0].province + data.lives[0].city;
    var weather = data.lives[0].weather;
    var result = {
        city: city,
        weather: weather
    }
    console.log('Weather:', JSON.stringify(result))
})

$.ajax({
   url: url,
   type: 'get',
   success: function (result) {
       console.log('tag', result)
   }
})
*/