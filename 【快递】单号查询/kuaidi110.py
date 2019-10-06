# -*- coding: utf-8 -*-
# __author__ = "zok"  362416272@qq.com
# Date: 2019-05-27  Python: 3.7

import requests
import json


class CheckExpress(object):
    headers = {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36',
        'Referer': 'https://www.kuaidi100.com/'
    }

    def __init__(self, post_id):
        self.post_id = post_id
        self.index_url = 'https://www.kuaidi100.com/'
        self.select_url = 'https://www.kuaidi100.com/query'

        self.session = requests.session()
        self.to_index()

    def to_index(self):
        self.session.get(self.index_url, headers=self.headers)

    def express(self):
        params = {
            'type': 'zhongtong',  # companyCode
            'postid': self.post_id,  # kuaidiNumber
            'temp': '0.8067971039628283',  # Math.random # 此处混淆随机小数
            'phone': '',  # 可空
        }

        response = self.session.get(self.select_url, headers=self.headers, params=params)
        self.parse(response.text)

    @staticmethod
    def parse(data):
        """解析"""
        try:
            for node in json.loads(data).get('data'):
                print(node.get('time'), node.get('context'))
        except Exception as e:
            print('获取出错')


if __name__ == '__main__':
    """params 中 需要设置快递代码+快递单号， temp 是随机小数用来做混淆的，不用管。 需要先进入首页拿到session再进行请求查询。
    否则会返回一些假数据给你
    """
    # 此处只是写了一个 中通快递 Demo
    ck = CheckExpress('75150911849051')
    ck.express()
