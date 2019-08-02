# -*- coding: utf-8 -*-
# __author__ = "zok"  362416272@qq.com
# Date: 2019-07-12  Python: 3.7


from config import PROXY_PASS, PROXY_USER

# 代理服务器
proxyHost = "http-dyn.abuyun.com"
proxyPort = "9020"


proxyServer = "http://%(user)s:%(pass)s@%(host)s:%(port)s" % {
    "host": proxyHost,
    "port": proxyPort,
    "user": PROXY_USER,
    "pass": PROXY_PASS,
}

if not PROXY_USER or not PROXY_PASS:
    msg = """
    请先在 config.py 配置文件内填入代理IP账号
    阿布云代理IP：https://www.abuyun.com/http-proxy/products.html
    """
    print(msg)
    exit()
