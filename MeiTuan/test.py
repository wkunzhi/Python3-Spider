# -*- coding: utf-8 -*-
# __author__ = "zok"  362416272@qq.com
# Date: 2019-06-05  Python: 3.7

url = 'https://hotel.meituan.com/41823880/?ci=2019-06-05&co=2019-06-06'
headers = {
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.77 Safari/537.36',
}
import requests

t = requests.get(url, headers=headers)
print(t.content.decode('utf-8'))