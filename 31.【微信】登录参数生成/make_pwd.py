# -*- coding: utf-8 -*-
# __author__ = "zok"  362416272@qq.com
# Date: 2019-08-22  Python: 3.7
import execjs.runtime_names


class WeXin(object):
    """
    wx 登陆密码解析
    """

    def __init__(self):
        self.url = 'https://mp.weixin.qq.com/?token=&lang=zh_CN'
        print('引擎', execjs.get().name)

    @staticmethod
    def make_pwd(pwd):
        with open("dns.js", "r", encoding="utf-8") as f:
            ctx = execjs.compile(f.read())

        ret = ctx.call("make_pwd", pwd)
        print(ret)


if __name__ == '__main__':
    pdd = WeXin()
    pdd.make_pwd('密码')

