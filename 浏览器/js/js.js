'use strict'
/* 
由于JavaScript的出现就是为了能在浏览器中运行，所以，浏览器自然是JavaScript开发者必须要关注
目前主流的浏览器分这么几种：
1.IE 6~11：国内用得最多的IE浏览器，历来对W3C标准支持差。从IE10开始支持ES6标准；
2.Chrome：Google出品的基于Webkit内核浏览器，内置了非常强悍的JavaScript引擎——V8。由于Chrome一经安装就时刻保持自升级，所以不用管它的版本，最新版早就支持ES6了
3.Safari：Apple的Mac系统自带的基于Webkit内核的浏览器，从OS X 10.7 Lion自带的6.1版本开始支持ES6，目前最新的OS X 10.11 El Capitan自带的Safari版本是9.x，早已支持ES6
4.Firefox：Mozilla自己研制的Gecko内核和JavaScript引擎OdinMonkey。早期的Firefox按版本发布，后来终于聪明地学习Chrome的做法进行自升级，时刻保持最新
5.移动设备上目前iOS和Android两大阵营分别主要使用Apple的Safari和Google的Chrome，由于两者都是Webkit核心，结果HTML5首先在手机上全面普及（桌面绝对是Microsoft拖了后腿），
  对JavaScript的标准支持也很好，最新版本均支持ES6

其他浏览器如Opera等由于市场份额太小就被自动忽略了。
另外还要注意识别各种国产浏览器，如某某安全浏览器，某某旋风浏览器，它们只是做了一个壳，其核心调用的是IE，也有号称同时支持IE和Webkit的“双核”浏览器
不同的浏览器对JavaScript支持的差异主要是，有些API的接口不一样，比如AJAX，File接口。对于ES6标准，不同的浏览器对各个特性支持也不一样。
在编写JavaScript的时候，就要充分考虑到浏览器的差异，尽量让同一份JavaScript代码能运行在不同的浏览器中.
*/

//浏览器对象
//JavaScript可以获取浏览器提供的很多对象，并进行操作。

//window
/* 
window对象不但充当全局作用域，而且表示浏览器窗口。
window对象有innerWidth和innerHeight属性，可以获取浏览器窗口的内部宽度和高度。内部宽高是指除去菜单栏、工具栏、边框等占位元素后，用于显示网页的净宽高。
兼容性：IE<=8不支持。
对应的，还有一个outerWidth和outerHeight属性，可以获取浏览器窗口的整个宽高
*/

//navigator
/* 
navigator对象表示浏览器的信息，最常用的属性包括：
- navigator.appName：浏览器名称；
- navigator.appVersion：浏览器版本；
- navigator.language：浏览器设置的语言；
- navigator.platform：操作系统类型；
- navigator.userAgent：浏览器设定的User-Agent字符串

请注意，navigator的信息可以很容易地被用户修改，所以JavaScript读取的值不一定是正确的。
很多初学者为了针对不同浏览器编写不同的代码，喜欢用if判断浏览器版本，例如
var width;
if (getIEVersion(navigator.userAgent) < 9) {
    width = document.body.clientWidth;
} else {
    width = window.innerWidth;
}

但这样既可能判断不准确，也很难维护代码。正确的方法是充分利用JavaScript对不存在属性返回undefined的特性，直接用短路运算符||计算
var width = window.innerWidth || document.body.clientWidth;
*/

//screen
/* 
screen对象表示屏幕的信息，常用的属性有
- screen.width：屏幕宽度，以像素为单位
- screen.height：屏幕高度，以像素为单位
- screen.colorDepth：返回颜色位数，如8、16、24
*/

//location
/* 
location对象表示当前页面的URL信息。例如，一个完整的URL
http://www.example.com:8080/path/index.html?a=1&b=2#TOP
可以用location.href获取。要获得URL各个部分的值，可以这么写：
location.protocol; // 'http'
location.host; // 'www.example.com'
location.port; // '8080'
location.pathname; // '/path/index.html'
location.search; // '?a=1&b=2'
location.hash; // 'TOP'

要加载一个新页面，可以调用location.assign()。如果要重新加载当前页面，调用location.reload()方法非常方便。
*/

//document
/* 
document对象表示当前页面。由于HTML在浏览器中以DOM形式表示为树形结构，document对象就是整个DOM树的根节点。
document的title属性是从HTML文档中的<title>xxx</title>读取的，但是可以动态改变

请观察浏览器窗口标题的变化。
要查找DOM树的某个节点，需要从document对象开始查找。最常用的查找是根据ID和Tag Name。
我们先准备HTML数据：
<dl id="drink-menu" style="border:solid 1px #ccc;padding:6px;">
    <dt>摩卡</dt>
    <dd>热摩卡咖啡</dd>
    <dt>酸奶</dt>
    <dd>北京老酸奶</dd>
    <dt>果汁</dt>
    <dd>鲜榨苹果汁</dd>
</dl>
用document对象提供的getElementById()和getElementsByTagName()可以按ID获得一个DOM节点和按Tag名称获得一组DOM节点：
var menu = document.getElementById('drink-menu');
var drinks = document.getElementsByTagName('dt');
var i, s, menu, drinks;

menu = document.getElementById('drink-menu');
menu.tagName; // 'DL'

drinks = document.getElementsByTagName('dt');
s = '提供的饮料有:';
for (i=0; i<drinks.length; i++) {
    s = s + drinks[i].innerHTML + ',';
}
console.log(s);

document对象还有一个cookie属性，可以获取当前页面的Cookie。
Cookie是由服务器发送的key-value标示符。因为HTTP协议是无状态的，但是服务器要区分到底是哪个用户发过来的请求，就可以用Cookie来区分。
当一个用户成功登录后，服务器发送一个Cookie给浏览器，例如user=ABC123XYZ(加密的字符串)...，此后，浏览器访问该网站时，会在请求头附上这个Cookie，服务器根据Cookie即可区分出用户
Cookie还可以存储网站的一些设置，例如，页面显示的语言等等。
JavaScript可以通过document.cookie读取到当前页面的Cookie:
document.cookie;
由于JavaScript能读取到页面的Cookie，而用户的登录信息通常也存在Cookie中，这就造成了巨大的安全隐患，这是因为在HTML页面中引入第三方的JavaScript代码是允许的
<!-- 当前页面在wwwexample.com -->
<html>
    <head>
        <script src="http://www.foo.com/jquery.js"></script>
    </head>
    ...
</html>
如果引入的第三方的JavaScript中存在恶意代码，则www.foo.com网站将直接获取到www.example.com网站的用户登录信息。
为了解决这个问题，服务器在设置Cookie时可以使用httpOnly，设定了httpOnly的Cookie将不能被JavaScript读取。这个行为由浏览器实现，主流浏览器均支持httpOnly选项，IE从IE6 SP1开始支持。
为了确保安全，服务器端在设置Cookie时，应该始终坚持使用httpOnly。
*/

