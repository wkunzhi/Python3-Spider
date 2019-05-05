# -*- coding: utf-8 -*-
# __author__ = "zok"  362416272@qq.com
# Date: 2019-05-05  Python: 3.7

import requests
import json
import re
from pypinyin import pinyin


class ParseAreas(object):

    def __init__(self, city_name):
        self.alphabet = "".join([i[0][0] for i in pinyin(city_name)])

        self.get_data()

    def get_data(self):

        url = 'https://{city}.meituan.com/xiuxianyule/'
        headers = {
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.77 Safari/537.36',
        }
        target_url = url.format(city=self.alphabet)
        response = requests.get(target_url, headers=headers)
        data = response.text
        self.parse(data, target_url)

    @ staticmethod
    def parse(data, url):
        """解析数据
        """
        py_dict = {}
        text = re.search(r'"city":{"id":(.*?),"name":"(.*?)","pinyin".*?"area":(.*?),"category":', data)
        if text:
            py_dict = {'城市': text.group(2), '城市ID': text.group(1)}
            dict_info = json.loads(text.group(3)).get('children')  # 提取区域信息
            py_dict['区'] = []

            for node in dict_info:
                if node.get('name') == '推荐商圈':
                    continue  # 推荐商圈过滤
                # 二级区域
                district = {'区名': node.get('name'), '区ID': node.get('id'),
                            '区链接': url + 'b' + str(node.get('id')) + '/'}
                if node.get('children'):
                    district['街道'] = []
                    # 三级区域
                    for i in node.get('children'):
                        area = {'街道名': i.get('name'), '街道ID': i.get('id'),
                                '街道链接': url + 'b' + str(i.get('id')) + '/'}
                        district['街道'].append(area)

                py_dict['区'].append(district)

        print(json.dumps(py_dict, ensure_ascii=False))


if __name__ == '__main__':
    print("""
    \033[1;33m娱乐板块区域解析
    请输入城市名例如  北京   
    返回json格式\033[0m
    """)
    chines = input('输入城市名')
    ParseAreas(chines)
