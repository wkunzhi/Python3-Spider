# -*- coding: utf-8 -*-
# __author__ = "zok"  362416272@qq.com
# Date: 2019-05-08  Python: 3.7

"""
解析
美团休闲娱乐商铺信息
该板块信息隐藏在get请求后的js中直接用正则匹配出信息再抽取出来
"""
import requests
import re
import json


class ParsePlayInfo(object):
    target_url = 'http://www.meituan.com/xiuxianyule/{p_id}/'
    headers = {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.77 Safari/537.36',
    }

    def __init__(self, restaurant_id):
        self.restaurant_id = str(restaurant_id)

        self.go_to_restaurant()

    def go_to_restaurant(self):
        """执行访问
        """
        url = self.target_url.format(p_id=self.restaurant_id)
        data = requests.get(url, headers=self.headers).text

        # 提取有效区域
        data = re.search(r'"params":{"poiInfo":(.*?)},"fallbackPara', data, flags=re.DOTALL)
        if data:
            self.parse_html(json.loads(data.group(1)))
        else:
            print('访问失效')

    def parse_html(self, data):
        print('商铺ID', self.restaurant_id)
        print('城市ID', data.get('catId'))
        print('城市', data.get('cityName'))
        print('城市拼音', data.get('cityPy'))
        print('店铺', data.get('shopName'))
        print('评分', data.get('score'))
        print('平均消费', data.get('avgPrice'))
        print('地址', data.get('address'))
        print('电话', data.get('phone'))
        print('营业时间', data.get('openTime'))
        print('封面图片', data.get('headIcon'))
        print('wifi', data.get('wifi'))  # 有=1  无=0
        print('停车', data.get('park'))  # 如果有例如：免费提供5个停车位。 没有为空
        print('经度', data.get('lng'))
        print('纬度', data.get('lat'))
        print('类型', data.get('breadCrumbNavDTOList')[2].get('title')[len(data.get('cityName')):])

        albums = []
        images = data.get('albumDTOList')
        for node in images:
            albums.append(node.get('url'))
        print('相册', albums)


if __name__ == '__main__':
    print("""
    \033[1;33m请输入商铺ID \033[0m
    """)
    p_id = input('(商铺网址末尾数字就是ID)')
    ParsePlayInfo(p_id)
