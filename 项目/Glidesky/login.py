# -*- coding: utf-8 -*-
# __author__ = "zok"  362416272@qq.com
# Date: 2019-09-17  Python: 3.7

import requests
import re
import aiohttp
import asyncio
from lxml import etree


class Gli:

    def __init__(self, user, pwd):
        self.url = 'http://www.glidedsky.com/login'
        self.url_no2 = 'http://www.glidedsky.com/level/web/crawler-basic-2?page='
        self.session = requests.session()
        self.cookies = None
        self.no2_count = 0
        self.flag = 0
        self.user = user
        self.pwd = pwd
        self.headers = {
            'Host': 'www.glidedsky.com',
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.132 Safari/537.36',
        }
        self.login()

    def get_token(self):
        response = self.session.get(self.url, headers=self.headers)
        _token = re.search(r'name="csrf-token" content="(.*?)">', response.text).group(1)
        return _token

    def login(self):
        data = {'_token': self.get_token(), 'email': self.user, 'password': self.pwd}
        self.session.post(self.url, data=data)
        self.cookies = self.session.cookies

    def no1(self):
        """爬虫基础1
        """
        response = self.session.get('http://www.glidedsky.com/level/web/crawler-basic-1', headers=self.headers)
        et = etree.HTML(response.text)
        int_list = [int(i.strip()) for i in et.xpath('//*[@id="app"]/main/div/div/div/div/div/text()')]
        print(int_list)
        print('爬虫基础1 合计', sum(int_list))


if __name__ == '__main__':
    username = ''
    password = ''
    g = Gli(username, password)
    g.no1()  # 基础1
