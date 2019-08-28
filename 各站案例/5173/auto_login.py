# -*- coding: utf-8 -*-
# __author__ = "zok"  362416272@qq.com
# Date: 2019-08-26  Python: 3.7

import requests
import execjs.runtime_names


class YDT(object):
    """
    易通贷自动登陆
    """

    def __init__(self, user, pwd):
        self.user = user
        self.pwd = pwd
        self.url = 'https://passport.5173.com/'
        print('引擎', execjs.get().name)

    @staticmethod
    def make_pwd(pwd):
        with open("encryp.js", "r", encoding="utf-8") as f:
            ctx = execjs.compile(f.read())
        return ctx.call("make_js", pwd)

    def make_data(self):
        data = {
            'userName': self.user,
            'password': self.make_pwd(self.pwd),
            'mobileNo': '',
            'captcha': '',
            'smsCaptcha': '',
            'category': '',
            'passpod': '',
            'smsLogin': '0',
            '__validationToken__': '4d91a0eb70d94ae88892a63f2cd0c749',
            '__validationDna__': '',
        }

        return data

    def login(self):
        data = self.make_data()
        response = requests.post(self.url, data=data)
        data = response.content.decode('utf-8')
        print(data)


if __name__ == '__main__':
    ydt = YDT('', '')


