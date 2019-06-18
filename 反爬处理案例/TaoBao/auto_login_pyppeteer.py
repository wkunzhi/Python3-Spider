# -*- coding: utf-8 -*-
# __author__ = "zok"  362416272@qq.com
# Date: 2019-04-27  Python: 3.7

import time
import random
import asyncio
import pyppeteer


class LoginTaoBao:
    """
    类异步
    """
    pyppeteer.DEBUG = True
    page = None

    async def _injection_js(self):
        """注入js
        """
        await self.page.evaluate('''() =>{

                   Object.defineProperties(navigator,{
                     webdriver:{
                       get: () => false
                     }
                   })
                }''')

    async def _init(self):
        """初始化浏览器
        """
        browser = await pyppeteer.launch({'headless': False,
                                          'args': [
                                              '--window-size={1300},{600}'
                                              '--disable-extensions',
                                              '--hide-scrollbars',
                                              '--disable-bundled-ppapi-flash',
                                              '--mute-audio',
                                              '--no-sandbox',
                                              '--disable-setuid-sandbox',
                                              '--disable-gpu',
                                          ],
                                          'dumpio': True,
                                          })
        self.page = await browser.newPage()
        # 设置浏览器头部
        await self.page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 '
                                     '(KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36 Edge/16.16299')
        # 设置浏览器大小
        await self.page.setViewport({'width': 1200, 'height': 600})

    async def get_cookie(self):
        cookies_list = await self.page.cookies()
        cookies = ''
        for cookie in cookies_list:
            str_cookie = '{0}={1};'
            str_cookie = str_cookie.format(cookie.get('name'), cookie.get('value'))
            cookies += str_cookie
        print(cookies)
        return cookies

    async def mouse_slider(self):
        """滑动滑块
        """
        await asyncio.sleep(3)
        try:
            await self.page.hover('#nc_1_n1z')
            # 鼠标按下按钮
            await self.page.mouse.down()
            # 移动鼠标
            await self.page.mouse.move(2000, 0, {'steps': 30})
            # 松开鼠标
            await self.page.mouse.up()
            await asyncio.sleep(2)
        except Exception as e:
            print(e, '      :错误')
            return None
        else:
            await asyncio.sleep(3)
            # 获取元素内容
            slider_again = await self.page.querySelectorEval('#nc_1__scale_text', 'node => node.textContent')
            if slider_again != '验证通过':
                return None
            else:
                print('验证通过')
                return True

    async def main(self, username_, pwd_):
        """登陆
        """
        # 初始化浏览器
        await self._init()
        # 打开淘宝登陆页面
        await self.page.goto('https://login.taobao.com')
        # 注入js
        await self._injection_js()
        # 点击密码登陆按钮
        await self.page.click('div.login-switch')
        time.sleep(random.random() * 2)
        # 输入用户名
        await self.page.type('#TPL_username_1', username_, {'delay': random.randint(100, 151) - 50})
        # 输入密码
        await self.page.type('#TPL_password_1', pwd_, {'delay': random.randint(100, 151)})
        time.sleep(random.random() * 2)
        # 获取滑块元素
        slider = await self.page.querySelector('#nc_1__scale_text')
        if slider:
            print('有滑块')
            # 移动滑块
            flag = await self.mouse_slider()
            if not flag:
                print('滑动滑块失败')
                return None
            time.sleep(random.random() + 1.5)
            # 点击登陆
            print('点击登陆')
            await self.page.click('#J_SubmitStatic')
            await asyncio.sleep(100)
        else:
            print('没滑块')
            # 按下回车
            await self.page.keyboard.press('Enter')


if __name__ == '__main__':
    username = input('淘宝用户名')
    pwd = input('密码')
    login = LoginTaoBao()
    loop = asyncio.get_event_loop()
    task = asyncio.ensure_future(login.main(username, pwd))
    loop.run_until_complete(task)

