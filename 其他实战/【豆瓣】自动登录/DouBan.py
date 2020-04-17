# -*- coding: utf-8 -*-
# __author__ = "zok"  362416272@qq.com
# Date: 2020-01-08  Python: 3.7

import requests
import re


class DouBan:
    def __init__(self, name, pwd):
        self.name = name.strip()
        self.pwd = pwd.strip()
        self.session = requests.session()
        self.headers = {
            'Origin': 'https://accounts.douban.com',
            'Host': 'accounts.douban.com',
            'Referer': 'https://accounts.douban.com/passport/login_popup?login_source=anony',
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.88 Safari/537.36',
        }
        self.login_url = 'https://accounts.douban.com/j/mobile/login/basic'
        self.index_url = "https://www.douban.com/"
        self.session = requests.session()

    def login(self):
        data = {
            'ck': '',
            'name': self.name,
            'password': self.pwd,
            'remember': 'false',
            'ticket': '',
        }
        self.session.post(self.login_url, data=data, headers=self.headers)

    def check(self):
        self.headers['Host'] = 'www.douban.com'
        response = self.session.get("https://www.douban.com/", headers=self.headers)
        try:
            title = re.search(r'<span>(.*?)的帐号</span><span class="arrow"></span>', response.text).group(1)
            print('【登录成功】', title)
        except:
            print('【登录失败】')


if __name__ == '__main__':
    username = input('豆瓣用户名 >>>')
    password = input('密码 >>>')
    db = DouBan(username, password)
    db.login()
    db.check()
