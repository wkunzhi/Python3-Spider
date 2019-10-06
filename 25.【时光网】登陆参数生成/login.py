# -*- coding: utf-8 -*-
# __author__ = "zok"  362416272@qq.com
# Date: 2019-09-11  Python: 3.7
import execjs.runtime_names


class MTime:
    """
    时光网登陆，password 加密解析
    https://m.mtime.cn/#!/member/signin
    """
    def __init__(self, name, pwd):
        self.name = name
        self.pwd = pwd
        self.url = 'https://m.mtime.cn/Service/callback-comm.mi/user/login.api'
        self.js = None
        self.init_js()

    def init_js(self):
        print('引擎', execjs.get().name)
        with open("encryp.js", "r", encoding="utf-8") as f:
            self.js = execjs.compile(f.read())

    def make_pwd(self):
        print(self.js.call('get_pwd', self.pwd))


if __name__ == '__main__':
    username = input('请输入用户名')
    password = input('输入密码')
    mt = MTime(username, password)
    mt.make_pwd()
