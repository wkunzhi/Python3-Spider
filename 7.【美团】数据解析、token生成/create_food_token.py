# -*- coding: utf-8 -*-
# __author__ = "zok"  362416272@qq.com
# Date: 2019-04-21  Python: 3.7

import json, zlib, base64, time


class MakeToken():
    """
    测试2019-4-21日可用
    仅作为学术交流！如有侵权，联系作者删除
    美团【餐馆列表】Token生成
    """

    def __init__(self, areaId, cityName, originUrl, page):
        self.areaId = areaId
        self.cityName = cityName
        self.originUrl = originUrl
        self.page = page
        self.uuid = 'c6eada3ffd8e444491e9.1555472928.3.0.0'  # Demo

    def join_sign(self):
        # 参数
        sign = 'areaId={areaId}&cateId=0&cityName={cityName}&dinnerCountAttrId=&optimusCode=1&originUrl={originUrl}&page={page}&partner=126&platform=1&riskLevel=1&sort=&userId=&uuid={uuid}'
        _str = sign.format(areaId=self.areaId, cityName=self.cityName, originUrl=self.originUrl, page=self.page,
                           uuid=self.uuid)
        sign = base64.b64encode(zlib.compress(bytes(json.dumps(_str, ensure_ascii=False), encoding="utf8")))
        sign = str(sign, encoding="utf8")
        return sign

    @property
    def join_token(self):
        str_json = {}
        str_json['rId'] = 100900
        str_json['ver'] = '1.0.6'
        str_json['ts'] = time.time()
        str_json['cts'] = time.time() + 110
        str_json['brVD'] = [1920, 315]
        str_json['brR'] = [[1920, 1080], [1920, 1057], 24, 24]
        str_json['bI'] = [self.originUrl, ""]
        str_json['mT'] = []
        str_json['kT'] = []
        str_json['aT'] = []
        str_json['tT'] = []
        str_json['aM'] = ''
        str_json['sign'] = self.join_sign()
        token_decode = zlib.compress(
            bytes(json.dumps(str_json, separators=(',', ':'), ensure_ascii=False), encoding="utf8"))
        token = str(base64.b64encode(token_decode), encoding="utf8")
        return token


if __name__ == '__main__':
    # 测试数据
    areaId = '4581'
    cityName = '重庆'
    originUrl = 'http://cq.meituan.com/meishi/b4581/'
    page = '1'

    token = MakeToken(areaId, cityName, originUrl, page)
    print(token.join_token)
