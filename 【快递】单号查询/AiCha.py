# -*- coding: utf-8 -*-
# __author__ = "zok"  362416272@qq.com
# Date: 2019-05-30  Python: 3.7

import js2py
import requests
import json


class AiCha(object):
    headers = {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36',
        'Referer': 'https://www.ickd.cn/'
    }
    context = js2py.EvalJs()  # python中使用js

    def __init__(self, express):
        self.express = express  # 快递单号

        with open("make.js", "r", encoding="utf-8") as f:
            self.context.execute(f.read())

    def make_tm(self):
        mt = self.context.make_tm()
        return mt

    def make_tk(self, mt):
        _str = self.express + str(mt)
        tk = self.context.sign(_str)
        return tk

    def test_get_tk(self, _str):
        print(self.context.sign(_str))

    def start(self):
        self.login()
        tm = self.make_tm()
        tk = self.make_tk(tm)
        _tm = '_' + str(tm)
        params = {
            'mailNo': self.express,
            'spellName': '',
            'exp-textName': '',
            'tk': tk,
            'tm': tm,
            'callback': '_jqjsp',
            _tm: ''
        }

        url = 'https://biz.trace.ickd.cn/auto/' + self.express

        response = requests.get(url, headers=self.headers, params=params)
        print(response.url)
        if response.status_code == 200:
            self.parse(response.text)
        else:
            print('获取失败')

    def parse(self, text):
        info = json.loads(text[text.find('(')+1: -2])
        msg = """
        快递: {expTextName}
        单号: {mailNo}
        """.format(expTextName=info.get('expTextName'), mailNo=info.get('mailNo'))
        print(msg)
        for node in info.get('data'):
            print(node)

    def login(self):
        url = 'https://i.ickd.cn/userLog.do?add&callback=jQuery110209561380635635104_{tm}&com={type}&mailNo={key}&status=3&_={tm}'
        target_url = url.format(tm=self.make_tm(), type='zhongtong', key=self.express)
        requests.get(target_url, headers=self.headers)


if __name__ == '__main__':
    # 5 月 20 日 可用
    # 在查询之前还需要做一个请求登陆验证
    ac = AiCha('75150911849051')
    ac.start()

