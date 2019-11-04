# -*- coding: utf-8 -*-
# __author__ = "zok"  362416272@qq.com
# Date: 2019-08-26  Python: 3.7

import requests
import base64
from Crypto.Cipher import PKCS1_v1_5 as Cipher_pksc1_v1_5
from Crypto.PublicKey import RSA


class YX(object):
    """
    满级网自动登陆 官网 www.manjiwang.com
    http://www.manjiwang.com/Logins/BuyerLogin
    """

    def __init__(self, user, pwd):
        self.user = user
        self.pwd = pwd
        self.url = 'http://www.manjiwang.com/Logins/BuyerLogin'
        self.headers = {
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.132 Safari/537.36',
            'Host': 'www.manjiwang.com',
        }
        self.public_key = """-----BEGIN PUBLIC KEY-----
        MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDC4wHerJc4BSst20Zb07lY9LeZss4OEEhe+SrnLyYy8hGquX/aTQNn+5wnV/+8ierKPgqPGIXPf1ZRww5/6yON+O7dAfJ7BRx85HneIWqwPCZToLck8DN8UXsBuXLMcG7tfMunnnZKenrPsAslN0eKvkYkvz4EPGdvmPwz0NCKXQIDAQAB
        -----END PUBLIC KEY-----
        """

    def make_pwd(self):
        rsa_key = RSA.importKey(self.public_key)
        cipher = Cipher_pksc1_v1_5.new(rsa_key)
        cipher_text = base64.b64encode(cipher.encrypt(self.pwd.encode()))
        return cipher_text.decode()

    def make_data(self):
        data = {
            'account': self.user,
            'password': self.make_pwd(),
            'returnUrl': '/'
        }
        return data

    def login(self):
        """start
        """
        data = self.make_data()
        response = requests.post(self.url, data=data)
        print(response.text)
        print(response.cookies)


if __name__ == '__main__':
    username = input('请输入账号')
    password = input('密码')
    yx = YX(username, password)
    yx.login()



