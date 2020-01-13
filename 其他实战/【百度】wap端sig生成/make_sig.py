# -*- coding: utf-8 -*-
# __author__ = "zok"  362416272@qq.com
# Date: 2020-01-13  Python: 3.7

"""
wap端 sig 参数生成
应水友需求，帮忙弄的
需要 V8 引擎！
"""

import execjs
import os

print(execjs.get().name)


with open(os.path.dirname(__file__) + '/v3_update.js') as f:
    js = execjs.compile(f.read())


# dv 可固定， 用了一些随机参数生成的。
dv = 'tk0.48553508531670751578885709447.0@mmy0VdnCHg9mlXM-7ZM-tbvB8YHXK3MIEg9WNa8V3x9Cqa5kqgOXcFOjca5BJWOB7eNIzY5k9j8VNKUk0~9F~~5rOiHXvivmzzHjJFMXubOG~W8VRln6~l9k0g9mlXM-7ZM-tbvB8YHXK3MIEg9WH~9V7x9Cql5kqgOXcFOjca5BJWOB7eNIzY5k9-9CRWUq__dy0ov8Cpy5k9j8S~W8Cpz9SlXM-7ZM-tbH-JSMIYaUktanm~F9VEg9WEj8VRgOXcFOjca5BJWOB7eNIzYUk0~9kHg9C9~5kEF8WqW9mlx-vvLwvB87Tr4hByj9G~F5kHyGynvrg~5Vty8CEW8Cqy8C9l8VH~8WEl8CHynkRz8WqK8kt-5Vq_jy~56JeOrJXLIKYOq__Hyr9m~~5k0K9k9g9WHj5k0K9Vqg9Cqy9m~lnCp~5k0K9Vqg9Cqa9q__'
username = '这是测试'  # 用户名
s_code = 'ilvw'  # 验证码
verifystring = 'jxOb3456654e9d67a5c02ab155fe9012fb44e5b90ae9b01ca02'  # 首页返回的

result = js.call('v3test', dv, s_code, verifystring)

print(result)