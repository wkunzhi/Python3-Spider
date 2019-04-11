# -*- coding: utf-8 -*-
# __author__ = "zok"  362416272@qq.com
# Date: 2019-04-11  Python: 3.7
"""
1. get login html token
2. login
"""

import requests
from lxml import etree


class Login(object):
    def __init__(self, username, password):

        self.headers = {
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36',
            'Referer': 'https://github.com/',
            'Host': 'github.com'
        }

        self.login_url = 'https://github.com/login'
        self.post_url = 'https://github.com/session'
        self.session = requests.Session()

        self.username = username
        self.password = password

    def login_GitHub(self):
        """
        模拟登陆
        :return:
        """

        post_data = {
            'commit': 'Sign in',
            'utf8': '✓',
            'authenticity_token': self.get_token(),
            'login': self.username,
            'password': self.password
        }

        response = self.session.post(self.post_url, data=post_data, headers=self.headers)

        if response.status_code == 200:
            html = etree.HTML(response.content.decode())
            if html.xpath('/html/body/div[1]/header/div[7]/details/summary'):
                pro_list = html.xpath('//ul[@class="list-style-none"]/li/div/a/span[2]/text()')
                print("登录成功！正在拉取你的所有项目..")
                print(pro_list)

            else:
                print('账号或密码错误')
        else:
            print("登录失败！")

    def get_token(self):
        """
        获取token
        :return:
        """

        response = self.session.get(self.login_url, headers=self.headers)
        html = etree.HTML(response.content.decode())

        token = html.xpath('//input[@name="authenticity_token"]/@value')[0]

        return token


if __name__ == '__main__':
    user = input('请输入您的账号： ')
    key = input('请输入您的密码： ')

    login = Login(user, key)
    login.login_GitHub()
