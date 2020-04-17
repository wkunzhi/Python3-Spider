# -*- coding: utf-8 -*-
import scrapy
import json
import re

from pypinyin import pinyin, lazy_pinyin
from MeiTuanArea.items import AreaItem


class GetAreaSpider(scrapy.Spider):
    name = 'areas'

    # 独立配置
    custom_settings = {
        'ITEM_PIPELINES': {
            'MeiTuanArea.pipelines.AreaPipeline': 300,
        },
        'USER_AGENT': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.77 Safari/537.36',
        'DOWNLOAD_DELAY': 0.5,  # 限流  下载同一个网站下一个页面前需要等待的时间
    }

    def start_requests(self):
        start_url = 'https://www.meituan.com/ptapi/getprovincecityinfo/'
        yield scrapy.Request(start_url, callback=self.parse_province)

    def parse_province(self, response):
        """省市+市 1、2 级区域采集"""
        target_url = 'http://{acronym}.meituan.com/meishi/'

        item = AreaItem()
        data = json.loads(response.text)
        for node in data:
            name = node.get('provinceName')
            item['type'] = 'province'
            item['haschild'] = 1
            item['id'] = node.get('provinceCode')
            item['pid'] = 0
            item['name'] = name
            item['pinyin'] = ''.join(lazy_pinyin(name))
            item['first'] = self.get_acronym(name)
            yield item  # 一级省市

            for i in node.get('cityInfoList'):
                item['type'] = 'city'
                item['id'] = i.get('id')
                item['pid'] = node.get('provinceCode')
                item['name'] = i.get('name')
                item['pinyin'] = i.get('pinyin')
                item['first'] = i.get('acronym')
                yield item  # 二级市

                url = target_url.format(acronym=i.get('acronym'))
                yield scrapy.Request(url, callback=self.parse_area, meta={'pid': i.get('id')})

    def parse_area(self, response):
        """区域+街道 2、3 级区域采集"""
        info, areas = re.search(r',"areas":(.*?),"dinnerCountsAttr', response.text), None
        if info:
            areas = json.loads(info.group(1))
        if areas:
            city_id = response.meta.get('pid')
            item = AreaItem()

            # 解析区域 3 级
            for area in areas:
                item['type'] = 'area'
                item['id'] = area.get('id')
                item['pid'] = city_id
                item['name'] = area.get('name')
                item['pinyin'] = ''.join(lazy_pinyin(area.get('name')))
                item['first'] = self.get_acronym(area.get('name'))

                subs = area.get('subAreas')
                # 判断是否有下级，有的区域么有下级了
                if len(subs) > 1:
                    item['haschild'] = 1
                else:
                    item['haschild'] = 0

                yield item

                # 解析 4 级
                if len(subs) > 1:
                    for sub in subs:
                        if not sub.get('name') == '全部':
                            item['haschild'] = 0
                            item['type'] = 'address'
                            item['id'] = sub.get('id')
                            item['pid'] = area.get('id')
                            item['name'] = sub.get('name')
                            item['pinyin'] = ''.join(lazy_pinyin(sub.get('name')))
                            item['first'] = self.get_acronym(sub.get('name'))
                            yield item

        else:
            print('区域读取失败')

    @staticmethod
    def get_acronym(str_data):
        """
        获取字符串的首字母
        :param str_data: 字符串
        :return: 字符串
        """
        return "".join([i[0][0] for i in pinyin(str_data)])

