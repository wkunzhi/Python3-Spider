# -*- coding: utf-8 -*-
# __author__ = "zok"  362416272@qq.com
# Date: 2019-08-14  Python: 3.7
import requests


class Trash:
    """垃圾分类
    """
    def __init__(self):
        self.headers = {
            'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.100 Safari/537.36'
        }
        self.start_url = 'https://www.sojson.com/trash/'
        self.session = requests.session()

    def test(self):
        response = self.session.get(self.start_url, headers=self.headers)
        print(response)


if __name__ == '__main__':
    th = Trash()
    th.test()
