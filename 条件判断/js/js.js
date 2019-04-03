//JavaScript使用if () { ... } else { ... }来进行条件判断
var age = 20;
if (age >= 18) {
    console.log('Dog', 'Adult')
} else {
    console.log('Dog', 'Tennager')
}

//其中else语句是可选的。如果语句块只包含一条语句，那么可以省略{}
//省略{}的危险之处在于，如果后来想添加一些语句，却忘了写{}，就改变了if...else...的语义
//这就是为什么我们建议永远都要写上{}
// age = 10
if (age >= 18)
    console.log('Dog', 'Adult') 
else 
    console.log('Dog', 'Tennager')
console.log('Dog', 'SSS')

//多行条件判断
if (age >= 18) {
  console.log('Dog', 'Adult')
} else if (age >= 6) {
  console.log('Dog', 'Tennager')
} else {
  console.log('Dog', 'kid')
}

//如果if的条件判断语句结果不是true或false怎么办？
//JavaScript把null、undefined、0、NaN和空字符串''视为false，其他值一概视为true，因此上述代码条件判断的结果是true
var s = '123'
if (s.length) {
    console.log('TEST')
}

//例题：
var height = parseFloat(prompt('请输入身高(m):'));
var weight = parseFloat(prompt('请输入体重(kg):'));
// var bmi = weight / (height * height);
// var bmi = weight / (height ^ 2); 
var bmi = weight / Math.pow(height, 2)
if (isNaN(bmi)) {
   console.log('输入有误')
} else if (bmi < 18.5) {
   console.log('过轻')
} else if (bmi < 25) {
   console.log('正常')
} else if (bmi < 28) {
   console.log('过重')
} else if (bmi < 32) {
   console.log('肥胖')
} else {
   console.log('严重肥胖')
}