# -*- coding: utf-8 -*-
# __author__ = "zok" 
# Date: 2019/3/5  Python: 3.7

import base64
from zok.zok_config import *

# 代理服务器
proxyServer = "http://http-dyn.abuyun.com:9020"


proxyAuth = "Basic " + base64.urlsafe_b64encode(bytes((PROXY_USER + ":" + PROXY_PASS), "ascii")).decode("utf8")


class ProxyMiddleware(object):
    """自定义中间件代理IP"""
    def process_request(self, request, spider):
        request.meta["proxy"] = proxyServer
        request.headers["Proxy-Authorization"] = proxyAuth

