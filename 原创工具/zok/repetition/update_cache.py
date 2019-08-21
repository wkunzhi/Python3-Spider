# -*- coding: utf-8 -*-
# __author__ = "zok" 
# Date: 2019/3/7  Python: 3.7

import redis
import hashlib

from zok.zok_config import REDIS_PORT, REDIS_DB_NAME, REDIS_HOST, REDIS_USER, REDIS_PASSWORD


class CacheRedis(object):

    pool = redis.ConnectionPool(host=REDIS_HOST, port=REDIS_PORT, db=REDIS_DB_NAME, password=REDIS_PASSWORD, decode_responses=True)
    r = redis.Redis(connection_pool=pool)
    # 加上decode_responses=True，写入的键值对中的value为str类型，不加这个参数写入的则为字节类型。

    # 1. 根据储存数据取值判断是否存在
    # 3. 不存在-已有数据: 需要更新
    # 4. 不存在-无数据: 需要插入
    # 5. 存在 直接跳过储存

    # BUG 在redis数据库丢失的情况下【会全体重新录入】

    @staticmethod
    def get_md5(data):
        md5 = hashlib.md5(data.encode('utf-8')).hexdigest()
        return md5

    def redis_exists(self, member, md5):
        """
        验证hash是否存在， 有返回True，没有返回False
        :param member: 验证区域集合Key
        :param md5: 要储存的数据
        :return: True or False
        """
        print()
        if self.r.sismember(member, md5):
            return True
        else:
            return False

    def save_redis(self, member, md5):
        self.r.sadd(member, md5)

