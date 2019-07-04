# -*- coding: utf-8 -*-
# __author__ = "zok"  362416272@qq.com
# Date: 2019-07-04  Python: 3.7

import time
import asyncio
from pyppeteer import launch


async def main():
    browser = await launch()
    page = await browser.newPage()
    await page.setViewport({'width': 1200, 'height': 800})
    await page.goto('https://www.baidu.com')
    # 在搜索框中输入python
    await page.type('input#kw.s_ipt', '重庆')
    # 点击搜索按钮
    await page.click('input#su')

    # 等待元素加载，第一种方法，强行等待5秒
    # await asyncio.sleep(5)

    # 第二种方法，在while循环里强行查询某元素进行等待
    while not await page.querySelector('.t'):
        pass

    # 滚动到页面底部
    await page.evaluate('window.scrollBy(0, window.innerHeight)')

    # 这些等待方法都不好用
    title_elements = await page.xpath('//h3[contains(@class,"t")]/a')
    for item in title_elements:
        title_str = await (await item.getProperty('textContent')).jsonValue()
        print(title_str)
    await browser.close()


asyncio.get_event_loop().run_until_complete(main())
