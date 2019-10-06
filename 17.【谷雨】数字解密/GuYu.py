# -*- coding: utf-8 -*-
# __author__ = "zok"  362416272@qq.com
# Date: 2019-09-25  Python: 3.7

import requests
import os
from fontTools.ttLib import TTFont


class Font:
    """
    https://guyujiezi.com/
    谷雨解字的 数字解密
    现在版本的 雨谷字体加的xml 会有一个移位操作
    """
    def __init__(self, uri):
        self.url = uri
        self.filename = uri.split('/')[-1]
        self.font = None
        self._list = []

    def check(self):
        """检查目录
        """
        if not os.path.isfile(self.filename):
            resp = requests.get(self.url)
            with open(self.filename, 'wb') as f:
                f.write(resp.content)
            # TTFont 存为 xml
        self.font = TTFont(self.filename)
        self.font.saveXML(self.filename.replace(self.filename.split('.')[-1], 'xml'))

    def get_wo(self):
        """获取 woff
        """
        self.check()
        ph = self.font['cmap']
        _dict = ph.tables[0].cmap
        # 1. 字典取 value 列表化
        # 2. str 取最后 2 位，并转为 int
        # 3. 减去 17 并从新组装列表
        self._list = [int(i[-2:])-17 for i in list(_dict.values())]
        """
        处理移位
        """
        print(list(_dict.values()))
        print(self._list)

    def parse(self, number):
        _str = ''
        for num in number:
            _str += str(self._list[int(num)])
        print('最终展示字', int(_str))


if __name__ == '__main__':
    ft = Font("https://guyujiezi.com/fonts/2DLw9u/3iZbr8.woff")
    ft.get_wo()
    # 输入页面数字测试
    ft.parse('947')


