# -*- coding: utf-8 -*-
# __author__ = "zok"  362416272@qq.com
# Date: 2019-07-29  Python: 3.7


import requests
import hashlib
import time
import json

from urllib import parse


class ZGC:
    """
    解析过程说明 https://www.zhangkunzhi.com/?p=135

    1. 用的 CryptoJS md5 加密
    2. 需要带入 cookies
    """

    def __init__(self, username, password):
        self.username = username
        self.password = password
        self.headers = {
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.142 Safari/537.36',
        }

    def get_cookies(self):
        """取cookies
        """
        _now = time.time()
        t = str(_now)[:7]
        _jsonp = int(round(_now * 1000))
        pick = 'http://js.zol.com.cn/pvn/pv.ht?&t={t}&c=&callback=_jsonp{_jsonp}'.format(t=t, _jsonp=_jsonp)
        try:
            content = requests.get(pick, headers=self.headers).text
            ipck = json.loads(content[content.find('(')+1:-1]).get('ipck')
            return parse.quote(ipck)
        except:
            print('cookies 获取失败')

    def login(self, ipck):
        """登陆
        """
        _str_now = str(int(time.time()))
        login_url = 'http://service.zol.com.cn/user/ajax/login2014/login.php'
        data = {
            'userid': self.username,
            'pwd': self.make_md5(self.password),
            'is_auto': '1',
            'backUrl': 'http://www.zol.com.cn/'
        }
        cookies = {
            'Hm_lpvt_ae5edc2bc4fc71370807f6187f0a2dd0': _str_now,
            'Hm_lvt_ae5edc2bc4fc71370807f6187f0a2dd0': _str_now,
            'ip_ck': ipck,
            'vn': '1',
            'lv': _str_now,
            'z_pro_city': 's_provice%3Dzhongqing%26s_city%3Dzhongqing',
            'z_day': 'ixgo20%3D1'
        }

        response = requests.post(login_url, headers=self.headers, data=data, cookies=cookies)
        msg = json.loads(response.content)
        return msg

    @staticmethod
    def make_md5(_str):
        """md5 生成
        """
        # 待加密信息
        text = _str + 'zol'
        # 创建md5对象
        m = hashlib.md5()
        m.update(text.encode(encoding='utf-8'))
        str_md5 = m.hexdigest()
        return str_md5

    def main(self):
        ipck = self.get_cookies()
        msg = self.login(ipck)
        print(msg)


if __name__ == '__main__':
    user = input('请输入中关村账号')
    pwd = input('请输入中关村密码')
    zgc = ZGC(user, pwd)
    zgc.main()
