//循环
//JavaScript的循环有两种，一种是for循环，通过初始条件、结束条件和递增条件来循环执行语句块
var x = 0
var i
for (let i = 0; i < 1000; i++) {
   x += i
}
console.log('tag', x)
/*
让我们来分析一下for循环的控制条件：

i=1 这是初始条件，将变量i置为1；
i<=10000 这是判断条件，满足时就继续循环，不满足就退出循环；
i++ 这是每次循环后的递增条件，由于每次循环后变量i都会加1，因此它终将在若干次循环后不满足判断条件i<=10000而退出循环。
*/
//for循环最常用的地方是利用索引来遍历数组
var arr = ['apple', 'google', 'microsoft']
var i, x
for (let i = 0; i < arr.length; i++) {
    const element = arr[i];
    console.log(element)
}

//for循环的3个条件都是可以省略的，如果没有退出循环的判断条件，就必须使用break语句退出循环，否则就是死循环
var x = 0
for(;;) {
    if (x > 100) {
        console.log("Break")
        break;
    }
    x++;
}

//for ... in
//for循环的一个变体是for ... in循环，它可以把一个对象的所有属性依次循环出来
//请注意，for ... in对Array的循环得到的是String而不是Number
var o = {
    naem: 'jack',
    age: 20,
    city: 'BeiJing'
}
for (const key in o) {
    if (o.hasOwnProperty(key)) {
        const element = o[key];
        console.log(key + ': ' + element)
    }
}

//由于Array也是对象，而它的每个元素的索引被视为对象的属性，因此，for ... in循环可以直接循环出Array的索引
var arr = ['A', 'B', 'C']
for (const index in arr) {
    console.log('tag', index, ": ", arr[index])
}

//while
//for循环在已知循环的初始和结束条件时非常有用。而上述忽略了条件的for循环容易让人看不清循环的逻辑，此时用while循环更佳
//while循环只有一个判断条件，条件满足，就不断循环，条件不满足时则退出循环。比如我们要计算100以内所有奇数之和，可以用while循环实现
var x = 0
var n = 99
while (n > 0) {
    x += n;
    n -= 2;
}
console.log('tag', x)
//在循环内部变量n不断自减，直到变为-1时，不再满足while条件，循环退出

//do ... while
//最后一种循环是do { ... } while()循环，它和while循环的唯一区别在于，不是在每次循环开始的时候判断条件，而是在每次循环完成的时候判断条件
var n = 0
do {
    n += 1
} while (n < 100)
console.log('tag', n)

//循环是让计算机做重复任务的有效的方法，有些时候，如果代码写得有问题，会让程序陷入“死循环”，也就是永远循环下去。JavaScript的死循环会让浏览器无法正常显示或执行当前页面的逻辑，有的浏览器会直接挂掉，有的浏览器会在一段时间后提示你强行终止JavaScript的执行，因此，要特别注意死循环的问题