//history(废弃勿用)
/* 
1. history对象保存了浏览器的历史记录，JavaScript可以调用history对象的back()或forward ()
   ，相当于用户点击了浏览器的“后退”或“前进”按钮。
2. 这个对象属于历史遗留对象，对于现代Web页面来说，由于大量使用AJAX和页面交互，简单粗暴地调用history.back()
   可能会让用户感到非常愤怒。
3.新手开始设计Web页面时喜欢在登录页登录成功时调用history.back()，试图回到登录前的页面。这是一种错误的方法。
4. 任何情况，你都不应该使用history这个对象了。
*/

//操作DOM
/*
由于HTML文档被浏览器解析后就是一棵DOM树，要改变HTML的结构，就需要通过JavaScript来操作DOM。
始终记住DOM是一个树形结构。操作一个DOM节点实际上就是这么几个操作
1. 更新：更新该DOM节点的内容，相当于更新了该DOM节点表示的HTML的内容
2. 遍历：遍历该DOM节点下的子节点，以便进行进一步操作
3. 添加：在该DOM节点下新增一个子节点，相当于动态增加了一个HTML节点
4. 添加：在该DOM节点下新增一个子节点，相当于动态增加了一个HTML节点

在操作一个DOM节点前，我们需要通过各种方式先拿到这个DOM节点。
1. 最常用的方法是document.getElementById()
2. document.getElementsByTagName()，
3. 以及CSS选择器document.getElementsByClassName()

由于ID在HTML文档中是唯一的，所以document.getElementById()可以直接定位唯一的一个DOM节点。
document.getElementsByTagName()和document.getElementsByClassName()总是返回一组DOM节点。
要精确地选择DOM，可以先定位父节点，再从父节点开始选择，以缩小范围。

//返回Id为test的节点
var test = document.getElementById('test')

//先定位id为test-table的节点，再返回其内部所有的tr节点
var trs = document.getElementById('test-table').getElementsByTagName('tr')

//先定位id为test-div的节点，再返回其内部所有class包含red的节点
var reds = document.getElementById('test-div').getElementsByClassName('red');

//获取节点test下的所有直属子节点
var cs = test.children

//获取节点test下第一个、最后一个子节点
var first = test.firstElementChild
var last = test.lastElementChild

第二种方法是使用querySelector()和querySelectorAll()，需要了解selector语法，然后使用条件来获取节点，更加方便:
//通过querySelector获取ID为q1的节点：
var q1 = document.querySelector('#q1')

//通过querySelectorAll获取q1节点内的符合条件的所有节点：
var ps = document.querySelectorAll('div.higlighted > p')
注意：低版本的IE<8不支持querySelector和querySelectorAll。IE8仅有限支持。

严格地讲，我们这里的DOM节点是指Element，但是DOM节点实际上是Node
在HTML中，Node包括Element、Comment、CDATA_SECTION等很多种，以及根节点Document类型
但是，绝大多数时候我们只关心Element，也就是实际控制页面结构的Node，其他类型的Node忽略即可
根节点Document已经自动绑定为全局变量document。

<!-- HTML结构 -->
<div id="test-div">
<div class="c-red">
    <p id="test-p">JavaScript</p>
    <p>Java</p>
  </div>
  <div class="c-red c-green">
    <p>Python</p>
    <p>Ruby</p>
    <p>Swift</p>
  </div>
  <div class="c-green">
    <p>Scheme</p>
    <p>Haskell</p>
  </div>
</div>

// 选择<p>JavaScript</p>:
var js = document.getElementById('test-p');

// 选择<p>Python</p>,<p>Ruby</p>,<p>Swift</p>:
//var arr = document.getElementsByClassName('c-red c-green')[0].getElementsByTagName('p');
var arr = document.getElementsByClassName('c-red c-green')[0].children;
var arr = document.querySelectorAll('.c-red.c-green > p')
console.log(arr.length)

// 选择<p>Haskell</p>:
//var haskell = document.getElementsByClassName('c-green')[1].lastElementChild;
//var haskell = document.getElementById('test-div').lastElementChild.lastElementChild
var haskell = document.querySelector('.c-green:last-child p:last-child')
console.log(haskell.innerText)
*/

//更新DOM
/* 
拿到一个DOM节点后，我们可以对它进行更新。

可以直接修改节点的文本，方法有两种：
1. 一种是修改innerHTML属性，这个方式非常强大，不但可以修改一个DOM节点的文本内容，还可以直接通过HTML片段修改DOM节点内部的子树

*/
//获取<p id="p-id">...</p>
var p = document.getElementById('p-id')
// 设置文本为abc
p.innerHTML = 'ABC'
//设置html
p.innerHTML = 'ABC <span style="color:red">Red</span> xyz'

//用innerHTML时要注意，是否需要写入HTML。如果写入的字符串是通过网络拿到了，要注意对字符编码来避免XSS攻击。
//第二种是修改innerText或textContent属性，这样可以自动对字符串进行HTML编码，保证无法设置任何HTML标签
//获取<p id="p-id2">...</p>
var p2 = document.getElementById('p-id2')
p2.innerText = '<script>console.log("Test")</script>'
//HTML被自动编码，无法设置一个<script>节点:
//两者的区别在于读取属性时，innerText不返回隐藏元素的文本，而textContent返回所有文本。另外注意IE<9不支持textContent。
/* 
修改CSS也是经常需要的操作。DOM节点的style属性对应所有的CSS，可以直接获取或设置。因为CSS允许font-size这样的名称，
但它并非JavaScript有效的属性名，所以需要在JavaScript中改写为驼峰式命名fontSize：
*/
p.style.color = '#00ff00'
p.style.fontSize = '30px'
p.style.paddingTop = '2em'

