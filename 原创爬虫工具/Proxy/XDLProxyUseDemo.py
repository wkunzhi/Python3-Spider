# -*- coding: utf-8 -*-
# __author__ = "zok"  362416272@qq.com
# Date: 2019-05-11  Python: 3.7

import redis
import random

# 在scrapy中使用 代理池的demo


"""
middleware中代码如下
"""

pool = redis.ConnectionPool(decode_responses=True)  # redis 池
r = redis.Redis(connection_pool=pool)




"""
middleware中配置代理中间键
注意，根据爬取网址是http 还是https 来设置
"""

class MyProxy(object):
    """代理IP设置"""
    def process_request(self, request, spider):
        # 此处对接redis
        data = r.zrangebyscore('XDLProxy', 1, 100, withscores=True)
        ip, score = random.choice(data)
        request.meta['proxy'] = 'http://'+ip  # 根据自己情况填写




"""
拦截中间键中配置如下，写入计分器，满分20分
"""

class DownloaderMiddleware(object):
    def process_response(self, request, response, spider):
        # 对代理ip进行清洗
        proxy = request._meta.get('proxy')
        if not response.status == 200:
            print('IP访问失败')
            if proxy:
                proxy = proxy[proxy.find('/')+2:]  # 提取当此访问proxy
                r.zincrby('XDLProxy', -1, proxy)  # redis 命令修改
        else:
            if proxy:
                proxy = proxy[proxy.find('/') + 2:]  # 提取当此访问proxy
                score = r.zscore('XDLProxy', proxy)  # 取出分数
                if score < 20:
                    r.zincrby('XDLProxy', 1, proxy)  # redis 新版本命令更改这样了
        return response

    def process_exception(self, request, exception, spider):  # 可能由于IP质量问题无法访问超时
        print('超时异常')
        proxy = request._meta.get('proxy')
        if proxy:
            proxy = proxy[proxy.find('/') + 2:]
            r.zincrby('XDLProxy', -1, proxy)  # redis 新版本命令更改这样了
            return request


"""
setting中配置
"""
DOWNLOAD_TIMEOUT = 5  # 有的时候代理ip失效，会导致一直卡在那里 ，也有可能是用http 访问https
DOWNLOADER_MIDDLEWARES = {
    'middlewares.MyProxy': 543,  # 自定义代理IP
    'middlewares.spiderDownloaderMiddleware': 600,  # 拦截301、302等跳转  必须设置到600
}