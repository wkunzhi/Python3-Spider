# -*- coding: utf-8 -*-
# __author__ = "zok"  362416272@qq.com
# Date: 2019-09-04  Python: 3.7

import requests
import execjs.runtime_names


class JinYiRegister:
    """
    金逸电影注册
    http://www.jycinema.com/wap/#/register
    """
    def __init__(self, phone):
        self.headers = {
            'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1',
        }
        self.url = 'http://www.jycinema.com/frontUIWebapp/appserver/photoMessageService/newsSendMessage'
        self.phone = phone

    @staticmethod
    def js_make(json_data):
        with open('encryp.js', 'r', encoding='utf-8') as f:
            js = execjs.compile(f.read())
        try:
            result = js.call("getEncryption", json_data)
            return result
        except Exception:
            print('js 异常')

    def register(self):
        data = '{"mobileNumber": ' + self.phone + ', "channelId": 7, "channelCode": "J0005", "memberId": ""}'
        data = {
            'params': self.js_make(data),
            'Origin': 'http://www.jycinema.com',
            'Referer': 'http://www.jycinema.com/wap/',
        }
        response = requests.post(self.url, data=data, headers=self.headers)
        print(response.content.decode('utf-8'))


if __name__ == '__main__':
    your_phone = input('请输入待注册手机号')
    jy = JinYiRegister(your_phone)
    jy.register()
