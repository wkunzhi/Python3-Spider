# -*- encoding: utf-8 -*-
# Time    :   2020/01/16
# Author  :   Zok
# Email   :   362416272@qq.com

import requests
import re
import json
from copyheaders import headers_raw_to_dict


class Food:
    """
    根据输入美团餐馆名，解析参观基础信息
    """
    def __init__(self):
        self.headers = headers_raw_to_dict(b"""
        Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9
        Accept-Encoding: gzip, deflate, br
        Accept-Language: zh-CN,zh;q=0.9
        Cache-Control: max-age=0
        Connection: keep-alive
        Cookie: _lxsdk_s=16fb0ce3a0d-4cf-d9e-cf2%7C%7C1
        Host: www.meituan.com
        Sec-Fetch-Mode: navigate
        Sec-Fetch-Site: none
        Sec-Fetch-User: ?1
        Upgrade-Insecure-Requests: 1
        User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.88 Safari/537.36
        """)

    def get_info(self, url):
        response = requests.get(url, headers=self.headers)
        data = json.loads(re.search(r'<script>window\._appState = (.*?);</script><script', response.text).group(1))
        info = data.get('detailInfo')
        images = data.get('photos')
        print(info)
        print(images)


if __name__ == '__main__':
    fd = Food()
    fd.get_info("https://www.meituan.com/meishi/177501077/")