//插入DOM
/* 
当我们获得了某个DOM节点，想在这个DOM节点内插入新的DOM，应该如何做？
如果这个DOM节点是空的，例如，<div></div>，那么，直接使用innerHTML = '<span>child</span>'就可以修改DOM节点的内容，相当于“插入”了新的DOM节点。
如果这个DOM节点不是空的，那就不能这么做，因为innerHTML会直接替换掉原来的所有子节点。
有两个办法可以插入新的节点。一个是使用appendChild，把一个子节点添加到父节点的最后一个子节点。例如：
*/
//appendChild
//把<p id="js">JavaScript</p>添加到<div id="list">的最后一项：
var js = document.getElementById('js'),
    list = document.getElementById('list')
list.appendChild(js)
//因为我们插入的js节点已经存在于当前的文档树，因此这个节点首先会从原先的位置删除，再插入到新的位置。
//更多的时候我们会从零创建一个新的节点，然后插入到指定位置：
var haskell = document.createElement('p');
haskell.id = 'haskell'
haskell.innerText = 'Haskell'
list.appendChild(haskell)

/* 
动态创建一个节点然后添加到DOM树中，可以实现很多功能。
举个例子，下面的代码动态创建了一个<style>节点，然后把它添加到<head>节点的末尾，这样就动态地给文档添加了新的CSS定义：
*/
var d = document.createElement('style')
d.setAttribute('type', 'text/css')
d.innerHTML = 'p {color: red}'
document.getElementsByTagName('head')[0].appendChild(d)

//insertBefore
/* 
如果我们要把子节点插入到指定的位置怎么办？
可以使用parentElement.insertBefore(newElement, referenceElement);，子节点会插入到referenceElement之前。
还是以上面的HTML为例，假定我们要把Haskell插入到Python之前：
*/

var python = document.getElementById('python')
list.insertBefore(haskell, python)
/* 
可见，使用insertBefore重点是要拿到一个“参考子节点”的引用。
很多时候，需要循环一个父节点的所有子节点，可以通过迭代children属性实现
*/
var i, c;
for(i = 0; i < list.children.length; i++) {
    c = list.children[i] //拿到第i个子节点
    console.log(c.tagName, c.innerHTML)
}

//删除DOM
/* 
删除一个DOM节点就比插入要容易得多
要删除一个节点，首先要获得该节点本身以及它的父节点，然后，调用父节点的removeChild把自己删掉
注意到删除后的节点虽然不在文档树中了，但其实它还在内存中，可以随时再次被添加到别的位置。
当你遍历一个父节点的子节点并进行删除操作时，要注意，children属性是一个只读属性，并且它在子节点变化时会实时更新
*/

//拿到待删除节点
var self = document.getElementById('to-be-removed')
//拿到父节点
var parent = self.parentElement;
//删除
var removed = parent.removeChild(self)

console.log('tag',removed === self)

//当我们用如下代码删除子节点时
var parent = document.getElementById('parent')
parent.removeChild(parent.children[0])
/*
浏览器报错：parent.children[1]不是一个有效的节点。
原因就在于，当<p>First</p>节点被删除后，
parent.children的节点数量已经从2变为了1，索引[1]已经不存在了。
因此，删除多个节点时，要注意children属性时刻都在变化。
*/
// parent.removeChild(parent.children[1]) // <-- 浏览器报错
parent.removeChild(parent.children[0])

//操作表单
/*
用JavaScript操作表单和操作DOM是类似的，因为表单本身也是DOM树。
不过表单的输入框、下拉框等可以接收用户输入，所以用JavaScript来操作表单，可以获得用户输入的内容，或者对一个输入框设置新的内容。
HTML表单的输入控件主要有以下几种：
1. 文本框，对应的<input type="text">，用于输入文本
2. 口令框，对应的<input type="password">，用于输入口令
3. 单选框，对应的<input type="radio">，用于选择一项
4. 复选框，对应的<input type="checkbox">，用于选择多项
5. 下拉框，对应的<select>，用于选择一项
6. 隐藏文本，对应的<input type="hidden">，用户不可见，但表单提交时会把隐藏文本发送到服务器
*/

//获取值
/* 
如果我们获得了一个<input>节点的引用，就可以直接调用value获得对应的用户输入值：
*/
var input = document.getElementById('email')
console.log(input.value)

/* 
这种方式可以应用于text、password、hidden以及select。但是，对于单选框和复选框，
value属性返回的永远是HTML预设的值，而我们需要获得的实际是用户是否“勾上了”选项，所以应该用checked判断：
*/
var mon = document.getElementById('monday')
var tue = document.getElementById('tuesday')
console.log(mon.value, mon.checked, tue.value, tue.checked)

//设置值
//对于单选框和复选框，设置checked为true或false即可。
input.value = "test@example.com"
mon.checked = true

//HTML5控件
/*
HTML5新增了大量标准控件，常用的包括date、datetime、datetime-local、color等，它们都使用<input>标签
不支持HTML5的浏览器无法识别新的控件，会把它们当做type="text"来显示。支持HTML5的浏览器将获得格式化的字符串。
例如，type="date"类型的input的value将保证是一个有效的YYYY-MM-DD格式的日期，或者空字符串。
*/

//提交表单
/*
最后，JavaScript可以以两种方式来处理表单的提交（AJAX方式在后面章节介绍）。
方式一是通过<form>元素的submit()方法提交一个表单，例如，响应一个<button>的click事件，在JavaScript代码中提交表单
这种方式的缺点是扰乱了浏览器对form的正常提交。浏览器默认点击<button type="submit">时提交表单，或者用户在最后一个输入框按回车键。
因此，第二种方式是响应<form>本身的onsubmit事件，在提交form时作修改：
在检查和修改<input>时，要充分利用<input type="hidden">来传递数据
 */
function doSubmitForm() {
    var form = document.getElementById('test-form')
    form.submit()
}

function checkForm() {
    var form = document.getElementById('test-form1') 
    // 可以在此修改form的input...
    // 继续下一步:
    return true
}

/*
例如，很多登录表单希望用户输入用户名和口令，
但是，安全考虑，提交表单时不传输明文口令，而是口令的MD5。
普通JavaScript开发人员会直接修改<input>：
*/
function checkLoginForm() {
    var pwd = document.getElementById('password')
    pwd.value = '********************************'
    return true
}

