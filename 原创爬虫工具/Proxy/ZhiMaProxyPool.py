# -*- coding: utf-8 -*-
# __author__ = "zok"  362416272@qq.com
# Date: 2019-05-2  Python: 3.7
import redis
import datetime
import requests
import json
import re
import time

from apscheduler.schedulers.blocking import BlockingScheduler
from dateutil.parser import parse


class ZhiMaPool(object):
    """
    芝麻代理按次提取(非套餐)代理IP
    """

    """redis数据库配置区"""
    pool = redis.ConnectionPool(decode_responses=True)
    r = redis.Redis(connection_pool=pool)

    def __init__(self, key, ip_sum=20, ttl=1000):
        """
        init zhima
        :param key: ZhiMaProxy    http://h.zhimaruanjian.com/pay/
        :param ip_sum: The largest number
        :param ttl:  Set survival time | seconds
        """
        self.key = key
        self.ip_sum = ip_sum
        self.ttl = ttl

        self._init()  # init the proxy

    def _init(self):
        """
        Initialize the proxy
        """
        print('\033[1;35m初始化中...\033[0m')
        response = requests.get('http://pv.sohu.com/cityjson?ie=utf-8')

        address = re.search(r'"cip": "(.*?)", "cid', response.text).group(1)

        url = 'http://web.http.cnapi.cc/index/index/save_white?neek=66439&appkey={key}&white={local}'.format(
            key=self.key, local=address)
        response = requests.get(url=url)
        code = json.loads(response.text).get('code')
        if code == 0 or code == 115:
            print('\033[1;35m初始化成功,启动中稍等..\033[0m')
        else:
            print('初始化芝麻账号失败')
        time.sleep(2)

    def check_ip(self):
        """
        Check scores & due dates & proxy sum
        :return How many proxy are needed
        """
        # check dates and scores
        now_time = int(time.time())
        nodes = self.r.zrevrange('ZhiMaProxy', 0, -1, withscores=True)
        for i in nodes:
            flag = False
            node = list(i)
            score_str = str(int(node[1]))
            time_stamp = int(score_str[-10:])
            if time_stamp-now_time <= 0:
                print('代理过期删除', str(node[0]))
                self.r.zrem('ZhiMaProxy', node[0])
            if len(score_str[:-10]) == 0:
                flag = True  # 删除
            else:
                # 可能由于频率过快出现负数
                if int(node[1]) < 0:
                    flag = True  # 删除

            if flag:
                print('分数过低剔除')
                self.r.zrem('ZhiMaProxy', node[0])

        # check num
        _sum = self.r.zcard('ZhiMaProxy')
        if _sum < self.ip_sum:
            self.add_ip(count=self.ip_sum-_sum)

    def add_ip(self, count=1, time_type=1, ip_type='http'):
        """
        get proxy ip and port
        """
        port = '11' if ip_type == 'https' else '1'  # http(default) & https

        get_url = 'http://webapi.http.zhimacangku.com/getip?num={num}&type=2&pro=&city=0&yys=0&port={port}&time={time}&ts=1&ys=0&cs=0&lb=1&sb=0&pb=4&mr=1&regions='.format(
            num=count, port=port, time=time_type)

        # time 1=5m~25m   2=25m~3h  3=3h~6h  4=6h~12h
        response = requests.get(get_url)
        self.parse(response.text)

    def del_ip(self):
        pass

    def parse(self, json_data):
        """
        parse response json
        """
        count = 0
        ret_dict = json.loads(json_data)
        if ret_dict.get('success'):
            nodes = ret_dict.get('data')
            for node in nodes:
                end_time = self.get_end_time(node.get('expire_time'))
                if not end_time:
                    """该域名存活时间过短，已弃用"""
                    continue
                self.save_to_redis(node.get('ip') + ':' + str(node.get('port')), int('10' + str(end_time)))
                count += 1

            self.get_balance(count, len(nodes))  # get balance
        else:
            print('获取代理失败:', ret_dict)

    def get_end_time(self, parse_time):
        """
        time transformation
        """
        a = parse(parse_time)
        b = parse(datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S"))
        results = (a - b).total_seconds()
        if results > self.ttl:
            stamp = int(time.mktime(time.strptime(parse_time, "%Y-%m-%d %H:%M:%S")))
            return stamp
        else:
            return

    def save_to_redis(self, proxy, expire):
        """
        proxy save to redis，default score is 10
        """
        self.r.zadd('ZhiMaProxy', {proxy: expire})

    def get_balance(self, count, total):
        """
        get balance from web api
        """
        balance_url = 'http://web.http.cnapi.cc/index/index/get_my_balance?neek=66439&appkey={key}'.format(key=self.key)
        response = json.loads(requests.get(balance_url).text)
        if response.get('success'):
            print('\033[1;34m余额:%s ,提取%s个\033[0m' % (response.get('data').get('balance'), str(count)))
            if total != count:
                print('\033[1;31m由于剩下存活时间过短弃用%s个\033[0m' % str(total - count))
        else:
            print(response.get('msg'))


def aps_run():
    """
    apscheduler func
    """
    zm.check_ip()


zm = ZhiMaPool('your key')  # 请填写你的key  参考文章：https://blog.zhangkunzhi.com/2019/05/02/%E6%90%AD%E5%BB%BA%E4%B8%80%E4%B8%AA%E8%B6%85%E7%AE%80%E5%8D%95%E7%9A%84%E5%AE%9E%E7%94%A8%E7%9A%84%E9%AB%98%E5%8F%AF%E7%94%A8%E4%BB%98%E8%B4%B9IP%E6%B1%A0/index.html

scheduler = BlockingScheduler()
scheduler.add_job(aps_run, 'cron', second='*/2')  # 这里设置检测评论，推荐2s一次(默认)
scheduler.start()

