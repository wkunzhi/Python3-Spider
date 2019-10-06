# -*- coding: utf-8 -*-
# __author__ = "zok"  362416272@qq.com
# Date: 2019-09-29  Python: 3.7

import execjs.runtime_names

"""
小牛在线，登陆密码参数解密
https://www.xiaoniu88.com/user/login
"""


def init_js():
    with open("encryp.js", "r", encoding="utf-8") as f:
        return execjs.compile(f.read())


def make_param(password):
    js = init_js()
    pwd = js.call('get_pwd', password)
    print('加密后密码', pwd)


if __name__ == '__main__':
    password = input('明文密码')
    make_param(password)
