## 工具表
- [x] [解密工具-可拓展式解密器](https://github.com/wkunzhi/SpiderUtilPackage/tree/master/Decode)
- [x] [自动注册-验证短信接收器](https://github.com/wkunzhi/SpiderUtilPackage/tree/master/Register)
- [x] [代理IP-芝麻代理池监控器](https://github.com/wkunzhi/SpiderUtilPackage/tree/master/Proxy)
- [x] [代理IP-芝麻代理池客户端Demo](https://github.com/wkunzhi/SpiderUtilPackage/tree/master/Proxy)
- [x] [代理IP-讯代理池监控器](https://github.com/wkunzhi/SpiderUtilPackage/tree/master/Proxy)
- [x] [代理IP-讯代理池客户端Demo](https://github.com/wkunzhi/SpiderUtilPackage/tree/master/Proxy)
- [x] [代理IP-快代理池监控器](https://github.com/wkunzhi/SpiderUtilPackage/tree/master/Proxy)
- [x] [cookies获取-pyppeteer获取美团登陆cookies](https://github.com/wkunzhi/SpiderUtilPackage/tree/master/Cookies)
- [x] [跨数据库迁移器-开发中](https://github.com/wkunzhi/SpiderUtilPackage/tree/master/DataMigration)
- [x] [网络图片并发直传OSS](https://github.com/wkunzhi/SpiderUtilPackage/tree/master/OSS)


<hr>



# 可拓展式解密器

[**博客传送门**](https://blog.zhangkunzhi.com/2019/06/02/%E5%8E%9F%E5%88%9B%E5%B7%A5%E5%85%B7%E4%B9%8B%E5%8F%AF%E6%8B%93%E5%B1%95%E8%A7%A3%E7%A0%81%E5%99%A8/index.html)

> 方便测试可连续转换重制的编码转换器，可灵活拓展解码规则

![](https://zok-blog.oss-cn-hangzhou.aliyuncs.com/images/特殊.gif)

<hr>




# 代理池清洗工具

[**博客传送门**](https://blog.zhangkunzhi.com/2019/05/02/%E6%90%AD%E5%BB%BA%E4%B8%80%E4%B8%AA%E8%B6%85%E7%AE%80%E5%8D%95%E7%9A%84%E5%AE%9E%E7%94%A8%E7%9A%84%E9%AB%98%E5%8F%AF%E7%94%A8%E4%BB%98%E8%B4%B9IP%E6%B1%A0/index.html)

> 爬虫经常会用到代理ip，其中有很多收费ip，但是如何在scrapy中，高效使用这些ip是一个比较麻烦的事情，在这里基于[芝麻代理ip](http://h.zhimaruanjian.com/pay/)做一个代理池监控器，首先整理我们的需求再对其代理质量进行管理，从而保持高效IP使用率

![key位置](https://www.zhangkunzhi.com/images/提取ip.png)


<hr>

# 验证码短信接收器

> 基于短信接收平台的异步短信接收器，最大并发上限 20，Python3.5+。
启动后会根据设置的异步并发数进行获取手机号码并监听短信接收情况（60秒） 超过60秒后会将未收到短信的手机号拉入黑名单，并是释放。

若要配置具体某个网站使用，还需开发对应的账号注册器，配合调用本短信接收器来达到自动注册账号的功能

<hr>

# cookies获取Demo

> 基于Pyppeteer 并发获取站点cookies
- 美团登陆cookies
![](https://www.zhangkunzhi.com/images/异步获取cookies.png)


# 跨数据库迁移器
**工作中经常有这种需求**
> 将采集好的mongodb数据转存到mysql中，或者是redis数据转到mongodb，于是打算封装一个组件便于以后调用

- [x] mysql 数据迁移 mongodb 
![](https://www.zhangkunzhi.com/images/to_mongo1.png)
![](https://www.zhangkunzhi.com/images/to_mongo2.png)