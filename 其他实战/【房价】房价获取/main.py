# -*- encoding: utf-8 -*-
# Auth: Zok  Email: 362416272@qq.com
# Date: 2020/2/21

import requests
import json
import os
import sys
from urllib import parse

sys.path.append(os.path.abspath(os.path.dirname(os.path.dirname(__file__))))

from util import *


class Fun:
    """
    So 层
    IV： jhf5632s
    Key：hjkiuy6754edxc32890tfhjkw23xdea
    """

    def __init__(self):
        self.session = requests.session()

    def get_list(self):
        """
        获取楼盘列表
        作为演示只获取第一页，中的第一个地产
        """
        get_list_url = 'https://mobileapi.funi.com/m/community/search.json?page=1&pageSize=20&lng=106.593157&lat=29.541358&cityId=1'
        response = self.session.get(get_list_url)
        return json.loads(response.text)

    def get_building(self, _id):
        """
        获取楼栋表
        """
        house_id = _id
        key = '81$$@$$80$$@$$40$$@$$0$$@$$69$$@$$68$$@$$11$$@$$' + house_id + '$$@$$59$$@$$10$$@$$39$$@$$78$$@$$79$$@$$79$$@$$35$$@$$29$$@$$83$$@$$57$$@$$79$$@$$24$$@$$7$$@$$62$$@$$7$$@$$37$$@$$5$$@$$73$$@$$49$$@$$16$$@$$79$$@$$45$$@$$5'
        key = des3_encrypt(key)
        key = parse.quote(key)
        url = 'https://mobileapi.funi.com/m/community/building211.json?key={key}'.format(key=key)
        response = self.session.get(url)
        print('楼栋数据', response.text)
        return json.loads(response.text)

    def one_fun(self, infos, _id):
        """
        通过获取到的楼栋表，取每栋的可售房信息
        测试，只取了前三个
        :return:
        """
        # 组合楼栋串    这里只取前三栋，作为测试
        buildingIdArray = ','.join([item.get('id') for item in infos.get('data')][:3])
        url = 'https://mobileapi.funi.com/m/community/buildingAmount.json'
        data = {
            'tal_id': '867686021859176',  # ? 固定
            'cityId': '1',  # 成都，测试这里固定先
            'communityId': _id,  # 14944 = 蓝光观岭国际社区9期
            'buildingIdArray': buildingIdArray,
            'tal': 'ANDROID',
        }
        response = self.session.post(url, data=data)
        print('楼栋数据', response.text)
        return json.loads(response.text)

    def getHousePrice(self,  buildingId, _id):
        """
        获取房价单间
        这里测试，只取获取到得建筑得第一栋
        :return:
        """

        bId = buildingId
        houseId = _id
        unitId = '1'
        key = '59$$@$$34$$@$$7$$@$$' + houseId + '$$@$$' + bId + '$$@$$87$$@$$30$$@$$18$$@$$8$$@$$' + unitId + '$$@$$82$$@$$14$$@$$53$$@$$51$$@$$51$$@$$70$$@$$50$$@$$3$$@$$57$$@$$72$$@$$39$$@$$95$$@$$4$$@$$43$$@$$37$$@$$94$$@$$35$$@$$38$$@$$79$$@$$96$$@$$'
        key = make_str(key)  # 这里需要重新处理
        key = des3_encrypt(key)
        key = parse.quote(key)
        url = 'https://mobileapi.funi.com/m/community/house211.json?key={key}'.format(key=key)
        response = self.session.get(url)
        print('房价返回数据', response.text)
        return json.loads(response.text)

    def parse_data(self, items):
        """
        这里只解析，在售状态得！！
        :param items:
        :return:
        """
        for item in items.get('data'):
            house_list = item.get('houseList')
            for house in house_list:
                if decrypt_str(house.get('status')) == "已售": continue
                print('****每户分割线****')
                print('楼层：', decrypt_str(house.get('floor')))
                print('套内：', decrypt_str(house.get('roomNo')))
                print('建面：', decrypt_str(house.get('totalArea')))
                print('区域：', decrypt_str(house.get('area')))
                print('状态：', decrypt_str(house.get('status')))
                if house.get('listWaterPrice'):
                    print('【价格】：', decrypt_str(house.get('listWaterPrice')))
                # 这里其实还有更多字段，后面有空再研究

    def start(self):
        infos = self.get_list()

        # 只取一个小区测试
        _id = infos.get('data')[0].get('id')
        data = self.get_building(_id)
        buildings = self.one_fun(data, _id)

        # 只取一栋楼测试
        buildingId = buildings.get('data')[0].get('buildingId')
        datas = self.getHousePrice(buildingId, _id)
        self.parse_data(datas)


if __name__ == '__main__':
    fun = Fun()
    fun.start()
