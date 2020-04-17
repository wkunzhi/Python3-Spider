# -*- coding: utf-8 -*-
# __author__ = "zok"  362416272@qq.com
# Date: 2019-08-26  Python: 3.7

import re
import requests
import execjs.runtime_names


class YX(object):
    """
    易通贷自动登陆
    """

    def __init__(self, user, pwd):
        self.user = user
        self.pwd = pwd
        self.session = requests.session()
        self.url = 'https://passport.5173.com/'
        self.headers = {
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.132 Safari/537.36',
            'Host': 'passport.5173.com',
        }
        print('引擎', execjs.get().name)

    def make_pwd(self, key):
        with open("encryp.js", "r", encoding="utf-8") as f:
            ctx = execjs.compile(f.read())
        return ctx.call("make_js", self.pwd, key)

    def make_data(self, token, key):
        data = {
            'userName': self.user,
            'password': self.make_pwd(key),
            'mobileNo': '',
            'captcha': '',
            'smsCaptcha': '',
            'category': '',
            'passpod': '',
            'smsLogin': '0',
            '__validationToken__': token,
            '__validationDna__': '',
        }
        return data

    def login(self):
        """start
        """
        response = self.session.get(self.url)
        info = re.search(r'SecurityToken:"(.*?)",[\s\S]*?PasswordKey:"(.*?)",', response.text)
        try:
            token = info.group(1)
            key = info.group(2)
            data = self.make_data(token, key)
            result = self.session.post(self.url, data=data, headers=self.headers)
            if '5173auth' in str(result.cookies):
                print(result.cookies)
                print('【登陆成功】')
            else:
                print('【登陆失败】')
        except AttributeError:
            print('【获取key失败】')


if __name__ == '__main__':
    username = input('请输入账号')
    password = input('密码')
    yx = YX(username, password)
    yx.login()



