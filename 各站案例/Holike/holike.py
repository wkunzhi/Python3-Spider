# -*- coding: utf-8 -*-
# __author__ = "zok"  362416272@qq.com
# Date: 2019-09-07  Python: 3.7
import execjs.runtime_names
import requests
import time
import re


class MakeParam:
    """
    好莱客
    http://oa.holike.com/login.jsp
    """

    def __init__(self, name, pwd):
        self.name = name
        self.pwd = pwd
        self.js = None

        self.read_js()

    def get_key_vi(self):
        url = 'http://oa.holike.com/resource/js/session.jsp?_={t}&s_ajax=true'
        headers = {
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.132 Safari/537.36'
        }
        response = requests.get(url.format(t=int(round(time.time() * 1000))), headers=headers)
        try:
            ret = re.search(r'return "(.*?)";', response.text).group(1)
            _key = self.js.call('get_key_iv', ret)
            return _key
        except AttributeError:
            print('获取key失败')

    def read_js(self):
        with open('dns.js', 'r', encoding='utf-8') as f:
            self.js = execjs.compile(f.read())

    def make_params(self):
        obj = self.get_key_vi()
        j_password = self.js.call("make_j_password", self.pwd, obj.get('security'), obj.get('key'), obj.get('iv'))

        msg = """
        j_username: {user}
        j_password: {j_password}
        """.format(user=self.name, j_password=j_password)
        print(msg)


if __name__ == '__main__':
    username = input('请输入用户名')
    password = input('请输入密码')
    hk = MakeParam(username, password)
    hk.make_params()
