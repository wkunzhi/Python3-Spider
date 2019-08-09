# -*- coding: utf-8 -*-
# __author__ = "zok"  362416272@qq.com
# Date: 2019-07-23  Python: 3.7


import execjs.runtime_names

"""
pip3 install execjs
npm i jsdom -g
"""


class PingDuoDuoSpider(object):
    """
    拼多多加密解析
    """

    def __init__(self, password):
        # 初始化
        print('引擎', execjs.get().name)
        self.password = password

    def make(self):
        with open("encryp.js", "r", encoding="utf-8") as f:
            ctx = execjs.compile(f.read())

        ret = ctx.call("test", self.password)
        print(ret)


if __name__ == '__main__':
    key = input("输入字符串")
    pdd = PingDuoDuoSpider(key)
    pdd.make()

