# -*- coding: utf-8 -*-
# __author__ = "zok"  362416272@qq.com
# Date: 2019-07-12  Python: 3.7

import asyncio

from tool.parse import *
from tool.toolkit import *


async def get_max_page():
    """获取总页数
    """
    url = TARGET_URL.format(page=1)
    result = await get(url)
    return await parse_total_page(result)


async def get_house_url(page):
    """获取地产链接
    """
    url = TARGET_URL.format(page=page)
    result = await get(url)
    await parse_house_url(result, page)


@count_time
def main():
    loop = asyncio.get_event_loop()

    # 1. 获取总页数
    task = loop.create_task(get_max_page())
    total_page = loop.run_until_complete(task)

    # 2. 获取链接
    house_url_func = [asyncio.ensure_future(get_house_url(_)) for _ in range(1, int(total_page))]
    loop.run_until_complete(asyncio.wait(house_url_func))

    # 3. 楼盘详情


if __name__ == '__main__':
    main()
