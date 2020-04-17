# -*- coding: utf-8 -*-
# __author__ = "zok"  362416272@qq.com
# Date: 2019-12-23  Python: 3.7

UA = 'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36'
REFERER = 'https://passport.baidu.com/?getpassindex'
LANGUAGE = 'zh-CN,zh;q=0.9'
CONNECTION = 'keep-alive'

headers_get_phone = {
    'Connection': CONNECTION,
    'User-Agent': UA,
    'Accept': '*/*',
    'Sec-Fetch-Site': 'same-origin',
    'Sec-Fetch-Mode': 'no-cors',
    'Referer': REFERER,
    'Accept-Language': LANGUAGE
}


headers_token = {
    "Connection": CONNECTION,
    "Content-Lengt": '999',
    "Cache-Control": 'max-age=0',
    "Origin": "https://passport.baidu.com",
    "Upgrade-Insecure-Requests": '1',
    "Content-Type": "application/x-www-form-urlencoded",
    "User-Agent": UA,
    "Sec-Fetch-User": "?1",
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3",
    "Sec-Fetch-Site": "same-origin",
    "Sec-Fetch-Mode": "navigate",
    "Referer": REFERER,
    "Accept-Language": LANGUAGE,
}

headers_img = {
    'Connection': CONNECTION,
    'User-Agent': UA,
    'Accept': 'image/webp,image/apng,image/*,*/*;q=0.8',
    'Sec-Fetch-Site': 'same-origin',
    'Sec-Fetch-Mode': 'no-cors',
    'Referer': REFERER,
    'Accept-Language': LANGUAGE,
}

headers_bds_token = {
    'Connection': CONNECTION,
    'Upgrade-Insecure-Requests': '1',
    'User-Agent': UA,
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3',
    'Sec-Fetch-Site': 'none',
    'Sec-Fetch-Mode': 'navigate',
    'Accept-Language': LANGUAGE,
}

headers_verify_str = {
    'Connection': CONNECTION,
    'User-Agent': UA,
    'Accept': '*/*',
    'Sec-Fetch-Site': 'same-origin',
    'Sec-Fetch-Mode': 'no-cors',
    'Referer': REFERER,
    'Accept-Language': LANGUAGE,
}
