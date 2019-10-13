# -*- coding: utf-8 -*-
# __author__ = "zok"  362416272@qq.com
# Date: 2019-09-08  Python: 3.7
import requests
import re
import execjs.runtime_names


class DNS:
    def __init__(self, user, pwd):
        self.user = user
        self.pwd = pwd
        self.js = None
        self.url = 'https://www.dns.com/login.html'
        self.headers = {
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.132 Safari/537.36',
            'Host': 'www.dns.com'
        }
        self.read_js()

    def get_token(self):
        response = requests.get(self.url, headers=self.headers)
        try:
            token = re.search(r'<input type="hidden" name="_token" value="(.*?)">', response.text).group(1)
            print(token)
        except AttributeError:
            print('token 捕获失败')

    def read_js(self):
        with open("dns.js", "r", encoding="utf-8") as f:
            self.js = execjs.compile(f.read())

    def login(self):
        data = {
            '_token': self.get_token(),
            'password': self.js.call('aes', self.pwd),
            'email': self.js.call('aes', self.user),
            'redirectTo': 'https://www.dns.com/dashboard',
        }
        response = requests.post(self.url, data=data, headers=self.headers)
        print(response)


if __name__ == '__main__':
    username = input('请输入账号')
    password = input('密码')
    dns = DNS(username, password)
    dns.login()
