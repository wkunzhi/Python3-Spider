# -*- coding: utf-8 -*-
# __author__ = "zok"  362416272@qq.com
# Date: 2019-04-23  Python: 3.7

"""
pip3 install pyppeteer
过淘宝登陆检测webdriver方法
"""

import asyncio
from pyppeteer import launch


async def main():
    browser = await launch(headless=False, args=['--disable-infobars'])
    page = await browser.newPage()
    await page.goto('https://login.taobao.com/member/login.jhtml?redirectURL=https://www.taobao.com/')
    await page.evaluate(
        '''() =>{ Object.defineProperties(navigator,{ webdriver:{ get: () => false } }) }''')
    await asyncio.sleep(100)

asyncio.get_event_loop().run_until_complete(main())
