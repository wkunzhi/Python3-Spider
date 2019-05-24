# -*- coding: utf-8 -*-
import scrapy
import pymysql
import json

from MeiTuanArea.settings import API_AK
from MeiTuanArea.settings import MYSQL_DB_NAME, MYSQL_HOST, MYSQL_PASSWORD, MYSQL_PORT, MYSQL_USER
from MeiTuanArea.items import CoordItem


class GetLngSpider(scrapy.Spider):
    name = 'area_coord'

    # 独立配置
    custom_settings = {
        'ITEM_PIPELINES': {
            'MeiTuanArea.pipelines.CoordPipeline': 300,
        },
    }

    # mysql 配置
    conn = pymysql.Connect(
        host=MYSQL_HOST,
        port=MYSQL_PORT,
        user=MYSQL_USER,
        password=MYSQL_PASSWORD,
        db=MYSQL_DB_NAME,
    )

    url = 'http://api.map.baidu.com/geocoder/v2/?address={address}&output=json&ak={ak}'

    def start_requests(self):

        # 一级区域 省市
        provinces = self.get_db("""SELECT id,`name` from province""")
        for _id, name in provinces:
            target_url = self.url.format(address=name, ak=API_AK)
            yield scrapy.Request(target_url, meta={'type': 'province', '_id': _id})

        # 二级区域 城市
        city = self.get_db("""SELECT id,`name` from city""")
        for _id, name in city:
            target_url = self.url.format(address=name, ak=API_AK)
            yield scrapy.Request(target_url, meta={'type': 'city', '_id': _id})

        # 三级区域 区域
        area = self.get_db("""select area.id, city.name, area.name from city LEFT JOIN area on city.id=area.pid""")
        for _id, name, address_name in area:
            address = str(name)+str(address_name)
            target_url = self.url.format(address=address, ak=API_AK)
            yield scrapy.Request(target_url, meta={'type': 'area', '_id': i[0]})

        # 四级区域 街道
        address = self.get_db("""select address.id,area.name, address.name from area LEFT JOIN address on address.pid=area.id""")
        for _id, name, address_name in address:
            target_url = self.url.format(address=str(name)+str(address_name), ak=API_AK)
            yield scrapy.Request(target_url, meta={'type': 'address', '_id': _id})

    def get_db(self, sql):
        """数据库查询"""
        # 创建游标对象
        cursor = self.conn.cursor()
        # 提交事务
        try:
            cursor.execute(sql)
            data = cursor.fetchall()
            cursor.close()
            self.conn.close()
            return data
        except Exception as e:
            print('异常回滚')
            self.conn.rollback()
            cursor.close()
            self.conn.close()
            return None

    def parse(self, response):
        """清洗数据"""
        item = CoordItem()
        data = json.loads(response.text)
        # 处理字符串 把闲杂符号去掉
        if data.get('status') == 0:
            # 坐标
            item['lng'] = data.get('result').get('location').get('lng')
            item['lat'] = data.get('result').get('location').get('lat')
            item['id'] = response.meta.get('_id')
            item['type'] = response.meta.get('type')
            yield item

