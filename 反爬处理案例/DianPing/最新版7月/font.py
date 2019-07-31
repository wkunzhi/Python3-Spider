# -*- coding: utf-8 -*-
# __author__ = "zok"  362416272@qq.com
# Date: 2019-07-25  Python: 3.7
import redis
import json
import requests
import re
import os

from 反爬处理案例.DianPing.最新版7月.file.font import FONT_LIST
from fontTools.ttLib import TTFont

HASH_TABLE = 'dianping:font'


"""
【已知问题】

在爬取H5 页面时候可能有多个字库，这种情况下自行修改下代码，
做一个判断取出class信息对应字库即可，请使用者自行拓展！
"""


class ParseFontClass:

    def __init__(self, css_url, redis_host='127.0.0.1', redis_port=6379, redis_pass=None):
        """
        redis 默认链接本机
        :param redis_host: redis 链接地址
        :param redis_port: redis 端口号
        :param redis_pass: redis 密码
        """
        self.name_list = None
        if redis_pass:
            pool = redis.ConnectionPool(host=redis_host, port=redis_port, password=redis_pass, decode_responses=True)
        else:
            pool = redis.ConnectionPool(host=redis_host, port=redis_port, decode_responses=True)
        self.r = redis.Redis(connection_pool=pool)

        self.css_url = css_url
        self.start()

    def parse_ttf(self, code):
        clean_code = code.replace(';', '')[-4:]  # 只提取匹配区域
        result_list = self.r.hmget(HASH_TABLE, self.name_list)  # 取出对应字库表（已修复bug）
        for result in result_list:
            json_data = json.loads(result)
            if 'uni' + clean_code in json_data:
                return json_data['uni' + clean_code]
        return False

    def add_hash(self, name, json_data):
        """新增 hash
        """
        self.r.hset(HASH_TABLE, name, json_data)

    def check_hash(self, name):
        """判断 hash key 是否存在
        """
        return self.r.hexists(HASH_TABLE, name)

    def get_ttf(self, css_url):
        """获取字体链接
        """
        headers = {
            'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.142 Safari/537.36'
        }
        result = requests.get(css_url, headers=headers)
        if result.status_code == 200:
            self.install_ttf(self.get_ttf_urls(result.text))
        else:
            return None

    def install_ttf(self, ttf_list):
        """安装字体
        """
        self.name_list = [ttf[ttf.rfind('/')+1: -5] for ttf in ttf_list]  # 提取字库名
        # print(name_list)
        for index, name in enumerate(self.name_list):
            if self.check_hash(name):
                # 已存在无需安装
                continue
            # 安装字体
            with open('file/' + name + '.woff', 'wb+') as f:
                f.write(requests.get('http://' + ttf_list[index]).content)  # 下载写入
                font = TTFont('file/' + name + '.woff')
                uni_list = font['cmap'].tables[0].ttFont.getGlyphOrder()  # 取出字形保存到uniList中
                json_data = json.dumps(dict(zip(uni_list, FONT_LIST)), ensure_ascii=False)
                self.add_hash(name, json_data)
                os.remove('file/' + name + '.woff')  # 用完了删掉，节省资源占用

    @staticmethod
    def get_ttf_urls(text):
        """提取字体链接
        """
        ttf_urls = []
        urls = re.findall(r'url\("//(.*?)"\)', text)
        for url in urls:
            if url not in ttf_urls and '.woff' in url:
                ttf_urls.append(url)

        return ttf_urls

    def start(self):
        self.get_ttf(self.css_url)
