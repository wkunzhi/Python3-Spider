## 时间戳
```javascript
// 生成方法1
var time = new Date().getTime()
console.log(time)  // 默认13位时间搓, 去掉后3位就是以秒为单位的.

// 时间戳转本地时间
var time2 = new Date(1565418199727).toLocaleString()
console.log(time2)

		
// 生成时间戳2   V8 引擎的话只能用这个. 方法1 在 v8 上不能用
var time3 = Date.now()
console.log(time3)
```

输出结果
![](https://zok-blog.oss-cn-hangzhou.aliyuncs.com/images/20190812/1.png)

## 布尔值
> 默认 False 有：**`false` `undefuned` `null` `0` `-0` `NaN` `''` 空字符串**

## 定义变量
```javascript
// str
var str1 = JSON.stringify({x:2})
console.log(str1)		
```

> 多个变量同时赋值, 以**逗号**分隔，分号结尾

```javascript
var a = 'hi', b = 1+2,c
// 格式化之后可能显示为, 在; 号为一句的结尾
var a = 'hi',
b = 1 + 2
,c;
console.log(a,b,c)
```

输出结果
![](https://zok-blog.oss-cn-hangzhou.aliyuncs.com/images/20190812/2.png)

> 变量补充定义, 将会以最后一次定义为准

```javascript
var a ='';
var a= 1;
console.log(a)
// 输出 1
// var 是局部变量, 不设置 var 就是全局变量
```

> 尾部补充定义, 因为是解释性语言可以这样操作的

```javascript
console.log(w)
var w = '这是w'
console.log(w)
	
// 作用域
function test(){
	var k = '作用域测试';
	function abc(){
		console.log(k)
	}
	abc();
}
```

## jothor编码

> jothor编码 利用 js 弱类型进行转换

- [x] + 号会是一个弱类型转换, 比如 str + int 就会将int 强制转换为 str 
- [x] [] 就会被强制转换为0, 从而得到想要的类型

```javascript
var s = +[];
console.log('jothor编码', s)
// 输出 jothor编码 0
```

## = 、 == 、 ===

> 赋值 一个 = 号只代表赋值操作

```javascript
var a = 0, b = 1;
if (a=b){
	console.log('一个 = 号只代表赋值操作编码')
}
	
// == 与 === 
if(1=='1'){
	console.log('== 会自动转换类型并比较')
}
	
if(1===1){
	console.log('=== 不会自动转换类型并比较')
}
```

![](https://zok-blog.oss-cn-hangzhou.aliyuncs.com/images/20190812/3.png)

## 逻辑运算

> `&&` 与 `||` 或

**注意: || 或的时候,遇到 false值会跳过,直到遇到第一个为true的值并返回，如果都为false返回最后一个,如下:**

```javascript
var u;
var b = u || 0 || "" || 100 || 200;
console.log(b)
// && 与: 遇到 false 就返回
var i = 100 && 0 && 200;
console.log(i)
var a = 0;
(1 == 1) && (a = 100);  // 这种情况 相当于是一个如果真
console.log(a)
```

![](https://zok-blog.oss-cn-hangzhou.aliyuncs.com/images/20190812/4.png)

## 三元运算
```javascript
var a = 100;
a ? console.log('真'): console.log('假')
// 输出 真
```

## 对象

| 对象 | 例子 | 
| --- | --- | 
| 内置对象 | `数组` `函数` `日期` |  
| 宿主对象 | `DOM` `Windows` `navigator` |  
| 自定义对象 | `{}`	或者 `new Object` |  

> 继承属性 Object.prototype 最顶层的原型对象,所有对象都会继承的.包括内置对象也会继承.
		
```javascript
Object.prototype.x2 = 100
var obj = {x:1,y:2};
console.log(obj.x2)
// 输出 100
```