/* 
这个做法看上去没啥问题，但用户输入了口令提交时，口令框的显示会突然从几个*变成32个*（因为MD5有32个字符）。
要想不改变用户的输入，可以利用<input type="hidden">实现：
注意到id为md5-password的<input>标记了name="password"，
而用户输入的id为password的<input>没有name属性。没有name属性的<input>的数据不会被提交。
*/
function checkLoginForm() {
    var pwd = document.getElementById('password')
    var md5_pwd = document.getElementById('md5-password')
    md5_pwd.value = toMD5(pwd.value)
    pwd.value = '********************************'
    return true
}

var checkRegisterForm = function () {
    var userName=document.getElementById("username3").value,
        password=document.getElementById("password3").value,
        passwordTwo=document.getElementById("password-3").value,
        userNameRegx=/^\w{3,10}$/,
        passwordRegx=/^.{6,20}$/
         console.log(userName + ' ' + password)

if (!userNameRegx.exec(userName)) {
   alert("必须是3-10位英文字母或数字")
   return false
}

if (!passwordRegx.exec(password)) {
   alert("口令必须是6-20位")
   return false
}

if (password !== passwordTwo) {
   alert("两次输入口令必须一致")
   return false
}
return true
}

//操作文件
/*
在HTML表单中，可以上传文件的唯一控件就是<input type="file">
注意：当一个表单包含<input type="file">时，表单的enctype必须指定为multipart/form-data，
method必须指定为post，浏览器才能正确编码并以multipart/form-data格式发送表单的数据。
出于安全考虑，浏览器只允许用户点击<input type="file">来选择本地文件，
用JavaScript对<input type="file">的value赋值是没有任何效果的。
当用户选择了上传某个文件后，JavaScript也无法获得该文件的真实路径

通常，上传的文件都由后台服务器处理，JavaScript可以在提交表单时对文件扩展名做检查，以便防止用户上传无效格式的文件
*/

function checkFileUploadForm() {
    var f = document.getElementById('test-file-upload')
    var filename = f.value
    console.log(filename)
    alert('Pause')
    if (!filename || !(filename.endsWith('.jpg') || filename.endsWith('.png') || filename.endsWith('.gif'))) {
        alert('Can only upload image file')
        return false
    }
    alert('Pause')
    return true
}

//File API
/* 
由于JavaScript对用户上传的文件操作非常有限，尤其是无法读取文件内容
使得很多需要操作文件的网页不得不用Flash这样的第三方插件来实现
随着HTML5的普及，新增的File API允许JavaScript读取文件内容，获得更多的文件信息
HTML5的File API提供了File和FileReader两个主要对象，可以获得文件信息并读取文件。
下面的例子演示了如何读取用户选取的图片文件，并在一个<div>中预览图像
*/

var fileInput = document.getElementById('test-image-file'),
    info = document.getElementById('test-file-info'),
    preview = document.getElementById('test-image-preview');

//监听change事件
fileInput.addEventListener('change', function(){
    //清除背景图片
    preview.style.backgroundImage = '';
    //检查是否选择
    if (!fileInput.value) {
        info.innerHTML = '没有选择文件'
        return
    }
    //获取文件引用
    var file = fileInput.files[0];
    //获取文件信息
    info.innerHTML = '文件：' + file.name + '<br>' + 
                     '大小：' + file.size + '<br>' +
                     '修改：' + file.lastModifiedDate;
    alert('Pause' + file.type)
    if (file.type !== 'image/jpeg' && file.type !== 'image/png' && file.type !== 'image/gif') {
        alert('不是有效图片')
        return
    }
    //读取文件
    var reader = new FileReader();
    reader.onload = function(e){
        var data = e.target.result; // 'data:image/jpeg;base64,'
        alert('Pause ' + data)
        preview.style.backgroundImage = 'url(' + data + ')'
    };
    //以DataURL的形式读取文件
    reader.readAsDataURL(file)
})
/* 
上面的代码演示了如何通过HTML5的File API读取文件内容。以DataURL的形式读取到的文件是一个字符串
，类似于data:image/jpeg;base64,/9j/4AAQSk...(base64编码)...，常用于设置图像。
如果需要服务器端处理，把字符串base64,后面的字符发送给服务器并用Base64解码就可以得到原始文件的二进制内容。
*/

//回调
/* 
上面的代码还演示了JavaScript的一个重要的特性就是单线程执行模式
在JavaScript中，浏览器的JavaScript执行引擎在执行JavaScript代码时，总是以单线程模式执行，
也就是说，任何时候，JavaScript代码都不可能同时有多于1个线程在执行。

你可能会问，单线程模式执行的JavaScript，如何处理多任务？
在JavaScript中，执行多任务实际上都是异步调用，比如上面的代码
reader.readAsDataURL(file);

就会发起一个异步操作来读取文件内容。因为是异步操作，
所以我们在JavaScript代码中就不知道什么时候操作结束，因此需要先设置一个回调函数

reader.onload = function(e) {
    // 当文件读取完成后，自动调用此函数:
};

当文件读取完成后，JavaScript引擎将自动调用我们设置的回调函数。
执行回调函数时，文件已经读取完毕，所以我们可以在回调函数内部安全地获得文件内容。
*/

//AJAX
/* 
AJAX不是JavaScript的规范，它只是一个哥们“发明”的缩写：
Asynchronous JavaScript and XML，意思就是用JavaScript执行异步网络请求。

如果仔细观察一个Form的提交，你就会发现，一旦用户点击“Submit”按钮，表单开始提交，浏览器就会刷新页面，
然后在新页面里告诉你操作是成功了还是失败了。如果不幸由于网络太慢或者其他原因，就会得到一个404页面。
这就是Web的运作原理：一次HTTP请求对应一个页面。
如果要让用户留在当前页面中，同时发出新的HTTP请求，就必须用JavaScript发送这个新请求，接收到数据后，
再用JavaScript更新页面，这样一来，用户就感觉自己仍然停留在当前页面，但是数据却可以不断地更新。

最早大规模使用AJAX的就是Gmail，Gmail的页面在首次加载后，剩下的所有数据都依赖于AJAX来更新
用JavaScript写一个完整的AJAX代码并不复杂，但是需要注意：AJAX请求是异步执行的，也就是说，要通过回调函数获得响应。
在现代浏览器上写AJAX主要依靠XMLHttpRequest对象
*/
function success(text) {
    var textarea = document.getElementById('test-response-text');
    textarea.innerText = text
}

