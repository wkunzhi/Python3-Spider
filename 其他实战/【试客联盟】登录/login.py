# -*- coding: utf-8 -*-
# __author__ = "zok"  362416272@qq.com
# Date: 2019-11-23  Python: 3.7


import execjs
import requests, re

s = requests.Session()


def main(pwd):
    """res_n   这个参数  是从网页获取的   但调试发现是其实固定的
    :param pwd:
    :return:
    """
    with open('execute.js', 'r', encoding='utf-8') as f:
        js = execjs.compile(f.read())

        print('引擎', execjs.get().name)
        sign = js.call('get_pwd', pwd)
        return sign


def login(sign_pwd, username):
    url = "http://login.shikee.com/check/?&_1574394219820"
    data = {
        "username": username,
        "password": sign_pwd,
        "vcode": '',
        "to": 'http://user.shikee.com/',
    }
    res = s.post(url=url, data=data)
    res.encoding = "utf-8"
    print(res.text)


def home():
    home_url = "http://user.shikee.com/buyer"
    response = s.get(home_url)
    html = response.content.decode('utf-8')
    data = re.findall(
        '<div class="m-content">.*?<p class="loginInfo">您好！<span>(.*?)</span>您有未读提醒<b> <a href="/message">1</a></b> 条</p>',
        html, re.S)[0]
    print(data)


if __name__ == '__main__':
    username = input('请输入账户:')
    pwd = input('请输入密码：')
    sign = main(pwd)
    print('正在登录....')
    login(sign, username)
    home()
