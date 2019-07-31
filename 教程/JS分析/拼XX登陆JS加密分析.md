# X多多登陆 JS 加密解析
**若有侵权请立即联系作者删除！！！**

> 目标： **X多多自动登录时对密码字段的加密**

# 抓登陆包
[**网址**](https://mms.pinduoduo.com/login) https://mms.pinduoduo.com/login

打开调试工具，随意输入一个账号密码点击登陆

![原始数据](https://www.zhangkunzhi.com/images/20190721/1.png)

然后我我们看到一个 POST 请求

`https://mms.pinduoduo.com/janus/api/auth`

![原始数据](https://www.zhangkunzhi.com/images/20190721/2.png)

可见密码是在 **js 中加密好了之后进行 post 提交的** 看这货最后一次加密应该是 base64 加密。

# 定位可疑加密处
> 利用 Search 与堆栈调试跟踪断点调试在3万行代码中找到可疑加密处

![原始数据](https://www.zhangkunzhi.com/images/20190721/3.png)

> 查找可疑处并断点调试, 此处明显 RSA 加密三部剧特征！

1. 实例化 new 一个对象
2. 设置密钥
3. 加密

![原始数据](https://www.zhangkunzhi.com/images/20190721/4.png)

> 跟进方法

![原始数据](https://www.zhangkunzhi.com/images/20190721/5.png)

> 分析代码

![原始数据](https://www.zhangkunzhi.com/images/20190721/6.png)

> 判断可以将此 js 复写出来，摘写出加密方法，放到 `HBuilder` 中调试



![原始数据](https://www.zhangkunzhi.com/images/20190721/7.png)

> 修改复写该部分, **并将加密的匿名函数改写，调用**

头部补入
```javascript
// 定义 navigator 与 window
var navigator = {};
var window = this;  // 等于当前对象
``` 

**js代码尾部改写为调用模式，提供给 Python 使用**

```javascript
// 1. 将上面这一坨匿名函数掐头去尾留中间，将其暴露出来, 这样才能使这个匿名函数暴露出来。	
// 2. 改写 将 rt 解密对象，赋值给 JSEncrypt
JSEncrypt = rt
	
// 自己写一个 func 来调用加密, 摘抄加密处如何使用的即可
function test(text){
	var p = new JSEncrypt; // 上面刚刚得到的JSEncrpyt 正好new 一个赋值给 p
	// 经过测试 PublickKey 为固定值,摘抄即可
	p.setPublicKey("MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDOJ3pYE2cYqdHAnQhd0akAQ6tKiepF6ZCXnYix8HyZJapWm5aeJRmXpWPaH2l+tZzgwOELJLu0BYk6eefWpd79Zm63+cSRdRqhgSv3/Anh4XVjBBewc26KUKMq5MWnEVCyjEDZSzUvCnDiVOl+Uid9tRRr1ZrBMKsXwSgjvge0NwIDAQAB"),
	password = p.encrypt(a)  // 适当改写
	console.log(password) // 打印
};
	
test('密码')
``` 

## 测试js是否能加密
![原始数据](https://www.zhangkunzhi.com/images/20190721/8.png)

# 利用 Python 的 js2py 模块运行 js

```python
with open("encryp.js", "r", encoding="utf-8") as f:
    self.context.execute(f.read())

ret = self.context.test('待加密的字符串')
```

![原始数据](https://www.zhangkunzhi.com/images/20190721/9.png)



# GitHub 代码
> 自此完成了提交登陆请求时对密码的加密，用此方法可对其他字段进行自行封装。

 [**【拼多多】登陆参数解密**](https://github.com/wkunzhi/SpiderCrackDemo/tree/master/反爬处理案例/PinDuoDuo)