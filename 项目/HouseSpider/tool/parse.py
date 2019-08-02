# -*- coding: utf-8 -*-
# __author__ = "zok"  362416272@qq.com
# Date: 2019-07-12  Python: 3.7

from pyquery import PyQuery as pq
from config import *


async def parse_total_page(result):
    """解析总页数
    """
    doc = pq(result)
    max_page = doc('.pages a').eq(-2).text()
    print('数据总: {total} 页'.format(total=max_page))
    return max_page


async def parse_house_url(result, page):
    """页面解析链接
    """
    doc = pq(result)
    dls = doc('.fleft div').eq(-2)('dl')
    n = 0
    for dl in dls:
        href = pq(dl)('dt a').attr('href')
        href = HOST + href[: href.find(';')]  # 清洗链接
        print(href)
        n += 1
    if not n:
        print('第 {page} 抽取链接失败'.format(page=page))


