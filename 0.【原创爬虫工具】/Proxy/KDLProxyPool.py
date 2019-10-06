# -*- coding: utf-8 -*-
# __author__ = "zok"  362416272@qq.com
# Date: 2019-06-17  Python: 3.7

"""
快代理IP池
https://www.kuaidaili.com/ 放代理API
"""

import redis
import requests
import json

from apscheduler.schedulers.blocking import BlockingScheduler


class KDLProxyPool(object):
    """
    快代理IP池
    用的快代理开放代理API
    """

    def __init__(self, key, count):
        try:
            self.key = key  # 订单号
            self.count = count  # 代理池代理数量
            """redis数据库配置区"""
            pool = redis.ConnectionPool(decode_responses=True)
            self.r = redis.Redis(connection_pool=pool)
        except:
            print('请填入正确的API链接')

    def check_ip(self):
        """
        监控 IP 分数、个数，对其进行增删
        """
        # 检查分数
        nodes = self.r.zrevrange('KDLProxy', 0, -1, withscores=True)
        for i in nodes:
            node = list(i)
            score = int(node[1])
            if score <= 0:
                print('\033[1;33m分数过低剔除\033[0m')
                self.r.zrem('KDLProxy', node[0])

        # 检查个数
        _sum = self.r.zcard('KDLProxy')
        if _sum < self.count:
            self.add_ip(self.count - _sum)

    def add_ip(self, num):
        """
        提取IP
        """
        get_url = 'http://svip.kdlapi.com/api/getproxy/?orderid={key}&num={num}&protocol=2&method=2&an_ha=1&sp1=1&quality=2&format=json&sep=1'.format(
            key=self.key, num=num)

        # 返回的文本进行解析
        response = requests.get(get_url)
        if response.status_code == 200:
            ret = json.loads(response.text)
            if ret.get('code') == 0:
                self.parse(ret.get('data').get('proxy_list'))
            else:
                print(ret.get('msg'))
        else:
            print('提取失败')

    def parse(self, proxy_list):
        """
        解析返回数据
        """
        for node in proxy_list:
            self.save_to_redis(node, 10)  # 默认10分

    def save_to_redis(self, proxy, expire):
        """
        推送到redis集合中
        """
        print('代理 %s 推入redis集合' % proxy)
        self.r.zadd('KDLProxy', {proxy: expire})


def aps_run():
    """
    监控
    """
    kdl.check_ip()


kdl = KDLProxyPool('填写开放代理订单号', 20)

# 循环监控
scheduler = BlockingScheduler()
scheduler.add_job(aps_run, 'cron', second='*/1')  # 这里设置检测评论，推荐2s一次(默认)
scheduler.start()
