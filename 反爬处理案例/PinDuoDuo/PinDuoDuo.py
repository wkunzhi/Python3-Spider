# -*- coding: utf-8 -*-
# __author__ = "zok"  362416272@qq.com
# Date: 2019-07-23  Python: 3.7

import js2py

"""
若有侵权请立即联系作者删除！！！
"""


class PingDuoDuoSpider(object):
    """
    拼多多加密解析
    """
    context = js2py.EvalJs()  # python中使用js

    def __init__(self, password):
        # 初始化
        self.password = password

    def make(self):
        print('JS 加密代码加载中')
        with open("encryp.js", "r", encoding="utf-8") as f:
            self.context.execute(f.read())

        print('==拼多多字符串加密==')
        hash = self.context.test(self.password)
        print(hash)  # 打印加密之后的密码


if __name__ == '__main__':
    key = input("输入字符串")
    pdd = PingDuoDuoSpider(key)
    pdd.make()
