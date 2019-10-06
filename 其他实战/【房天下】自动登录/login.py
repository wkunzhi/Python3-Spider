# -*- coding: utf-8 -*-
# __author__ = "zok"  362416272@qq.com
# Date: 2019-09-26  Python: 3.7

import execjs.runtime_names
import requests


class Fang:
    """
    房天下自动登陆
    https://passport.fang.com/
    """

    def __init__(self, user, pwd):
        self.user = user
        self.pwd = pwd
        self.js = None
        self.api = 'https://passport.fang.com/login.api'
        self.js_init()

    def js_init(self):
        print('引擎', execjs.get().name)
        with open("encryp.js", "r", encoding="utf-8") as f:
            self.js = execjs.compile(f.read())

    def login(self):
        data = {
            'uid': self.user,
            'pwd': self.js.call('getPwd', self.pwd),
            'Service': 'soufun-passport-web',
            'AutoLogin': '1'
        }
        headers = {
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.132 Safari/537.36',
            'Origin': 'https://passport.fang.com',
            'Referer': 'https://passport.fang.com/',
        }
        response = requests.post(self.api, data=data, headers=headers)
        print(response.text)
        print(response.cookies)


if __name__ == '__main__':
    username = input('输入房天下账号')
    password = input('输入密码')
    f = Fang(username, password)
    f.login()
