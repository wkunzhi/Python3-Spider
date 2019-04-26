# -*- coding: utf-8 -*-
# __author__ = "zok"  362416272@qq.com
# Date: 2019-04-26  Python: 3.7

# 本代码参考  github作者：CriseLYJ

import requests
import js2py


class FanYiSpider(object):
    """
    翻译
    """
    context = js2py.EvalJs()  # python中使用js

    def __init__(self, query):
        # 初始化
        self.url = "https://fanyi.baidu.com/basetrans"
        self.query = query
        self.headers = {
            "User-Agent": "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.103 Mobile Safari/537.36",
            "Referer": "https://fanyi.baidu.com/",
            "Cookie": "BAIDUID=714BFAAF02DA927F583935C7A354949A:FG=1; BIDUPSID=714BFAAF02DA927F583935C7A354949A; PSTM=1553390486; delPer=0; PSINO=5; H_PS_PSSID=28742_1463_21125_18559_28723_28557_28697_28585_28640_28604_28626_22160; locale=zh; from_lang_often=%5B%7B%22value%22%3A%22en%22%2C%22text%22%3A%22%u82F1%u8BED%22%7D%2C%7B%22value%22%3A%22zh%22%2C%22text%22%3A%22%u4E2D%u6587%22%7D%5D; to_lang_often=%5B%7B%22value%22%3A%22en%22%2C%22text%22%3A%22%u82F1%u8BED%22%7D%2C%7B%22value%22%3A%22zh%22%2C%22text%22%3A%22%u4E2D%u6587%22%7D%5D; REALTIME_TRANS_SWITCH=1; FANYI_WORD_SWITCH=1; HISTORY_SWITCH=1; SOUND_SPD_SWITCH=1; SOUND_PREFER_SWITCH=1; Hm_lvt_afd111fa62852d1f37001d1f980b6800=1553658863,1553766321,1553769980,1553770442; Hm_lpvt_afd111fa62852d1f37001d1f980b6800=1553770442; Hm_lvt_64ecd82404c51e03dc91cb9e8c025574=1553766258,1553766321,1553769980,1553770442; Hm_lpvt_64ecd82404c51e03dc91cb9e8c025574=1553770442",
            "Content-Type": "application/x-www-form-urlencoded",
            "Origin": "https://fanyi.baidu.com",
            "X-Requested-With": "XMLHttpRequest",
        }

    def make_sign(self):
        with open("translate.js", "r", encoding="utf-8") as f:
            self.context.execute(f.read())

        sign = self.context.a(self.query)
        return sign

    def make_data(self, sign):
        data = {
            "query": self.query,
            "from": "en",
            "to": "zh",
            "token": "6f5c83b84d69ad3633abdf18abcb030d",
            "sign": sign
        }
        return data

    def get_content(self, data):
        response = requests.post(
            url=self.url,
            headers=self.headers,
            data=data
        )
        return response.json()["trans"][0]["dst"]

    @property
    def run(self):
        sign = self.make_sign() # 获取sign的值
        data = self.make_data(sign)  # 构建参数
        content = self.get_content(data)  # 获取翻译内容
        return content


if __name__ == '__main__':
    key = input("输入翻译内容:")
    translate = FanYiSpider(key)
    print(translate.run)
