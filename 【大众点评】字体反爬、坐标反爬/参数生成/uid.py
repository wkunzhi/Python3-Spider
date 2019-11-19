# -*- coding: utf-8 -*-
# __author__ = "zok"  362416272@qq.com
# Date: 2019-11-15  Python: 3.7
import execjs.runtime_names
import random
import requests
import time
from faker import Faker


info = random.choice([[800, 1024], [900, 1440], [1050, 1680], [1200, 1920], [1200, 1600]])

with open("encryp.js", "r", encoding="utf-8") as f:
    js = execjs.compile(f.read())

print('引擎', execjs.get().name)
uid = js.call('test', Faker().user_agent(), info[0], info[1])
page_id = js.call('puid')


headers = {
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.97 Safari/537.36',
    'Host': 'catfront.dianping.com',
    'Referer': 'http://www.dianping.com/shop/97789651',
    'Origin': 'http://www.dianping.com',
}

headers2 = {
    'Cookie': "_lxsdk_cuid=16e8184bc7cc8-00733806cb0caf-d087704-13c680-16e8184bc7cc8;",
    'Referer': 'http://www.dianping.com/shop/76311084',
    'Host': 'www.dianping.com',
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.97 Safari/537.36',
}
sign_url = 'http://catfront.dianping.com/api/pv?v=1&sdk=1.8.13&project=app-pc-main-shop&pageurl=main-shop&pageId={pageId}&timestamp={timestamp}&region=&operator=&network=&container=&os=&unionid={unionid}'
session = requests.session()
session.get('http://www.dianping.com/shop/76311084', headers=headers2)
response = session.post(sign_url.format(pageId=page_id, unionid=uid, timestamp=str(int(round(time.time() * 1000)))), headers=headers)
print(uid, page_id)
print(response)


