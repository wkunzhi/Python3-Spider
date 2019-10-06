# -*- coding: utf-8 -*-
# __author__ = "zok"  362416272@qq.com
# Date: 2019-05-13  Python: 3.7

import asyncio
import json

from Cookies.MeiTuan.db import RedisClient
from pyppeteer import launch


class MeiTuanCookies():
    login_url = 'https://passport.meituan.com/account/unitivelogin'

    def __init__(self):
        self.r = RedisClient('accounts', 'meituan')

    async def star(self, username, password):
        browser = await launch()
        context = await browser.createIncogniteBrowserContext()
        page = await context.newPage()
        await page.evaluateOnNewDocument('() =>{ Object.defineProperties(navigator,'
                                         '{ webdriver:{ get: () => false } }) }')  # 本页刷新后值不变

        await page.goto(self.login_url)
        await page.type('input#login-email', username)
        await page.type('input#login-password', password)
        await page.click('input.btn')
        await self.get_cookie(page,username,password)

    async def get_cookie(self, page,username,password):
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
        # 储存cookies
        print(cookies)
        self.r.set(username, json.dumps({'password': password, 'cookies': cookies}))


if __name__ == '__main__':
    mt = MeiTuanCookies()

    with open('账号.txt', 'r', encoding='utf-8') as f:
        # 账号|密码\n
        lines = f.readlines()

    tasks = []
    for line in lines:
        username, password = line.strip().split('|')
        tasks.append(mt.star(username, password))

    loop = asyncio.get_event_loop()
    loop.run_until_complete(asyncio.wait(tasks))

