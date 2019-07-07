# -*- coding: utf-8 -*-
# __author__ = "zok"  362416272@qq.com
# Date: 2019-07-07  Python: 3.7

import asyncio
from pyppeteer import launch


async def main():
    browser = await launch()  # 新建一个Browser对象
    page = await browser.newPage()  # 新建一个选项卡，page对象
    await page.goto('http://quotes.toscrape.com/js/')  # 访问指定页面
    await page.screenshot(path='example.png')  # 截图
    await page.pdf(path='test.pdf')  # 保存为pdf
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