# -*- coding: utf-8 -*-
# __author__ = "zok"  362416272@qq.com
# Date: 2019-11-08  Python: 3.7

import requests
import json
import execjs.runtime_names


with open('encryp.js', 'r', encoding='utf-8') as f:
    js = execjs.compile(f.read())

print('引擎', execjs.get().name)

data = {
    'time_interval': '',
    'tag': '',
    'tag_type': '',
    'province': '',
    'lunci': '',
    'page': '1',
    'num': '20',
    'unionid': '',
}

headers = {
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.97 Safari/537.36'
}

response = requests.post('https://vipapi.qimingpian.com/DataList/productListVip', data=data, headers=headers)

re_data = json.loads(response.text)

data = js.call('get_info', re_data.get('encrypt_data'))
print(data)
