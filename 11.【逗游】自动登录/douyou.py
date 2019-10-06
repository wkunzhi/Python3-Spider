# -*- coding: utf-8 -*-
# __author__ = "zok"  362416272@qq.com
# Date: 2019-08-01  Python: 3.7

import js2py
import requests
import json


class DouYou:
    headers = {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.142 Safari/537.36',
        'Referer': 'http://www.doyo.cn/passport/login'
    }

    def __init__(self, username, password):
        self.context = js2py.EvalJs()  # python中使用js
        self.username = username
        self.password = password

    def make_password(self):
        """取加密后的字符串
        """
        try:
            nonce, ts = self.get_token()
            with open("dns.js", "r", encoding="utf-8") as f:
                self.context.execute(f.read())
            pwd_hash = self.context.get_value(self.password, nonce, ts)
            return pwd_hash  # 打印加密之后的密码
        except:
            print('获取token失败')

    def get_token(self):
        """获取 token
        """
        get_token_url = 'http://www.doyo.cn/User/Passport/token?username={user}&random=0.1428378278012199'.format(user=self.username)
        result = json.loads(requests.get(get_token_url).text)
        if result.get('result'):
            nonce = result.get('nonce')
            ts = result.get('ts')
            return nonce, ts
        else:
            print('获取token失败')
            exit()

    def login(self):
        """登陆
        """
        # decode('unicode_escape')
        login_url = 'http://www.doyo.cn/passport/login'
        data = {
            'username': self.username,
            'password': self.make_password(),
            'remberme': '1',
            'next': 'aHR0cCUzQSUyRiUyRnd3dy5kb3lvLmNuJTJG'
        }
        response = requests.post(login_url, data=data, headers=self.headers)
        info = json.loads(response.text)
        if info.get('result'):
            print('登陆成功 | 用户等级:{level} 用户id:{uid}'.format(level=info.get('level'), uid=info.get('uid')))
        else:
            print('登陆失败')


if __name__ == '__main__':
    user = input('输入逗游账号')
    pwd = input('输入密码')
    dy = DouYou(user, pwd)
    dy.login()
