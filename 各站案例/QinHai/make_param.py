# -*- coding: utf-8 -*-
# __author__ = "zok"  362416272@qq.com
# Date: 2019-09-12  Python: 3.7
import execjs.runtime_names

class QinHaiYiDong:
    """
    青海移动
    参数加密
    https://www.iqhmall.cn/shopweb/logon/logon
    """
    def __init__(self, user, pwd):
        self.js = None
        self.user = user
        self.pwd = pwd
        self.init_js()

    def init_js(self):
        print('引擎', execjs.get().name)
        with open("encryp.js", "r", encoding="utf-8") as f:
            self.js = execjs.compile(f.read())

    def make_param(self):
        print(self.js.call('test', self.pwd))


if __name__ == '__main__':
    yd = QinHaiYiDong('17327362817', '123123123')
    yd.make_param()
