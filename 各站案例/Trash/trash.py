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
        self.query_url = 'https://www.sojson.com/auth_v_1_0/trash/complete.shtml'
        self.js_url = 'https://cdn.www.sojson.com/ui/js/sojson.js?v=201907190029'
        self.session = requests.session()

    def test(self):
        response = self.session.get(self.start_url, headers=self.headers)
        print(response)
        data = {
            'text': '尘土'
        }
        response = self.session.post(self.query_url, headers=self.headers, data=data)
        print(response.text)


if __name__ == '__main__':
    th = Trash()
    th.test()


