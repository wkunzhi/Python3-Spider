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


class ParseHotelInfo(object):
    def __init__(self, p_id):
        self.p_id = p_id


if __name__ == '__main__':
    print("""
    \033[1;33m请输入商铺ID \033[0m
    """)
    _id = input('(商铺网址末尾数字就是ID)')
    ParseHotelInfo(_id)
