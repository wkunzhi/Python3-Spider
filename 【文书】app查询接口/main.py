# __author__ = "zok" 362416272@qq.com
# Date: 2020/7/24 Python:3.7

import requests
import time
import random
import json
import base64
import pyDes
from datetime import datetime


class TripleDesUtils:

    def encryption(self, data: str, key, iv) -> str:
        """3des 加密
        """
        _encryption_result = pyDes.triple_des(key, pyDes.CBC, iv, None, pyDes.PAD_PKCS5).encrypt(data)
        _encryption_result = self._base64encode(_encryption_result).decode()
        return _encryption_result

    def decrypt(self, data: str, key, iv) -> str:
        """3des 解密
        """
        data = self._base64decode(data)
        _decrypt_result = pyDes.triple_des(key, pyDes.CBC, iv, None, pyDes.PAD_PKCS5).decrypt(data).decode('utf-8')
        return _decrypt_result

    @staticmethod
    def _base64encode(data):
        try:
            _b64encode_result = base64.b64encode(data)
        except Exception as e:
            raise Exception(f"base64 encode error:{e}")
        return _b64encode_result

    @staticmethod
    def _base64decode(data):
        try:
            _b64decode_result = base64.b64decode(data)
        except Exception as e:
            raise Exception(f"base64 decode error:{e}")
        return _b64decode_result


class WenShu:

    def __init__(self):
        self.js = None

    @staticmethod
    def get_now_data():
        """时间
        """
        return datetime.now().strftime('%Y%m%d')

    @staticmethod
    def random_key():
        """字符串
        """
        random_str = ''
        base_str = 'ABCDEFGHIGKLMNOPQRSTUVWXYZabcdefghigklmnopqrstuvwxyz0123456789'
        length = len(base_str) - 1
        for i in range(24):
            random_str += base_str[random.randint(0, length)]
        return random_str

    @staticmethod
    def make_id():
        """id
        """
        return datetime.now().strftime('%Y%m%d%H%M%S')

    def make_cipher_text(self):
        """生成 ciphertext
        """
        time_13 = str(int(round(time.time() * 1000)))
        key = self.random_key()
        now = self.get_now_data()
        _str = des3.encryption(time_13, key, now)
        _str = key + now + _str
        new_str = ''
        for i in _str:
            if i != 1:
                new_str += " "
            new_str += str(bin(ord(i))[2:])

        msg = """【key生成】: {key}\n【now生成】: {now}\n【_str生成】: {_str}\n【ciphertext生成】: {ciphertext}""".format(key=key,
                                                                                                          now=now,
                                                                                                          _str=_str,
                                                                                                          ciphertext=new_str)
        print(msg)

        return new_str.strip()

    def make_request(self):
        """生成明文的请求 data 内容
        【这里需要根据实际需求修改请求内容】自行抓包研究！！
        """
        info = {
            "id": self.make_id(),  # 年月日时分秒
            "command": "queryDoc",  # 固定
            "params": {
                "devid": "41d861ffe5b347d28454dc3f07dd4212",  # 设备号
                "devtype": "1",
                "ciphertext": self.make_cipher_text(),
                "pageSize": "20",
                "sortFields": "s50:desc",  # 固定
                "pageNum": "1",
                "queryCondition": [{
                    "key": "s8",
                    "value": "02"
                }]  # 关键词 + 搜索文本的类型；
            }
        }
        return info

    def to_index(self):
        url = 'http://wenshuapp.court.gov.cn/appinterface/rest.q4w'
        headers = {
            'Content-Type': 'application/x-www-form-urlencoded',
            'User-Agent': 'Dalvik/2.1.0 (Linux; U; Android 9; MIX 2 MIUI/V11.0.2.0.PDECNXM)',
            'Host': 'wenshuapp.court.gov.cn',
            'Connection': 'Keep-Alive',
            'Accept-Encoding': 'gzip',
        }
        txt = str(self.make_request())

        request = base64.b64encode(txt.encode('utf-8')).decode('utf-8')
        data = {
            'request': request
        }
        msg = """【明文请求体】： {txt}\n【密文请求体】： {data}\n【官网速度较慢，耐心等待】....""".format(txt=txt, data=data)
        print(msg)
        response = requests.post(url, headers=headers, data=data)
        if 'HTTP Status 503' in response.text:
            print('【服务器繁忙】 爬的人太多了， 请重试')
            exit()
        data = json.loads(response.text)
        content = data.get('data').get('content')
        key = data.get('data').get('secretKey')
        iv = self.get_now_data()
        msg = """【页面访问结果】： {text}\n【捕获key】：{key}\n【捕获iv】：{iv}\n【捕获content】：{content}""".format(text=response.text,
                                                                                               key=key, iv=iv,
                                                                                               content=content)
        print(msg)
        self.parse_html(content, key, iv)

    def parse_html(self, content, key, iv):
        _str = des3.decrypt(content, key, iv)
        print("【解密返回结果】：", _str)


des3 = TripleDesUtils()

if __name__ == '__main__':
    """
    《入门级安卓逆向 - 文书网app爬虫》
    https://www.zhangkunzhi.com/index.php/archives/162/
    """
    ws = WenShu()
    ws.to_index()
