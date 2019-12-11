# -*- coding: utf-8 -*-
# __author__ = "zok"  362416272@qq.com
# Date: 2019-12-11  Python: 3.7

import execjs
import requests, json, re


def Get_parameters(username):
    """steam 登录   只处理了密码加密。其他请自行拓展
    :return 公钥和一个参数；
    """
    import time
    try:
        url = "https://store.steampowered.com/login/getrsakey/"

        headers = {
            'User-Agent': 'Opera/9.80 (Windows NT 6.0) Presto/2.12.388 Version/12.14',
            'Host': 'store.steampowered.com',
            'Referer': 'https://store.steampowered.com/login/?redir=&redir_ssl=1',
            'Origin': 'https://store.steampowered.com'
        }
        data = {
            'donotcache': int(round(time.time() * 1000)),
            'username': username,
        }
        res = requests.post(url=url, headers=headers, data=data)
        publickey_mod = json.loads(res.text).get('publickey_mod')
        publickey_exp = json.loads(res.text).get('publickey_exp')
        return publickey_mod, publickey_exp

    except Exception as err:
        print('访问失败', err)


def main(pwd, publickey_mod, publickey_exp):
    """
    :param pwd:
    :param publickey_mod:
    :param publickey_exp:
    :return sign:
    """
    with open('execute.js', 'r', encoding='utf-8') as f:
        js = execjs.compile(f.read())
        print('引擎', execjs.get().name)
        sign = js.call('get_pwd', pwd, publickey_mod, publickey_exp)
        return sign


if __name__ == '__main__':
    username = input('请输入账户:')
    pwd = input('请输入密码：')
    publickey_mod, publickey_exp = Get_parameters(username)
    sign = main(pwd, publickey_mod, publickey_exp)
    print(sign)
