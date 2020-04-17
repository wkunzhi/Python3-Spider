# -*- coding: utf-8 -*-
# __author__ = "zok"  362416272@qq.com
# Date: 2019-09-10  Python: 3.7

import requests
import execjs.runtime_names


class SpiderLogin:
    """
    TCL 个人金融
    https://weixin.tjinsuo.com/#login/mine
    """

    def __init__(self, user, pwd):
        self.user = user
        self.pwd = pwd
        self.js = None
        self.url = 'https://weixin.tjinsuo.com/service/user/login'
        self.load_js()
        print('引擎', execjs.get().name)

    def load_js(self):
        """js 调用
        """
        with open("encryp.js", "r", encoding="utf-8") as f:
            self.js = execjs.compile(f.read())

    def auto_login(self):
        """登陆
        """
        ret = self.js.call('make', self.pwd)
        rand_key, word = ret.split('||')
        print(rand_key, word)
        headers = {
            'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1',
            'Host': 'weixin.tjinsuo.com',
            'terminalType': 'BEST_WX',
            'Accept': 'application/json'
        }
        data = 'mobile={user}&password={pwd}&cipherkey=&message=&randKey={rand_key}'.format(user=self.user,
                                                                                            pwd=word,
                                                                                            rand_key=rand_key)

        response = requests.post(self.url, headers=headers, data=data)
        print(response.text)
        print(response)


if __name__ == '__main__':
    username = input('请输入账号')
    password = input('密码')
    wcb = SpiderLogin(username, password)
    wcb.auto_login()
