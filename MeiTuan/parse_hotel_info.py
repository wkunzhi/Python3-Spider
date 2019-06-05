# -*- coding: utf-8 -*-
# __author__ = "zok"  362416272@qq.com
# Date: 2019-06-05  Python: 3.7

"""
解析
美团酒店店铺的基础信息
该板块信息隐藏在get请求后的js中直接用正则匹配出信息再抽取出来
"""
import requests
import re
import json
import time


class ParseHotelInfo(object):
    headers = {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.77 Safari/537.36',
    }

    def __init__(self, p_id):
        self.p_id = p_id

    def go_to_hotel(self):
        """执行访问
        """
        # 拼接日期
        now_day = time.strftime('%Y-%m-%d', time.localtime(time.time()))

        # 组合 get 地址
        url = 'https://hotel.meituan.com/' + self.p_id + '/?ci=' + now_day + '&co=' + now_day
        data = requests.get(url, headers=self.headers).content.decode('utf-8')

        # 提取有效区域
        info = re.search(r'window.__INITIAL_STATE__=(.*?)</script>', data, flags=re.DOTALL)
        if info:
            info_dict = json.loads(info.group(1).strip()[:-1])
            self.parse_html(info_dict)
        else:
            print('访问失效')

    def parse_html(self, data_dict):
        data = data_dict.get('poiData')
        print('店名', data.get('name'))
        print('店铺id', data.get('poiid'))
        print('城市id', data.get('cityId'))
        print('地址', data.get('addr'))
        print('lng', data.get('lng'))
        print('lat', data.get('lat'))
        print('封面', data.get('frontImg'))
        print('wifi', data.get('wifi'))
        print('地区id', data.get('areaId'))
        print('地区名', data.get('areaName'))
        print('平均消费', data.get('avgPrice'))
        print('类别id', data.get('brandId'))
        print('类别名', data.get('brandName'))
        print('简介', data.get('introduction'))
        print('星级', data.get('highHotelStar'))
        print('舒适类型', data.get('hotelStar'))
        print('电话', data.get('phoneList'))
        print('平均分', data.get('avgScore'))
        print('标签', data.get('poiAttrTagList'))
        print('城市名', data.get('cityName'))
        print('城市拼音', data.get('cityPinyin'))

        poi_data = data_dict.get('poiExt')  # 酒店详情
        print('服务', poi_data.get('serviceIconsInfo').get('serviceIcons'))


if __name__ == '__main__':
    print("""\033[1;33m请输入酒店ID \033[0m""")
    # _id = input('(链接末尾数字就是ID)')
    _id = '41823880'  # 测试
    hotel = ParseHotelInfo(_id)
    hotel.go_to_hotel()
