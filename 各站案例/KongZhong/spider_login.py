# -*- coding: utf-8 -*-
# __author__ = "zok"  362416272@qq.com
# Date: 2019-09-03  Python: 3.7
import re
import time
import requests
import execjs.runtime_names


class SpiderLogin:
    """
    空中网爬虫登陆
    """

    def __init__(self, user, pwd):
        self.session = requests.session()
        self.user = user
        self.pwd = pwd
        self.login_time = int(round(time.time() * 1000))
        self.url = 'https://m.wcbchina.com/login/other-login.html'
        self.headers = {
            'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1',
            'Host': 'sso.kongzhong.com',
            'Referer': 'https://passport.kongzhong.com/login'
        }

    def use_js(self, dc):
        """js 调用
        """
        with open("dns.js", "r", encoding="utf-8") as f:
            js = execjs.compile(f.read())
        try:
            pwd = js.call("mk_pwd", self.pwd, dc)
            return pwd
        except Exception:
            print('js 异常')

    def auto_login(self):
        """登陆
        """
        login_url = 'https://sso.kongzhong.com/ajaxLogin?j=j&&type=1&service=https://passport.kongzhong.com/&username={username}&password={password}&vcode=&toSave=0&_={_time}'
        dc = self.get_dc()
        en_pwd = self.use_js(dc)
        response = self.session.get(login_url.format(username=self.user, password=en_pwd, _time=self.login_time), headers=self.headers)
        print(response.cookies)
        print(response.text)
        print(response)

    def get_dc(self):
        """捕获 dc 参数
        """
        target = 'https://sso.kongzhong.com/ajaxLogin?j=j&jsonp=j&service=https://passport.kongzhong.com/&_={t}'.format(
            t=self.login_time)
        response = self.session.get(target, headers=self.headers)
        try:
            dc = re.search(r'"dc":"(.*?)","kzmsg', response.text).group(1)
            return dc
        except AttributeError:
            print('dc 捕获失败')


if __name__ == '__main__':
    username = input('请输入账号')
    password = input('密码')
    kzw = SpiderLogin(username, password)
    kzw.auto_login()
