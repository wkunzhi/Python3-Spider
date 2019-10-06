# -*- coding: utf-8 -*-
# __author__ = "zok"  362416272@qq.com
# Date: 2019-05-13  Python: 3.7
import redis
import random

from Cookies.MeiTuan.config import *


class RedisClient(object):
    def __init__(self, t_type, website, host=REDIS_HOST, port=REDIS_PORT, password=REDIS_PASSWORD):
        """
        初始化 redis 池
        :param t_type: 链接类型
        :param website: 站点
        :param host: IP
        :param port: 端口
        :param password: 密码
        """
        if password:
            pool = redis.ConnectionPool(host=host, port=port, password=password)
        else:
            pool = redis.ConnectionPool(host=host, port=port)
        self.db = redis.Redis(connection_pool=pool)
        self.type = t_type
        self.website = website

    @property
    def name(self):
        """
        获取Hash名
        :return: Hash名称
        """
        return "{type}:{website}".format(type=self.type, website=self.website)

    def set(self, username, value):
        """
        设置键值对
        :param username: 用户名
        :param value: 密码或Cookies
        :return: 设置结果
        """
        return self.db.hset(self.name, username, value)

    def get(self, username):
        """
        根据键名获取值
        :param username: 用户名
        :return: 获取结果
        """
        return self.db.hdel(self.name, username)

    def delete(self, username):
        """
        根据键名删除
        :param username: 用户名
        :return: 删除结果
        """
        return self.db.hdel(self.name, username)

    def count(self):
        """
        获取数目
        :return: 数目
        """
        return self.db.hlen(self.name)

    def random(self):
        """
        随机得到键值，用于随机Cookies获取
        :return:
        """
        return random.choice(self.db.hvals(self.name))  # 返回所有，再随机取

    def all_username(self):
        """
        获取所有账户信息
        :return: 所有用户名
        """
        return self.db.hkeys(self.name)

    def all(self):
        """
        获取所有键值对
        :return: 用户名和密码或Cookies的映射表
        """
        return self.db.hgetall(self.name)