function fail(code) {
    var textarea = document.getElementById('test-response-text');
    textarea.innerText = 'Error Code:' + code
}

//新建XMLHttpRequest对象
var request = new XMLHttpRequest()
//状态发生变化时，函数被回调
request.onreadystatechange = function() {
    if (request.readyState === 4) {
        //成功完成
        //判断响应结果
        if (request.status === 200) {
            return success(request.responseText)
        } else {
            return fail(request.status)
        }
    } else {
        //HTTP请求还在继续
    }
}

function onRequestClick() {
    request.open('GET', 'https://www.liaoxuefeng.com/api/categories')
    request.send()
    alert('请求已发送，请等待。。。')
}

//对于低版本的IE，需要换一个ActiveXObject对象：
//新建Miccrosoft.XMLHTTP对象
var request1 
if (window.XMLHttpRequest) {
    request1 = new XMLHttpRequest()
} else {
    request1 = new ActiveXObject('Microsoft.XMLHTTP')
}

//状态发生变化时，函数被回调
request1.onreadystatechange = function() {
    if (request1.readyState === 4) {
        //成功完成
        //判断响应结果
        if (request1.status === 200) {
            return success(request1.responseText)
        } else {
            return fail(request1.status)
        }
    } else {
        //HTTP请求还在继续
    }
}

function onRequestClick1() {
    alert('请求已发送，请等待。。。')
    request1.open('GET', 'https://www.liaoxuefeng.com/api/categories')
    request1.send()
    alert('请求已发送，请等待。。。')
}

var tempReq;
if (window.XMLHttpRequest) {
    tempReq = new XMLHttpRequest()
} else {
    tempReq = new ActiveXObject('Microsoft.XMLHTTP')
}

/*
通过检测window对象是否有XMLHttpRequest属性来确定浏览器是否支持标准的XMLHttpRequest。
注意，不要根据浏览器的navigator.userAgent来检测浏览器是否支持某个JavaScript特性
1. 因为这个字符串本身可以伪造
2. 通过IE版本判断JavaScript特性将非常复杂

当创建了XMLHttpRequest对象后，要先设置onreadystatechange的回调函数。在回调函数中，
通常我们只需通过readyState === 4判断请求是否完成，如果已完成，再根据status === 200判断是否是一个成功的响应。

XMLHttpRequest对象的open()方法有3个参数，
第一个参数指定是GET还是POST，
第二个参数指定URL地址，
第三个参数指定是否使用异步，默认是true，所以不用写
注意，千万不要把第三个参数指定为false，否则浏览器将停止响应，直到AJAX请求完成。
如果这个请求耗时10秒，那么10秒内你会发现浏览器处于“假死”状态。

最后调用send()方法才真正发送请求。GET请求不需要参数，POST请求需要把body部分以字符串或者FormData对象传进去
*/

//安全限制
/* 
上面代码的URL使用的是相对路径。如果你把它改为'http://www.sina.com.cn/'，再运行，肯定报错。
在Chrome的控制台里，还可以看到错误信息
这是因为浏览器的同源策略导致的。默认情况下，JavaScript在发送AJAX请求时，URL的域名必须和当前页面完全一致
完全一致的意思是，域名要相同（www.example.com和example.com不同），协议要相同（http和https不同），端口号要相同（默认是:80端口，它和:8080就不同）。
有的浏览器口子松一点，允许端口不同，大多数浏览器都会严格遵守这个限制。

那是不是用JavaScript无法请求外域（就是其他网站）的URL了呢？方法还是有的，大概有这么几种：
1. 通过Flash插件发送HTTP请求，这种方式可以绕过浏览器的安全限制，但必须安装Flash，并且跟Flash交互。不过Flash用起来麻烦，而且现在用得也越来越少了。
2. 通过在同源域名下架设一个代理服务器来转发，JavaScript负责把请求发送到代理服务器：
    '/proxy?url=http://www.sina.com.cn'
   代理服务器再把结果返回，这样就遵守了浏览器的同源策略。这种方式麻烦之处在于需要服务器端额外做开发。
3. 第三种方式称为JSONP，它有个限制，只能用GET请求，并且要求返回JavaScript。
   这种方式跨域实际上是利用了浏览器允许跨域引用JavaScript资源
   <html>
    <head>
      <script src="http://example.com/abc.js"></script>
      ...
    </head>
    <body>
        ...
    </body>
   </html>
   JSONP通常以函数调用的形式返回，例如，返回JavaScript内容如下：
     foo('data');
    这样一来，我们如果在页面中先准备好foo()函数，然后给页面动态加一个<script>节点，
    相当于动态读取外域的JavaScript资源，最后就等着接收回调了。 
*/

function refreshPrice(data) {
    var p = document.getElementById('test-jsonp')
    p.innerHTML = '当前价格：' + 
                  data['0000001'].name + ': ' +  
                  data['0000001'].price + ': ' +  
                  data['1399001'].name + ': ' +  
                  data['1399001'].price;
}

function getPrice() {
    var js = document.createElement('script'),
        head = document.getElementsByTagName('head')[0];
    js.src = 'http://api.money.126.net/data/feed/0000001,1399001?callback=refreshPrice'
    head.appendChild(js)
}

//就完成了跨域加载数据。

