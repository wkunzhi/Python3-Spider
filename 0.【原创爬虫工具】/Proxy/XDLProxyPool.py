# -*- coding: utf-8 -*-
# __author__ = "zok"  362416272@qq.com
# Date: 2019-05-09  Python: 3.7
import redis
import requests
import re
import time
import json

from apscheduler.schedulers.blocking import BlockingScheduler

"""
可自型拓展其他的代理ip产品，只需修改调用接口即可
"""


class XDLProxyPool(object):
    """
    迅代理IP池
    """

    def __init__(self, api_url):
        try:
            """redis数据库配置区"""
            pool = redis.ConnectionPool(decode_responses=True)
            self.r = redis.Redis(connection_pool=pool)

            """白名单初始化"""
            ret = re.search(r'spiderId=(.*?)&orderno=(.*?)&returnType=\d+&count=(\d+)', api_url)
            self.spiderId, self.orderno, self.count = ret.group(1), ret.group(2), int(ret.group(3))
            self.init_proxy()
        except:
            print('请填入正确的API链接')

    def init_proxy(self):
        """
        初始化代理
        """
        print('\033[1;35m初始化中...\033[0m')

        # 取出当前IP地址
        response = requests.get('http://pv.sohu.com/cityjson?ie=utf-8')
        address = re.search(r'"cip": "(.*?)", "cid', response.text).group(1)

        # 加入白名单
        url = 'http://www.xdaili.cn/ipagent/newWhilteList/updateByOrder?orderno={orderno}&ip={ip}&spiderId={spiderId}'.format(
            orderno=self.orderno, ip=address, spiderId=self.spiderId)
        status = requests.get(url=url).status_code
        if status == 200:
            print('\033[1;35m初始化成功,启动中稍等..\033[0m')
            time.sleep(2)
            print('监控已开启')
        else:
            print('初始化白名单失败')

    def check_ip(self):
        """
        监控 IP 分数、个数，对其进行增删
        """

        # 检查分数
        nodes = self.r.zrevrange('XDLProxy', 0, -1, withscores=True)
        for i in nodes:
            node = list(i)
            score = int(node[1])
            if score <= 0:
                print('\033[1;33m分数过低剔除\033[0m')
                self.r.zrem('XDLProxy', node[0])

        # 检查个数
        _sum = self.r.zcard('XDLProxy')
        if _sum < self.count:
            self.add_ip(self.count - _sum)

    def add_ip(self, count):
        """
        提取IP
        """
        get_url = 'http://api.xdaili.cn/xdaili-api//greatRecharge/getGreatIp?spiderId={spiderId}&orderno={orderno}&returnType=2&count={count}'.format(
            spiderId=self.spiderId, orderno=self.orderno, count=str(count))

        # 返回的文本进行解析
        response = requests.get(get_url)
        if response.status_code == 200:
            ret = json.loads(response.text)
            if ret.get('ERRORCODE') in ['10036', '10038', '10055']:
                print('提取速度过快5秒钟提取一次')
            elif ret.get('ERRORCODE') == '10032':
                print('余额不足或今日已到提取上线')
            else:
                self.parse(ret)
        else:
            print('提取失败')

    def parse(self, data):
        """
        解析返回数据
        """
        proxy_list = data.get('RESULT')
        for node in proxy_list:
            proxy = node.get('ip') + ':' + node.get('port')
            self.save_to_redis(proxy, 10)  # 默认10分

    def save_to_redis(self, proxy, expire):
        """
        推送到redis集合中
        """
        print('代理 %s 推入redis集合' % proxy)
        self.r.zadd('XDLProxy', {proxy: expire})


def aps_run():
    """
    监控
    """
    xdl.check_ip()


# 填入提取链接
xdl = XDLProxyPool('填写讯代理api链接')

# 循环监控
scheduler = BlockingScheduler()
scheduler.add_job(aps_run, 'cron', second='*/1')  # 这里设置检测评论，推荐2s一次(默认)
scheduler.start()
