# -*- coding: utf-8 -*-
# __author__ = "zok"  362416272@qq.com
# Date: 2019-08-05  Python: 3.7

"""
百度登陆参数比较多

这里是密码加密生成器
"""

import js2py


class PingDuoDuoSpider(object):
    """
    生成百度登陆密码加密结果
    """
    context = js2py.EvalJs()  # python中使用js

    def __init__(self):
        # 初始化
        with open("dns.js", "r", encoding="utf-8") as f:
            self.context.execute(f.read())

    def make(self, password):
        pwd = self.context.test(password)
        print(pwd)  # 打印加密之后的密码


if __name__ == '__main__':
    pdd = PingDuoDuoSpider()

    key = input("输入密码")
    pdd.make(key)
