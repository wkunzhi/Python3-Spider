# -*- coding: utf-8 -*-
# __author__ = "zok"  362416272@qq.com
# Date: 2019-09-10  Python: 3.7
import execjs.runtime_names
import requests


class GuoXin:
    """
    国鑫所
    https://wechat.gclfax.com/html/register/login.html
    """

    def __init__(self, user, pwd):
        self.user = user
        self.pwd = pwd
        self.url = 'https://wechat.gclfax.com/client/index.php'
        self.js = None
        self.init_js()

    def init_js(self):
        print('引擎', execjs.get().name)
        with open("encryp.js", "r", encoding="utf-8") as f:
            self.js = execjs.compile(f.read())

    def login(self):
        headers = {
            'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1',
            'Host': 'wechat.gclfax.com',
            'Origin': 'https://wechat.gclfax.com',
            'Referer': 'https://wechat.gclfax.com/html/register/login.html'
        }
        data = {
            'OPT': '1',
            'name': self.user,
            'pwd': self.js.call('test', self.pwd),
            'randomId': '',
            'code': '',
            'openid': '',
        }
        response = requests.post(self.url, headers=headers, data=data)
        print(response.text)
        print(response)


if __name__ == '__main__':
    username = input('用户名')
    password = input('密码')
    gxs = GuoXin(username, password)
    gxs.login()
