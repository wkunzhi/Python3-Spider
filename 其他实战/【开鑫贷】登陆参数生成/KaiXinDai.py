# -*- coding: utf-8 -*-
# __author__ = "zok"  362416272@qq.com
# Date: 2019-09-15  Python: 3.7
import requests
import execjs.runtime_names


class KaiXinDai:
    """
    开鑫贷登陆参数解密
    https://www.gkkxd.com/userAuth/login
    """
    def __init__(self, pwd):
        self.js = None
        self.pwd = pwd
        self.init_js()

    @staticmethod
    def get_dl():
        from lxml import etree
        url = 'https://www.kxjf.com/user/login?mainSiteName=kxd'
        headers = {
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.132 Safari/537.36',
            'Host': 'www.kxjf.com',
            'Referer': 'https://www.gkkxd.com/userAuth/login',
        }
        response = requests.get(url, headers=headers)
        etree = etree.HTML(response.text)
        dlmy = etree.xpath('//*[@id="dlmy"]/@value')[0]
        return dlmy

    def init_js(self):
        with open('encryp.js', 'r', encoding='utf-8') as f:
            self.js = execjs.compile(f.read())

    def make_param(self):
        pwd = self.js.call('test', self.get_dl(), self.pwd)
        print('pwd生成', pwd)


if __name__ == '__main__':
    password = input('请输入用户密码')
    kxd = KaiXinDai(password)
    kxd.make_param()
