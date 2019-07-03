---
title: Pyppeteer简介与案例
date: 2019-04-23 22:29:25
tags:
- Pyppeteer
categories:
- 爬虫工具|框架
- Pyppeteer
photos: 
    - "https://www.zhangkunzhi.com/images/pyppeteer_meitu_1.png"
---

{% centerquote %}
Pyppeteer是Puppeteer的非官方Python支持，Puppeteer是一个无头自动化库，用于对渲染网页的抓取
{% endcenterquote %}

<!-- more -->


# Puppeteer 与 Pyppeteer


> `Puppeteer` 是 Google 基于 Node.js 开发的一个工具，有了它我们可以通过 JavaScript 来控制 Chrome 浏览器的一些操作，当然也可以用作网络爬虫上，其 API 极其完善，功能非常强大。 


> `Pyppeteer` 是 Puppeteer 的 Python 版本的实现，依赖于 Chromium 这个浏览器，依据 Puppeteer 的一些功能开发出来的非官方版本。

# 特性


必须`python3.5+` ，因为Pyppeteer采用了`async异步机制`

# 安装

```
$ pip3 install pyppeteer
```

- 不用担心没有安装 puppeteer，在运行程序时会自己检测，如果没有安装会帮你安装的 （根据网速等待几分钟-几十分钟）

# 官方文档
[**pyppeteer文档不懂就查**](https://miyakogi.github.io/pyppeteer/reference.html)

# 示例

## Demo 异步访问网页返回源码
```python
import asyncio  # pyppeteer采用异步方式，需要导入
from pyppeteer import launch
from pyquery import PyQuery as pq


async def main():
    browser = await launch()  # 新建一个Browser对象
    page = await browser.newPage()  # 新建一个选项卡，page对象
    await page.goto('http://quotes.toscrape.com/js/')  # 访问指定页面
    doc = pq(await page.content())  # 加载完成调用content返回当前页面源码
    print('Quotes:', doc('.quote').length)
    await browser.close()  # 关闭模拟器

asyncio.get_event_loop().run_until_complete(main())  # 异步操作
```

## Demo 模拟网页截图，保存PDF，执行js
- `screenshot`截图功能可以指定保存`格式type`、清晰度`quality`、是否全屏`fullPage`、裁切 `clip` 等各个参数实现截图。
- `pdf`保存功能也可以设置缩放大小`scale`、页码范围`pageRanges`、宽高 `width 和 height`、方向 `landscape` 等等

```python
import asyncio
from pyppeteer import launch

async def main():
    browser = await launch()  # 新建一个Browser对象
    page = await browser.newPage()  # 新建一个选项卡，page对象
    await page.goto('http://quotes.toscrape.com/js/')  # 访问指定页面
    await page.screenshot(path='example.png')  # 截图
    await page.pdf(path='测试.pdf')  # 保存为pdf
    dimensions = await page.evaluate('''() => {
        return {
            width: document.documentElement.clientWidth,
            height: document.documentElement.clientHeight,
            deviceScaleFactor: window.devicePixelRatio,
        }
    }''')  # 执行js代码
    print(dimensions)  # 返回js执行结果
    await browser.close()

asyncio.get_event_loop().run_until_complete(main())  # 异步启动
```

# 开启浏览器界面

**方法1** headless=False
```python
import asyncio
from pyppeteer import launch

async def main():
    await launch(headless=False)  # 可视模式
    await asyncio.sleep(100)

asyncio.get_event_loop().run_until_complete(main())
```

**方法2** devtools=True
```python
import asyncio
from pyppeteer import launch

async def main():
    browser = await launch(devtools=True)  # 调试模式，可见浏览器
    page = await browser.newPage()
    await page.goto('https://www.baidu.com')
    await asyncio.sleep(100)

asyncio.get_event_loop().run_until_complete(main())
```

# 常用参数

## 设置浏览器界面大小
> 默认比较小（无界面模式无需设置）

```python
import asyncio
from pyppeteer import launch

width, height = 1366, 768  # 尺寸配置

async def main():
    browser = await launch(headless=False,
                           args=[f'--window-size={width},{height}'])  # 设置全屏正常浏览器大小
    page = await browser.newPage()
    await page.setViewport({'width': width, 'height': height})
    await page.goto('https://www.taobao.com')
    await asyncio.sleep(100)

asyncio.get_event_loop().run_until_complete(main())
```

## 关闭 受控制提示
```python
browser = await launch(headless=False,  userDataDir='./userdata', args=['--disable-infobars'])  # 关闭提示： Chrome 正受到自动测试软件的控制
```

## 缓存目录
> 比如淘宝登陆一次后，设置目录后下次打开淘宝会处于登陆状态，很方便

```python
browser = await launch(headless=False, userDataDir='./userdata', args=['--disable-infobars'])  # 设置缓存目录./userdata  
```

[**淘宝登陆案例Demo**](https://github.com/wkunzhi/SpiderCrackDemo/blob/master/TaoBao/login_for_pyppeteer.py)