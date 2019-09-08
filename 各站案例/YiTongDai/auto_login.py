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
        self.url = 'https://app.etongdai.com/login/verifylogin'
        print('引擎', execjs.get().name)

    @staticmethod
    def make_pwd(pwd):
        with open("dns.js", "r", encoding="utf-8") as f:
            ctx = execjs.compile(f.read())
        return ctx.call("make_js", pwd)

    def make_data(self):
        data = {
            'loginName': self.user,
            'check': 'on',
            'next': 'null',
            'password': self.make_pwd(self.pwd),
        }

        return data

    def login(self):
        data = self.make_data()
        response = requests.post(self.url, data=data)
        data = response.content.decode('utf-8')
        print(data)


if __name__ == '__main__':
    username = input('请输入 易通贷账号')
    password = input('请输入 易通贷密码')
    ydt = YDT(username, password)
    ydt.login()


