# -*- coding: utf-8 -*-
# __author__ = "zok"  362416272@qq.com
# Date: 2019-08-14  Python: 3.7
import requests


# class Trash:
#     """垃圾分类
#     """
#     def __init__(self):
#         self.headers = {
#             'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.100 Safari/537.36'
#         }
#         self.start_url = 'https://www.sojson.com/trash/'
#         self.query_url = 'https://www.sojson.com/auth_v_1_0/trash/complete.shtml'
#         self.js_url = 'https://cdn.www.sojson.com/ui/js/sojson.js?v=201907190029'
#         self.session = requests.session()
#
#     def test(self):
#         response = self.session.get(self.start_url, headers=self.headers)
#         print(response)
#         data = {
#             'text': '尘土'
#         }
#         response = self.session.post(self.query_url, headers=self.headers, data=data)
#         print(response)
#
#
# if __name__ == '__main__':
#     th = Trash()
#     th.test()


import time

headers = {
    'Host': 'utqvxrrzcu.3llw.xyz',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
    'Upgrade-Insecure-Requests': '1',
    'Cookie': 'PHPSESSID=e8r618bt21e1qfbp3tni7v4d69',
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_4) AppleWebKit/605.1.15 (KHTML, like Gecko) MicroMessenger/2.3.25(0x12031910) MacWechat NetType/WIFI WindowsWechat MicroMessenger/2.3.25(0x12031910) MacWechat NetType/WIFI WindowsWechat',
    'Accept-Language': 'zh-cn',
    'Accept-Encoding': 'gzip, deflate',
    'Connection': 'keep-alive',
}

url = 'http://utqvxrrzcu.3llw.xyz/index/competitor/index/id/v1314dqqq/com_id/7w35qygx6.html?time={time}'.format(time=int(time.time()))
response = requests.get(url, headers=headers)
print(response.text)
print(response)