//CORS
/* 
如果浏览器支持HTML5，那么就可以一劳永逸地使用新的跨域策略：CORS了。
CORS全称Cross-Origin Resource Sharing，是HTML5规范定义的如何跨域访问资源。
了解CORS前，我们先搞明白概念：
Origin表示本域，也就是浏览器当前页面的域。
当JavaScript向外域（如sina.com）发起请求后，浏览器收到响应后，首先检查Access-Control-Allow-Origin是否包含本域，
如果是，则此次跨域请求成功
如果不是，则请求失败，JavaScript将无法获取到响应的任何数据。

假设本域是my.com，外域是sina.com，只要响应头Access-Control-Allow-Origin为http://my.com，或者是*，本次请求就可以成功。
可见，跨域能否成功，取决于对方服务器是否愿意给你设置一个正确的Access-Control-Allow-Origin，决定权始终在对方手中。
上面这种跨域请求，称之为“简单请求”。简单请求包括GET、HEAD和POST（POST的Content-Type类型
仅限application/x-www-form-urlencoded、multipart/form-data和text/plain），
并且不能出现任何自定义头（例如，X-Custom: 12345），通常能满足90%的需求
无论你是否需要用JavaScript通过CORS跨域请求资源，你都要了解CORS的原理。
最新的浏览器全面支持HTML5。在引用外域资源时，除了JavaScript和CSS外，都要验证CORS。
例如，当你引用了某个第三方CDN上的字体文件时：
如果该CDN服务商未正确设置Access-Control-Allow-Origin，那么浏览器无法加载字体资源。

对于PUT、DELETE以及其他类型如application/json的POST请求，在发送AJAX请求之前，
浏览器会先发送一个OPTIONS请求（称为preflighted请求）到这个URL上，询问目标服务器是否接受：
OPTIONS /path/to/resource HTTP/1.1
Host: bar.com
Origin: http://my.com
Access-Control-Request-Method: POST

服务器必须响应并明确指出允许的Method：
HTTP/1.1 200 OK
Access-Control-Allow-Origin: http://my.com
Access-Control-Allow-Methods: POST, GET, PUT, OPTIONS
Access-Control-Max-Age: 86400

浏览器确认服务器响应的Access-Control-Allow-Methods头确实包含将要发送的AJAX请求的Method，才会继续发送AJAX，
否则，抛出一个错误。
由于以POST、PUT方式传送JSON格式的数据在REST中很常见，所以要跨域正确处理POST和PUT请求，服务器端必须正确响应OPTIONS请求。
*/

//Promise
/* 
在JavaScript的世界中，所有代码都是单线程执行的。
由于这个“缺陷”，导致JavaScript的所有网络操作，浏览器事件，都必须是异步执行。异步执行可以用回调函数实现：
*/

function callback() {
    console.log('Done')
}

console.log('Before setTimeout()')
setTimeout(callback, 2000)
console.log('After setTimeout')
/* 
观察上述代码执行，在Chrome的控制台输出可以看到：
before setTimeout()
after setTimeout()
(等待2秒后)
Done
可见，异步操作会在将来的某个时间点触发一个函数调用。

AJAX就是典型的异步操作。以上一节的代码为例：
request.onreadystatechange = function () {
    if (request.readyState === 4) {
        if (request.status === 200) {
            return success(request.responseText);
        } else {
            return fail(request.status);
        }
    }
}

把回调函数success(request.responseText)和fail(request.status)写到一个AJAX操作里很正常，
但是不好看，而且不利于代码复用
有没有更好的写法？比如写成这样：
var ajax = ajaxGet('http://...');
ajax.ifSuccess(success)
    .ifFail(fail);
这种链式写法的好处在于，先统一执行AJAX逻辑，不关心如何处理结果，
然后，根据结果是成功还是失败，在将来的某个时候调用success函数或fail函数。
古人云：“君子一诺千金”，这种“承诺将来会执行”的对象在JavaScript中称为Promise对象
Promise有各种开源实现，在ES6中被统一规范，由浏览器直接支持。先测试一下你的浏览器是否支持Promise：
*/
new Promise(()=>{})
console.log('Promise', 'Support')

//我们先看一个最简单的Promise例子：生成一个0-2之间的随机数，如果小于1，则等待一段时间后返回成功，否则返回失败：
function test(resolve, reject) {
    var timeOut = Math.random() * 2;
    console.log('set timeout to:' + timeOut + ' seconds.')
    setTimeout(function() {
        if (timeOut < 1) {
            console.log('call resolve() ...')
            resolve('200 OK')
        } else {
            console.log('call reject() ...')
            reject('timeout in ' + timeOut + ' seconds')
        }
    }, timeOut * 1000)
}

/*
这个test()函数有两个参数，这两个参数都是函数
如果执行成功，我们将调用resolve('200 OK')
如果执行失败，我们将调用reject('timeout in ' + timeOut + ' seconds.')
可以看出，test()函数只关心自身的逻辑，并不关心具体的resolve和reject将如何处理结果

有了执行函数，我们就可以用一个Promise对象来执行它，并在将来某个时刻获得成功或失败的结果:
*/
var p1 = new Promise(test)
var p2 = p1.then(function(result) {
    console.log('成功：', result)
})
var p3 = p2.catch(function(reson) {
    console.log('失败', reson)
})

/* 
量p1是一个Promise对象，它负责执行test函数。
由于test函数在内部是异步执行的，当test函数执行成功时，我们告诉Promise对象：
// 如果成功，执行这个函数：
p1.then(function (result) {
    console.log('成功：' + result);
});

当test函数执行失败时，我们告诉Promise对象：
p2.catch(function (reason) {
    console.log('失败：' + reason);
});

Promise对象可以串联起来，所以上述代码可以简化为：
new Promise(test).then(function (result) {
    console.log('成功：' + result);
}).catch(function (reason) {
    console.log('失败：' + reason);
});
*/

var logging = document.getElementById('test-promise-log')
while(logging.children.length > 1) {
    logging.removeChild(logging.children[logging.children.length - 1])
}

//输出log到页面
function log(s) {
    var p =  document.createElement('p')
    p.innerHTML = s
    logging.appendChild(p)
}

new Promise(test).then(function(r){
    log('Done:' + r)
}).catch(function(reason) {
    log('Failed ' + reason)
})

/* 
可见Promise最大的好处是在异步执行的流程中，把执行代码和处理结果的代码清晰地分离了：
Promise还可以做更多的事情，
比如，有若干个异步任务，需要先做任务1，
如果成功后再做任务2，任何任务失败则不再继续并执行错误处理函数。
要串行执行这样的异步任务，不用Promise需要写一层一层的嵌套代码。有了Promise，我们只需要简单地写：
job1.then(job2).then(job3).catch(handleError);
其中，job1、job2和job3都是Promise对象。
下面的例子演示了如何串行执行一系列需要异步计算获得结果的任务：
*/
//0.5s后返回input * input的计算结果
function multipy(input) {
    return new Promise(function(resolve, reject) {
        log('calculating ' + input + ' x ' + input + '...')
        setTimeout(resolve, 500, input * input)
    })
}

//0.5s后返回input + input的计算结果
function add(input) {
    return new Promise(function(resolve, reject){
        log('calculating ' + input + ' + ' + input + '...')
        setTimeout(resolve, 500, input + input)
    })
}

