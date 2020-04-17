# -*- coding: utf-8 -*-
# __author__ = "zok"  362416272@qq.com
# Date: 2019-09-25  Python: 3.7

import requests
import re
import json


class Gli:
    """
    自动登陆 Glidedsky
    http://www.glidedsky.com/login
    """

    def __init__(self, user, pwd):
        self.user = user
        self.pwd = pwd
        self.url = 'http://www.glidedsky.com/login'
        self.session = requests.session()
        self.headers = {
            'Host': 'www.glidedsky.com',
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.132 Safari/537.36',
        }

    def get_token(self):
        response = self.session.get(self.url, headers=self.headers)
        _token = re.search(r'name="csrf-token" content="(.*?)">', response.text).group(1)
        return _token

    def login(self):
        data = {'_token': self.get_token(), 'email': self.user, 'password': self.pwd}
        self.session.post(self.url, data=data)
        # print(self.session.cookies)
        cookies = requests.utils.dict_from_cookiejar(self.session.cookies)  # cookies 输出
        with open('toolkit/cookies.json', 'w', encoding='utf-8') as f:
            f.write(json.dumps(cookies))
        # print(cookies)


if __name__ == '__main__':
    username = input('请输入用户名')
    password = input('请输入密码')
    g = Gli(username, password)
    g.login()
