# -*- coding: utf-8 -*-
# __author__ = "zok"  362416272@qq.com
# Date: 2019-05-21  Python: 3.7
import asyncio
import json

from pyppeteer import launch


class MeiTuanCookies():
    def __init__(self, username, password):
        self.login_url = 'https://passport.meituan.com/account/unitivelogin'
        self.username = username
        self.password = password

    async def star(self):
        browser = await launch()
        context = await browser.createIncogniteBrowserContext()
        page = await context.newPage()
        await page.evaluateOnNewDocument('() =>{ Object.defineProperties(navigator,'
                                         '{ webdriver:{ get: () => false } }) }')  # 本页刷新后值不变

        await page.goto(self.login_url)
        await page.type('input#login-email', self.username)
        await page.type('input#login-password', self.password)
        await page.click('input.btn')
        await self.get_cookie(page)

    async def get_cookie(self, page):
        """
        获取 cookies
        :param page: 页面
        :return:
        """
        cookies_list = await page.cookies()
        cookies = ''
        for cookie in cookies_list:
            str_cookie = '{0}={1};'
            str_cookie = str_cookie.format(cookie.get('name'), cookie.get('value'))
            cookies += str_cookie
        print(cookies)


if __name__ == '__main__':
    name = input('美团账号')
    pwd = input('密码')
    mt = MeiTuanCookies(name, pwd)
    loop = asyncio.get_event_loop()
    loop.run_until_complete(mt.star())