var p = new Promise(function(resolve, reject) {
    log('start new Promise')
    resolve(12)
}) ;

p.then(multipy)
 .then(add)
 .then(multipy)
 .then(add)
 .then(function(result) {
     log('Get value: ' + result)
 })

 //setTimeout可以看成一个模拟网络等异步执行的函数。现在，我们把上一节的AJAX异步执行函数转换为Promise对象，看看用Promise如何简化异步处理：
 // ajax函数将返回Promise对象
 function ajax(method, url, data) {
     var request = new XMLHttpRequest()
     return new Promise(function(resolve, reject) {
         request.onreadystatechange = function() {
             if (request.readyState === 4) {
                 if (request.status === 200) {
                     resolve(request.responseText)
                 } else {
                     reject(request.status)
                 }
             }
         }
         request.open(method, url)
         request.send(data)
     })
 }

 var p = ajax('GET', 'https://www.liaoxuefeng.com/api/categories')
 p.then(function(text) {
     log(text)
 }).catch(function(status) {
     log('ErrorGET:' + status)
 })

 /* 
 除了串行执行若干异步任务外，Promise还可以并行执行异步任务。
试想一个页面聊天系统，我们需要从两个不同的URL分别获得用户的个人信息和好友列表，
这两个任务是可以并行执行的，用Promise.all()实现如下
 */
var pp1 = new Promise(function(resolve, reject) {
    setTimeout(resolve, 500, 'P1')
})
var pp2 = new Promise(function(resolve, reject) {
    setTimeout(resolve, 600, 'P2')
})
//同时执行p1和p2,并在他们都完成后执行then
Promise.all([pp1, pp2]).then(function(results) {
    console.log('Promise.all:', results)
})

/* 
有些时候，多个异步任务是为了容错。比如，同时向两个URL读取用户的个人信息，只需要获得先返回的结果即可。
这种情况下，用Promise.race()实现
由于p1执行较快，Promise的then()将获得结果'P1'。p2仍在继续执行，但执行结果将被丢弃
如果我们组合使用Promise，就可以把很多异步任务以并行和串行的方式组合起来执行。
*/
Promise.race([pp1, pp2]).then(function(result) {
    console.log('Promise.race', result)
})

// resolve 的值是 undefined
console.log('X:', Promise.resolve(2).then(() => {}, () => {}))
// resolve 的值是 2
console.log('X:', Promise.resolve(2).finally(() => {}))
// reject 的值是 undefined
console.log('X:', Promise.reject(3).then(() => {}, () => {}))
// // reject 的值是 3
console.log('X:', Promise.reject(3).finally(() => {}))

let thenable = {
    then: function(resolve, reject) {
        resolve(42)
    }
}

let pk1 = Promise.resolve(thenable)
pk1.then(value => console.log('pk1', value))

//下面代码中，Promise.reject方法的参数是一个thenable1对象，执行以后，后面catch方法的参数不是reject抛出的“出错了”这个字符串，而是thenable对象。
let thenable1 = {
    then(resolve, reject) {
        reject('pk2 Error')
    }
}
Promise.reject(thenable1)
       .catch(e => console.log('pk2 E:', e === thenable1))
    
const f = () => console.log('now');
(async () => f())();
console.log('next');

(async () => f())()
.then(()=> console.log('kk'))
.catch(() => console.log('ff'));

( 
    () => new Promise( resolve => resolve(f()))
)();
console.log('NEXT', '')

// Promise.try(f)
// console.log('NEXT1', '')

//Canvas
/* 
Canvas是HTML5新增的组件，它就像一块幕布，可以用JavaScript在上面绘制各种图表、动画等。
没有Canvas的年代，绘图只能借助Flash插件实现，页面不得不用JavaScript和Flash进行交互。
有了Canvas，我们就再也不需要Flash了，直接使用JavaScript完成绘制
一个Canvas定义了一个指定尺寸的矩形框，在这个范围内我们可以随意绘制：
由于浏览器对HTML5标准支持不一致，所以，通常在<canvas>内部添加一些说明性HTML代码，如
果浏览器支持Canvas，它将忽略<canvas>内部的HTML，如果浏览器不支持Canvas，它将显示<canvas>内部的HTML：
*/
var canvas = document.getElementById('test-canvas')
if (canvas.getContext) {
    console.log('Canvas', 'Support')
} else {
    console.log('Canvas', 'UnSupport')
}

//getContext('2d')方法让我们拿到一个CanvasRenderingContext2D对象，所有的绘图操作都需要通过这个对象完成。
var ctx = canvas.getContext('2d')
//如果需要绘制3D怎么办？HTML5还有一个WebGL规范，允许在Canvas中绘制3D图形：
var g1 = canvas.getContext('webgl')
//绘制形状
/* 
我们可以在Canvas上绘制各种形状。在绘制前，我们需要先了解一下Canvas的坐标系统
1.Canvas的坐标以左上角为原点，水平向右为X轴，垂直向下为Y轴，以像素为单位，所以每个点都是非负整数
2.CanvasRenderingContext2D对象有若干方法来绘制图形
*/
//擦除（0, 0）位置大小为200x200的矩形，变透明
ctx.clearRect(0, 0, 200, 200)
ctx.fillStyle = '#dddddd'
ctx.fillRect(10, 10, 130, 130)
//利用path绘制复杂路径
var path = new Path2D()
path.arc(75, 75, 50, 0, Math.PI * 2, true)
path.moveTo(110, 75)
path.arc(75, 75, 35, 0, Math.PI, false)
path.moveTo(65, 65)
path.arc(60, 65, 5, 0, Math.PI * 2, true)
path.moveTo(95, 65)
path.arc(90, 65, 5, 0, Math.PI * 2, true)
ctx.strokeStyle = '#ff0000'
ctx.stroke(path)

//绘制文本
/*
绘制文本就是在指定的位置输出文本，可以设置文本的字体、样式、阴影等，与CSS完全一致
*/
var canvasText = document.getElementById('test-text-canvas')
var textCtx = canvasText.getContext('2d')
textCtx.clearRect(0, 0, canvasText.width, canvasText.height)
textCtx.shadowOffsetX = 2;
textCtx.shadowOffsetY = 2;
textCtx.shadowBlur = 2;
textCtx.shadowColor = '#757575'
textCtx.font = '24px Arial'
textCtx.fillStyle = '#333333'
textCtx.fillText('哈哈哈啊哈哈👌', 20, 30)

