# -*- coding: utf-8 -*-
# __author__ = "zok"  362416272@qq.com
# Date: 2019-04-17  Python: 3.7

import requests
import json
import time

from urllib import parse


class ParseComments(object):
    def __init__(self, shop_id):
        self.shop_id = shop_id

        self.get_data()

    def get_data(self):
        url_code = self.get_originUrl()

        url = 'http://www.meituan.com/meishi/api/poi/getMerchantComment?'
        params = {
            'platform': '1',
            'partner': '126',
            'originUrl': url_code,
            'riskLevel': '1',
            'optimusCode': '1',
            'id': self.shop_id,
            'offset': '0',
            'pageSize': '10',
            'sortType': '1',
        }
        headers = {
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.77 Safari/537.36',
        }
        response = requests.get(url=url, params=params, headers=headers)
        data = response.text
        self.parse(data)

    def get_originUrl(self):
        """编码解码
        """
        return parse.quote_plus('http://www.meituan.com/meishi/' + self.shop_id + '/')

    def parse(self, data):
        """解析数据
        """
        data_dict = json.loads(data)
        for item in data_dict.get('data').get('comments'):
            create_time = self.parse_time(item.get('commentTime'))
            print_str = """
            评论用户：{userName}
            评论时间：{create_time}
            评论详情：{comment}
            评论id：{reviewId}
            """.format(userName=item.get('userName'), comment=item.get('comment'), create_time=create_time,
                       reviewId=item.get('reviewId'))
            print(print_str)
            # with open('MeiTuan.csv', 'a', encoding='utf-8') as f:
            #     job_list = [item.get('userName'), item.get('comment'), create_time, item.get('reviewId'), '\n']
            #     f.write(','.join(job_list))

    @staticmethod
    def parse_time(timeStamp):
        """13位 解码时间
        """
        time_stamp = float(int(timeStamp) / 1000)
        time_array = time.localtime(time_stamp)
        return time.strftime("%Y-%m-%d %H:%M:%S", time_array)


if __name__ == '__main__':
    p_id = input('请输入餐馆id')
    ParseComments(p_id)
