# -*- coding: utf-8 -*-
# __author__ = "zok"  362416272@qq.com
# Date: 2019-09-05  Python: 3.7

import execjs.runtime_names


class MakeParam:
    """
    移动登陆
    加密参数生成器
    页面 https://mail.10086.cn/
    """

    def __init__(self, name, pwd):
        self.name = name
        self.pwd = pwd
        self.js = None
        self.init_js()

    def init_js(self):
        print('引擎', execjs.get().name)
        with open("encryp.js", "r", encoding="utf-8") as f:
            self.js = execjs.compile(f.read())

    def mk_params(self):
        cguid = self.js.call("customerGetCGUID")
        _ = self.js.call('sha1', self.name)
        word = self.js.call('calcDigest', self.pwd)
        msg = """
        cguid: {cguid}
        _: {_}
        password: {word}
        """
        print(msg.format(cguid=cguid, _=_, word=word))


if __name__ == '__main__':
    username = input('输入用户名')
    password = input('输入密码')
    yd = MakeParam(username, password)
    yd.mk_params()
