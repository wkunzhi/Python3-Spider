# -*- coding: utf-8 -*-
# __author__ = "zok"  362416272@qq.com
# Date: 2019-07-13  Python: 3.7
import datetime
import aiohttp

from tool.proxy import proxyServer


async def get(url):
    """请求页面
    """
    headers = {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.100 Safari/537.36',
        'Host': 'www.funi.com'
    }

    try:
        """conn = aiohttp.TCPConnector(verify_ssl=False) connector=conn"""
        async with aiohttp.ClientSession(headers=headers) as session:
            async with session.get(url, proxy=proxyServer) as response:
                return await response.text("utf-8")
    except TimeoutError as te:
        print('超时', te)


def count_time(func):
    """取运行时间
    """
    def int_time(*args, **kwargs):
        start_time = datetime.datetime.now()  # 程序开始时间
        func()
        over_time = datetime.datetime.now()   # 程序结束时间
        total_time = (over_time-start_time).total_seconds()
        print('程序耗时: %s 秒' % total_time)
    return int_time
