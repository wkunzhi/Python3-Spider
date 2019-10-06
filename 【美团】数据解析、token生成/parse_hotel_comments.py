# -*- coding: utf-8 -*-
# __author__ = "zok"  362416272@qq.com
# Date: 2019-06-10  Python: 3.7

"""
解析酒店评论
"""

import requests
import json
import time


class ParseComments(object):
    """解析酒店评论
    """
    def __init__(self, hotel_id):
        self.hotel_id = hotel_id
        self.get_data()

    def get_data(self):

        url = 'https://ihotel.meituan.com/group/v1/poi/comment/' + self.hotel_id + '?'
        params = {
            'sortType': 'default',
            'noempty': '1',
            'withpic': '0',
            'filter': 'all',
            'limit': '10',
            'offset': '0',
        }
        headers = {
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.77 Safari/537.36',
        }
        response = requests.get(url=url, params=params, headers=headers)
        data = response.text
        self.parse(data)

    def parse(self, data):
        """解析数据
        """
        data_dict = json.loads(data)
        for item in data_dict.get('data').get('feedback'):
            create_time = self.parse_time(item.get('replytimestamp'))
            print_str = """
            评论用户：{userName}
            评论时间：{create_time}
            评论详情：{comment}
            满意度：{scoretext}
            """.format(userName=item.get('username'), comment=item.get('comment'), create_time=create_time,
                       scoretext=item.get('scoretext'))
            print(print_str)
            self.parse_pic(item)

    @staticmethod
    def parse_time(timeStamp):
        """13位 解码时间
        """
        time_array = time.localtime(timeStamp)
        return time.strftime("%Y-%m-%d %H:%M:%S", time_array)

    def parse_pic(self, item):
        pic_list = [i.get('url').replace('w.h', '750.0') for i in item.get('picinfo')]
        print(pic_list)


if __name__ == '__main__':
    p_id = input('请输入酒店id')
    ParseComments(p_id)