/* 
Canvas除了能绘制基本的形状和文本，还可以实现动画、缩放、各种滤镜和像素转换等高级操作。如果要实现非常复杂的操作，考虑以下优化方案
1. 通过创建一个不可见的Canvas来绘图，然后将最终绘制结果复制到页面的可见Canvas中
2. 尽量使用整数坐标而不是浮点数
3. 可以创建多个重叠的Canvas绘制不同的层，而不是在一个Canvas中绘制非常复杂的图
4. 背景图片如果不变可以直接用<img>标签并放到最底层

请根据从163获取的JSON数据绘制最近30个交易日的K线图，数据已处理为包含一组对象的数组：
*/

window.loadStockData = function(r) {
    var NUMS= 30, data = r.data;
    if (data.length > NUMS) {
        data = data.slice(data.length - NUMS)
    }
    data = data.map(function(x) {
        return {
            date: x[0],
            open: x[1],
            close: x[2],
            high: x[3],
            low: x[4],
            vol: x[5],
            change: x[6]
        }
    })
    window.drawStock(data)
}

window.drawStock = function(data) {
    var canvas = document.getElementById('test-stock'),
        width = canvas.width,
        height = canvas.height,
        ctx = canvas.getContext('2d');
    console.log(JSON.stringify(data[0]))
    ctx.clearRect(0, 0, width, height)
    ctx.fillText('k Line', 15, 15)
    /*
// 价格基准点
var base_price = data[0].open;
// 整K的y轴基准位置
var base_y = 50;
// k线图缩小比例
var scale = 2;
// 日K的宽度/2
var single_width_half = 3;
// 日K的宽度
var single_width_solo = single_width_half * 2;
// 日K的间隔
var single_margin = 2;
// 日K加间隔的宽度
var single_width = single_width_solo + single_margin;

for (var i in data) {
  // 收盘大于开盘，涨！红色。
  // 收盘小于开盘，跌！绿色。
  // 收盘等于开盘，横盘！灰色。
  if (data[i].close > data[i].open) {
    ctx.fillStyle = 'red';
    ctx.strokeStyle = 'red';
  } else if (data[i].close < data[i].open) {
    ctx.fillStyle = 'green';
    ctx.strokeStyle = 'green';
  } else {
    ctx.fillStyle = 'grey';
    ctx.strokeStyle = 'grey';
  }
  // 开/收高点
  var open_close_high = data[i].open > data[i].close ? data[i].open : data[i].close;
  // 开/收低点
  var open_close_low = data[i].open < data[i].close ? data[i].open : data[i].close;

  // 画开收矩形，开/收作为矩形的上下点
  var rect_start = base_y - (open_close_high - base_price) / scale;
  var rect_height = (Math.abs(data[i].open - data[i].close)) / scale;
  ctx.fillRect(20 + single_width * i, rect_start, single_width_solo, rect_height);

  // 画高直线，当高点大于开收高点，才会有高直线
  if (data[i].high > open_close_high) {
    var high_line_start = base_y - (data[i].high - base_price) / scale;
    var high_line_end = base_y - (open_close_high - base_price) / scale;
    ctx.beginPath();
    ctx.moveTo(20 + single_width_half + single_width * i, high_line_start);
    ctx.lineTo(20 + single_width_half + single_width * i, high_line_end);
    ctx.stroke();
  }

  // 画低直线，当低点大于开收低点，才会有低直线
  if(data[i].low < open_close_low) {
    var low_line_start = base_y - (open_close_high - base_price) / scale;
    var low_line_end = base_y - (data[i].low - base_price) / scale;
    ctx.beginPath();
    ctx.moveTo(20 + single_width_half + single_width * i, low_line_start);
    ctx.lineTo(20 + single_width_half + single_width * i, low_line_end);
    ctx.stroke();
  }
}
*/

    //价格基准点
    var base_price = data[0].open;
    //K的y轴的基准位置
    var base_y = 50;
    //k线缩小比例
    var scale = 2;
    //日k的宽度/2 
    var k_line_width_half = 3;
    //日k的宽度
    var k_line_width = 2 * k_line_width_half;
    //日k的间隔
    var k_line_space = 2;
    //日k加间隔的宽度
    var k_line_w_space = k_line_width + k_line_space
    data.forEach(function(line, index) {
        // 收盘大于开盘，涨！红色。
        // 收盘小于开盘，跌！绿色。
        // 收盘等于开盘，横盘！灰色。
        if (line.open < line.close) {
            ctx.fillStyle = 'red'
            ctx.strokeStyle = 'red'
        } else if (line.open > line.close) {
            ctx.fillStyle = 'green'
            ctx.strokeStyle = 'green'
        } else {
            ctx.fillStyle = 'gray'
            ctx.strokeStyle = 'gray'
        }

        //高低点
        var open_close_high = Math.max(line.close, line.open)
        var open_close_low =  Math.min(line.close, line.open)

        //绘制矩形
        var rect_start = base_y - (open_close_high - base_price) / scale;
        var rect_height = (open_close_high - open_close_low)/scale;
        ctx.fillRect(20 + k_line_w_space * index, rect_start, k_line_width,  rect_height)

        //绘制高直线
        if (line.high > open_close_high) {
            var high_line_start = base_y - (line.high - base_price) / scale
            var high_line_end = base_y - (open_close_high - base_price) / scale
            ctx.beginPath();
            ctx.moveTo(20 + k_line_w_space * index + k_line_width_half, high_line_start)
            ctx.lineTo(20 + k_line_w_space * index + k_line_width_half, high_line_end)
            ctx.stroke()
        }

        //绘制低直线
        if (line.low < open_close_low) {
            var low_line_start = base_y - (open_close_high - base_price) / scale;
            var low_line_end = base_y - (line.low - base_price) / scale
            ctx.beginPath()
            ctx.moveTo(20 + k_line_w_space * index + k_line_width_half, low_line_start)
            ctx.lineTo(20 + k_line_w_space * index + k_line_width_half, low_line_end)
            ctx.stroke()
        }
    })
}

var jsl = document.createElement('script')
jsl.src = 'http://img1.money.126.net/data/hs/kline/day/history/2015/0000001.json?callback=loadStockData&t=' + Date.now();
document.getElementsByTagName('head')[0].appendChild(jsl)