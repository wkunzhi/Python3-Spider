# -*- coding: utf-8 -*-
# __author__ = "zok"  362416272@qq.com
# Date: 2019-06-24  Python: 3.7

"""
将图redis中储存的网络图片链接，并发直传到 OSS 上
"""

import oss2
import redis
import requests

from concurrent.futures import ThreadPoolExecutor  # 线程池模块

KEY = ''
KEYSECRET = ''
BUCKETNAME = ''
ENDPOINT = 'http://oss-cn-hangzhou.aliyuncs.com'

REDIS_HOST = "localhost"
REDIS_USER = "root"
REDIS_PASSWORD = ""
REDIS_DB_NAME = 1
REDIS_PORT = 6379

list_name = 'restaurant'  # 列队名

# oss
auth = oss2.Auth(KEY, KEYSECRET)
bucket = oss2.Bucket(auth, ENDPOINT, BUCKETNAME)

# redis 池
pool = redis.ConnectionPool(host=REDIS_HOST, port=REDIS_PORT, db=REDIS_DB_NAME, password=REDIS_PASSWORD,
                            decode_responses=True)
r = redis.Redis(connection_pool=pool)


def put_img():
    """上传逻辑，根据项目需求修改即可"""
    url = r.rpop(list_name)
    input = requests.get(url)
    if input.status_code == 200:
        file_name = url  # this is file name
        obj = bucket.put_object(file_name, input)
        if obj.status == 200:
            print('OK', file_name)
    else:
        r.lpush(list_name)


def get_len():
    return r.llen(list_name)


if __name__ == '__main__':
    list_len = get_len()
    print('专辑总图数量', list_len)
    pool = ThreadPoolExecutor()  # 设置线程池大小，默认等于cpu核数
    for i in range(list_len):
        pool.submit(put_img)

    pool.shutdown(wait=True)
    print('主进程')
