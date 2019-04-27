# -*- coding: utf-8 -*-
# __author__ = "zok"  362416272@qq.com
# Date: 2019-04-27  Python: 3.7

import asyncio
from pyppeteer import launch

url = 'https://www.geetest.com/demo/slide-popup.html'


async def main():
    browser = await launch(headless=False, args=['--disable-infobars'])  # 可视模式,关闭受控模式
    page = await browser.newPage()
    await page.goto(url)
    print(await page.title())
    await page.evaluate(
        '''() =>{ Object.defineProperties(navigator,{ webdriver:{ get: () => false } }) }''')

    # 点击
    await page.click('')


    await asyncio.sleep(100)

asyncio.get_event_loop().run_until_complete(main())