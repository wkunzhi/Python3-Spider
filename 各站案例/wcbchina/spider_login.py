# -*- coding: utf-8 -*-
# __author__ = "zok"  362416272@qq.com
# Date: 2019-09-03  Python: 3.7

import json
import requests
import execjs.runtime_names


class SpiderLogin:
    """
    万创帮爬虫登陆
    """

    def __init__(self, user, pwd):
        self.user = user
        self.pwd = pwd
        self.url = 'https://m.wcbchina.com/login/other-login.html'
        print('引擎', execjs.get().name)

    def use_js(self):
        """js 调用
        """
        with open("encryp.js", "r", encoding="utf-8") as f:
            js = execjs.compile(f.read())

        try :
            sign, t = js.call("make_sigin")
            pwd = js.call("make_pwd",  self.pwd)
            return sign, t, pwd
        except Exception:
            print('异常数据')

    def auto_login(self):
        """登陆
        """
        sign, t, pwd = self.use_js()
        headers = {
            'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1',
            'Referer': 'https://m.wcbchina.com/login/other-login.html'
        }
        pay_load = {
            'auth': {'sign': sign, 'timestamp': t},
            'password': self.user,
            'username': pwd
        }

        response = requests.post(self.url, headers=headers, data=json.dumps(pay_load))
        print(response.cookies)
        print(response)


if __name__ == '__main__':
    username = input('请输入账号')
    password = input('密码')
    wcb = SpiderLogin(username, password)
    wcb.auto_login()
