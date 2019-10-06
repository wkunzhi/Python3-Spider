# -*- coding: utf-8 -*-
# __author__ = "zok"  362416272@qq.com
# Date: 2019-07-23  Python: 3.7

import requests


class Login9377:
    """9377游戏平台自动登陆
    """

    def __init__(self, username, password):
        self.headers = {
            'Upgrade-Insecure-Requests': '1',
            'Host': 'wvw.9377.com',
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.142 Safari/537.36'
        }
        if len(password) < 6 or len(username) < 6:
            print('请输入正确账号密码!')
            exit()
        self.username = username
        self.password = password
        self.login_url = 'http://wvw.9377.com/login.php'
        self.host = 'https://www.9377.com/'
        self.session = requests.session()

    def login(self):
        """登陆
        """
        data = {
            'do': 'login',
            'gourl': self.host,
            'login_save': '1',
            'username': self.username,
            'password': self.password
        }
        self.session.get(self.login_url, headers=self.headers)
        result = self.session.post(self.login_url, headers=self.headers, data=data)
        self.check(result)

    def check(self, result):
        """检测登陆状态
        """
        if self.username in str(result.cookies):
            print('登陆成功')
        else:
            print('用户名或密码错误')


if __name__ == '__main__':
    name = input('输入账号')
    word = input('输入密码')
    lg = Login9377(name, word)
    lg.login()
